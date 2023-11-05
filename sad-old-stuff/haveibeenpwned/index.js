const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors")



const { zxcvbnAsync, zxcvbnOptions } = require("@zxcvbn-ts/core")
const { matcherPwnedFactory } = require("@zxcvbn-ts/matcher-pwned")
const zxcvbnCommonPackage = require("@zxcvbn-ts/language-common")
const zxcvbnEnPackage = require("@zxcvbn-ts/language-en")

const PORT = 4400
const app = express()
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT, async () => {
	console.log(`Listening on port: ${PORT}`);
});
app.use(cors());


app.post("/check-strength", async (req,res) => {
	try {
		const { password } = req.body
		let analysis = await theJizz(password);
		analysis["log2"] = Math.log2(analysis["guesses"])
		res.status(200).json({data: analysis})
	} catch (error) {
		console.error(error)
		res.status(500).json({data: "internal server error!"})
	}
})



const theJizz = async (password) => {
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
	const analysis = await zxcvbnAsync(password)
	return analysis;
}



