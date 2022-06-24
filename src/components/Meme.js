import { useState, useEffect } from "react"

function Meme() {
	let data = {
		topText: "",
		bottomText: "",
		randomImg: "http://i.imgflip.com/1bij.jpg",
	}
	const [dataMeme, setDataMeme] = useState(data)

	const [allMemes, setAllMemes] = useState([])

	useEffect(() => {
		fetch("https://api.imgflip.com/get_memes")
			.then(res => res.json())
			.then(data => setAllMemes(data.data.memes))
	}, [data.randomImg])

	function getMemeImage() {
		const memesArray = allMemes
		const randomNumber = Math.floor(Math.random() * memesArray.length)
		let url = memesArray[randomNumber].url
		setDataMeme(oldVal => ({
			...oldVal,
			randomImg: url,
		}))
	}
	function handleChange(event) {
		const { name, value, type, checked } = event.target
		setDataMeme(oldVal => ({
			...oldVal,
			[name]: type === "checkbox" ? checked : value,
		}))
	}

	function handleSubmit(event) {
		event.preventDefault()
	}
	return (
		<main>
			<div className="form" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Top text"
					className="form--input"
					onChange={handleChange}
					name="topText"
					value={dataMeme.topText}
				/>
				<input
					type="text"
					placeholder="Bottom text"
					onChange={handleChange}
					className="form--input"
					name="bottomText"
					value={dataMeme.bottomText}
				/>
				<button className="form--button" onClick={getMemeImage}>
					Get a new meme image 🖼
				</button>
			</div>
			<div className="meme">
				<img src={dataMeme.randomImg} className="meme-img" alt="meme" />
				<h2 className="meme--text top">{dataMeme.topText}</h2>
				<h2 className="meme--text bottom">{dataMeme.bottomText}</h2>
			</div>
		</main>
	)
}
export default Meme
