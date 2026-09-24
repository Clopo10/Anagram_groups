import time

from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse

from schemas import AnagramRequest, AnagramResponse
from services import group_anagrams

app = FastAPI(
    title= "Anagram API",
    description= "An API for grouping words into anagrams."
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