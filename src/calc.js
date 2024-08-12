
const apiUrl = "https://west.albion-online-data.com"

var minimumTier = 4;
var maxTier = 8;

var minimumQuality = 1;
var maxQuality = 1;

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
		var [tier, name] = resource.item_id.split("_");
		var quality = resource.quality;
		if (!Object.hasOwn(sortedResources, name)) {
			sortedResources[name] = {};
		}
		if (!Object.hasOwn(sortedResources[name], tier)) {

			sortedResources[name][tier] = {};
		}
		if (!Object.hasOwn(sortedResources[name][tier], quality)) {

			sortedResources[name][tier][quality] = resource;
		}

	});
	console.log(sortedResources);

}

async function getResources() {
	var resourcesList = "";
	for (var i = minimumTier; i <= maxTier; i++) {
		resourcesList += "T" + i + "_" + HIDE_NAME + ",";
		resourcesList += "T" + i + "_" + LEATHER_NAME + ",";
		resourcesList += "T" + i + "_" + FIBER_NAME + ",";
		resourcesList += "T" + i + "_" + CLOTH_NAME + ",";
		resourcesList += "T" + i + "_" + WOOD_NAME + ",";
		resourcesList += "T" + i + "_" + PLANKS_NAME + ",";
		resourcesList += "T" + i + "_" + ROCK_NAME + ",";
		resourcesList += "T" + i + "_" + STONE_NAME + ",";
		resourcesList += "T" + i + "_" + ORE_NAME + ",";
		resourcesList += "T" + i + "_" + METALBAR_NAME + ",";
	}
	resourcesList = resourcesList.slice(0, -1);
	var qualitiesList = "";
	for (var i = minimumQuality; i <= maxQuality; i++) {
		qualitiesList += i + ",";
	}
	qualitiesList = qualitiesList.slice(0, -1);
	const response = await fetch(apiUrl + "/api/v2/stats/Prices/" + resourcesList + ".json?locations=Bridgewatch,Fort Sterling,Lymhurst,Martlock,Thetford&qualities=" + qualitiesList)
	return await response.json();
}



main();