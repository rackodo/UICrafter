const packs = [
	"ddm",
	"faithful",
	"immersive"
]

const fs = require('fs/promises');

packs.forEach((pack) => {
	fs.readdir(`packs/${pack}/assets/minecraft/textures/gui`, { recursive: false, withFileTypes: true })
	.then((files) => {
		files.forEach((file) => {
			console.log(pack, file.isFile() ? "File" : "Folder", file.name)
		})
	})
	.catch((err) => {throw err})
})