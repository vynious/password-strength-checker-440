const { zxcvbnAsync, zxcvbnOptions } = require("@zxcvbn-ts/core")
const { matcherPwnedFactory } = require("@zxcvbn-ts/matcher-pwned")
const zxcvbnCommonPackage = require("@zxcvbn-ts/language-common")
const zxcvbnEnPackage = require("@zxcvbn-ts/language-en")

const password = "adrian123bcd"

const matcherPwned = matcherPwnedFactory(fetch, zxcvbnOptions)

zxcvbnOptions.addMatcher("pwned", matcherPwned)

const options = {
	translations: zxcvbnEnPackage.translations,
	graphs: zxcvbnCommonPackage.adjacencyGraphs,
	dictionary: {
		...zxcvbnCommonPackage.dictionary,
		...zxcvbnEnPackage.dictionary,
	},
}

zxcvbnOptions.setOptions(options)

// // @zxcvbn-ts/matcher-pwned is async so zxcvbn will return a promise
zxcvbnAsync(password).then((result) => {
	console.log(result)
})
