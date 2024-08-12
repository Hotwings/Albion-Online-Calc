
const apiUrl = "https://west.albion-online-data.com"

var minimumTier = 4;
var maxTier = 8;

const HIDE_NAME = "HIDE"
const LEATHER_NAME = "LEATHER"

const FIBER_NAME = "FIBER"
const CLOTH_NAME = "CLOTH"

const WOOD_NAME = "WOOD"
const PLANKS_NAME = "PLANKS"

const ROCK_NAME = "ROCK"
const STONE_NAME = "STONE"

const ORE_NAME = "ORE"
const METALBAR_NAME = "METALBAR"


async function main() {
	var sortedResources = {};
	var resources = await getResources();
	console.log(resources);
	resources.forEach(resource => {
		var [tier, name, level="Base"] = resource.item_id.split("_");
		if (!Object.hasOwn(sortedResources, name)) {
			sortedResources[name] = {};
		}
		if (!Object.hasOwn(sortedResources[name], tier)) {

			sortedResources[name][tier] = {};
		}
		if (!Object.hasOwn(sortedResources[name][tier], level)) {

			sortedResources[name][tier][level] = [];
		}
		sortedResources[name][tier][level].push(resource);

	});
	console.log(sortedResources);

}

async function getResources() {
	var resourcesList = "";
	for (var i = minimumTier; i <= maxTier; i++) {
		for (var j = 0; j <= 3; j++) {
			resourcesList += "T" + i + "_" + HIDE_NAME + (j > 0 ? "_LEVEL" + j : "") + ",";
			resourcesList += "T" + i + "_" + LEATHER_NAME + (j > 0 ? "_LEVEL" + j : "") + ",";
			resourcesList += "T" + i + "_" + FIBER_NAME + (j > 0 ? "_LEVEL" + j : "") + ",";
			resourcesList += "T" + i + "_" + CLOTH_NAME + (j > 0 ? "_LEVEL" + j : "") + ",";
			resourcesList += "T" + i + "_" + WOOD_NAME + (j > 0 ? "_LEVEL" + j : "") + ",";
			resourcesList += "T" + i + "_" + PLANKS_NAME + (j > 0 ? "_LEVEL" + j : "") + ",";
			resourcesList += "T" + i + "_" + ROCK_NAME + (j > 0 ? "_LEVEL" + j : "") + ",";
			resourcesList += "T" + i + "_" + STONE_NAME + (j > 0 ? "_LEVEL" + j : "") + ",";
			resourcesList += "T" + i + "_" + ORE_NAME + (j > 0 ? "_LEVEL" + j : "") + ",";
			resourcesList += "T" + i + "_" + METALBAR_NAME + (j > 0 ? "_LEVEL" + j : "") + ",";
		}
	}
	resourcesList = resourcesList.slice(0, -1);

	const response = await fetch(apiUrl + "/api/v2/stats/Prices/" + resourcesList + ".json?locations=Bridgewatch,Fort Sterling,Lymhurst,Martlock,Thetford&qualities=1")
	return await response.json();
}



main();