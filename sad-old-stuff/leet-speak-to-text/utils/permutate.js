module.exports = {
    /**
     * Permutates an input of strings and returns all possible combinations.
     * The possibilities are customized by the pipe character (|) and comma (,) in the input
     * 
     * @param {string} input - The string to generate permutations from
     * @returns 
     * 
     * @example
     * // |i,l| are possibilities for the first and second sections
     * const input = "He|i,l|lo Wor|i,l|d"
     * let permutations = getPermutations(input)
     */
	getPermutations(input) {
		const sections = input.split("|")
		const sectionCharacters = sections.map((section) => section.split(","))

		// Generate all combinations of characters
		function combineCharacters(arrays, index, current) {
			if (index === arrays.length) {
				return [current]
			}

			const results = []
			for (const char of arrays[index]) {
				results.push(...combineCharacters(arrays, index + 1, current + char))
			}

			return results
		}

		const characterCombinations = combineCharacters(sectionCharacters, 0, "")

		return characterCombinations
	},
}
