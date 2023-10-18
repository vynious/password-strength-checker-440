const wordnet = require("en-wordnet").default
const Dictionary = require("en-dictionary").default

// const leetSpeak = require("./leet-speak-to-text")
const haveibeenpwned = require("./haveibeenpwned")

const password = "adrian123"

const application = {
	start: async () => {
		const dictionary = new Dictionary(wordnet.get("3.0"))
        await dictionary.init()

		// const possibleLeetSpeakWords = leetSpeak.decode(password)

		// for (const word of possibleLeetSpeakWords) {
		// 	const result = dictionary.searchFor([word.toLowerCase()])
		// 	console.log(result)
		// }
	},
}

application.start()
