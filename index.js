const fs = require("fs");
const path = require("path");

const packPaths = ["ddm", "faithful", "immersive"];
const packs = [];

/**
 * Recursive function for turning a directory into an Object.
 * @param {string} dirPath path of the directory
 * @returns {object} folder represented as an object
 */
function dirToObj(dirPath) {
	const result = {};

	const items = fs.readdirSync(dirPath, { withFileTypes: true });

	items.forEach((item) => {
		const fullPath = path.join(dirPath, item.name);

		if (item.isDirectory()) {
			result[item.name] = dirToObj(fullPath);
		} else {
			result[item.name] = `${item.parentPath}/${item.name}`;
		}
	});

	return result;
}

/**
 * Converts pack paths into pack objects.
 */
packPaths.forEach((pp) => {
	packs.push(dirToObj(`packs/${pp}`));
	// console.log(dirToObj(`packs/${pp}`).assets.minecraft.textures.gui);
});

/**
 * Loops over each pack, reads the mcmeta file, spits out the description. This works!
 */
packs.forEach((pack) => {
	fs.readFile(pack["pack.mcmeta"], "utf-8", (err, data) => {
		if (err) throw err;
		const meta = JSON.parse(data);
		console.log(meta["pack"]["description"]);
		console.log("");
	});
});
