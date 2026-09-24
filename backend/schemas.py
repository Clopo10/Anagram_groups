from pydantic import BaseModel, Field, field_validator, ConfigDict

class AnagramRequest(BaseModel):
    words: list[str] = Field(
        ...,
        max_length = 10000,
        description = "A list of words to group into anagrams. Max 10.000 words"
    )

    @field_validator("words")
    @classmethod
    def clean_and_validate_words(cls, raw_words: list[str]) -> list[str]:
        # Strip whitespace and drop empty strings
        cleaned_words = [word.strip() for word in raw_words if word.strip()]

        if not cleaned_words:
            raise ValueError("The list must contain at least one valid word!")

        # Enforce alphabetical characters only
        for word in cleaned_words:
            if not word.isalpha():
                raise ValueError(f"Invalid word: '{word}'. Only alphabetical characters are allowed!")

        return cleaned_words

    # Example data in the /docs FastApi UI
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "words": ["eat","tea","tan","ate","nat","bat"]
            }
        }
    )


class AnagramResponse(BaseModel):
    groups: list[list[str]] = Field(
        description = "The resulting grouped anagrams."
    )

    processing_time_ms: float = Field(
        description = "Time taken to process the algorithm in miliseconds."
    )

    # Example data in the /docs FastApi UI
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "groups": [
                    ["ate","eat","tea"],
                    ["nat","tan"],
                    ["bat"]
                ],

                "processing_time_ms": 0.15
            }
        }
    )