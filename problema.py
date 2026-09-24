"""
Given an array of strings strs, group the anagrams together. You can return the answer in any order.

 

Example 1:

Input: strs = ["eat","tea","tan","ate","nat","bat"]

Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Explanation:

There is no string in strs that can be rearranged to form "bat".
The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.
Example 2:

Input: strs = [""]

Output: [[""]]

Example 3:

Input: strs = ["a"]

Output: [["a"]]
"""

"""
{"ant" : ["nat", "tan"]}

1. Make empty dict
2. Iterate over the input with for loop
3. Sort the current word
4. Put in dictionary (sorted_word as key, words as value)
5. Return dictionary values
"""

from collections import defaultdict

def groupAnagrams(strs: list[str]) -> list[list[str]]:
    result = defaultdict(list)

    for word in strs:
        sorted_word = ''.join(sorted(word))
        result[sorted_word].append(word)

    return result.values()


strs = ["eat","tea","tan","ate","nat","bat"]
print(groupAnagrams(strs))
