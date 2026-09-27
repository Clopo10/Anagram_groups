import time
import os
import json
import redis

from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

from schemas import AnagramRequest, AnagramResponse
from services import group_anagrams

app = FastAPI(
    title= "Anagram API",
    description= "An API for grouping words into anagrams."
)

REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379")
cache = redis.from_url(REDIS_URL, decode_responses=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", include_in_schema=False)
async def read_root():
    """
    Redirects visitors of the root URL directly to the API docs.
    """
    return RedirectResponse(url="/docs")


@app.get("/health", tags=["System"])
async def health_check():
    """
    Used by Docker to verify the container is still alive.
    """
    return {"status": "ok", "message": "API is healthy"}


@app.post("/api/anagrams", response_model=AnagramResponse, tags=["Anagrams"])
def api_group_anagrams(payload: AnagramRequest):
    """
    Takes a list of words, validates them and returns them grouped by anagrams.
    """
    # Start the timer
    start_time = time.perf_counter()

    try:
        grouped_results = group_anagrams(payload.words)

        # Cache each identified cache in Redis
        for group in grouped_results:
            if group:
                signature = "".join(sorted(group[0].lower()))

                # Check to see if Redis has already got words for this signature
                existing_data = cache.get(signature)

                if existing_data:
                    # If yes, load the old words and combine them with the new ones
                    existing_words = json.loads(existing_data)
                    combined_words = existing_words + group

                    # Use set() to destroy duplicates, then turn it back into a list
                    unique_words = list(set(combined_words))

                    # Save the result into Redis
                    cache.set(signature, json.dumps(unique_words))
                else :
                    unique_words = list(set(group))
                    cache.set(signature, json.dumps(unique_words))

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="An internal error occurred while processing the anagrams."
        )

    # Stop the timer and convert to miliseconds
    elapsed_time_ms = (time.perf_counter() - start_time) * 1000

    # Return the data
    return AnagramResponse(
        groups=grouped_results,
        processing_time_ms=round(elapsed_time_ms, 2)
    )


@app.get("/api/anagrams/{word}", tags=["Anagrams"])
def get_anagram(word: str):
    """
    Searches the Redis cache for anagrams of a single word
    """
    # Start the timer
    start_time = time.perf_counter()

    signature = "".join(sorted(word.lower()))

    #Ask Redis if it has seen this signature before
    try:
        cached_result = cache.get(signature)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="Could not connect to the cache database."
        )

    if cached_result:
        all_words = json.loads(cached_result)
        
        # Filter out the exact word the user searched for
        true_anagrams = [w for w in all_words if w.lower() != word.lower()]
        
        elapsed_time_ms = (time.perf_counter() - start_time) * 1000
        
        # If there are still words left, return them
        if true_anagrams:
            return {
                "group": true_anagrams,
                "processing_time_ms": round(elapsed_time_ms, 2)
            }
        else:
            # The word was in the cache, but it was the ONLY word saved there
            raise HTTPException(
                status_code=404, 
                detail=f"'{word}' is in the memory bank, but no other anagrams for it have been sorted yet!"
            )
            
    # The word's signature wasn't in the cache at all
    raise HTTPException(
        status_code=404, 
        detail=f"No data found for '{word}'. Try sorting it first!"
    )