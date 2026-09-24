from collections import defaultdict

def group_anagrams(words: list[str]) -> list[list[str]]:
    """
    Groups a list of words into anagrams.

    Assumes input data is already validated by Pydantic.
    Time Complexity: O(N * K log K) where N is number of words and K is max word length.
    """
    anagram_map = defaultdict(list)

    for word in words:
        sorted_word = ''.join(sorted(word.lower()))
        anagram_map[sorted_word].append(word)

    return list(anagram_map.values())