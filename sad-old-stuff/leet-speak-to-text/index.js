const { leetSpeak } = require("./utils/leet-speak")
const { getPermutations } = require("./utils/permutate")

const application = {
	maxStringLength: 0,

	setup() {
		this.maxStringLength = this.findLongestString()
	},

	findLongestString() {
		let longestString = ""

		for (const letter in leetSpeak) {
			leetSpeak[letter].forEach((encodedStr) => {
				if (encodedStr.length > longestString.length) {
					longestString = encodedStr
				}
			})
		}

		return longestString
	},

	start() {
		this.setup()

		return this.exposedApplication({
			maxEncodedCharLength: this.maxStringLength,
		})
	},

	exposedApplication: ({ maxEncodedCharLength }) => ({
		decodeLetter(char) {
			let possibleLetters = new Set()

			for (const letter in leetSpeak) {
				if (leetSpeak[letter].has(char)) {
					possibleLetters.add(letter)
				}
			}

			if (possibleLetters.size === 0) return [char]

			// NOTE: Exclude self from possible letters to reduce amount of permutations
			//		 Currently we'll take everything to permutate possible words to check
			//		 against a dictionary
			possibleLetters.add(char)

			return Array.from(possibleLetters)
		},

		/**
		 * Decodes and retrieves all possible permutations of a leet speak / 1337 word
		 * @param {string} str - string to decode leet speak / 1337 words
		 * @returns 
		 */
		decode(str) {
			let decodedStr = ""

			// TODO: Support maxStringLength decoding, currently only supports 1 character at a time
			for (const letter of str) {
				const decodedLetter = this.decodeLetter(letter)

				if (decodedLetter.length === 1) {
					decodedStr += decodedLetter[0]
					continue
				}

				decodedStr += `|${decodedLetter.join(",")}|`
			}

			return getPermutations(decodedStr)
		},
	}),
}

const initializedApplication = application.start()

// Exported to be used as a library
module.exports = initializedApplication
