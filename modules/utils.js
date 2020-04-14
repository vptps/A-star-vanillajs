import {Node} from './node.js';

function getNodeListFromGrid(xSize, ySize) {
	let nodeList = [];
	const eltList = document.querySelectorAll("#grid > div > div");

	let [x, y] = [0, 0];
	eltList.forEach(elt => {
		let node = new Node(x, y, 0, 0, !elt.classList.contains("blocked"), elt);
		nodeList.push(node);

		if (x < xSize - 1) {
			x++;
		} else {
			x = 0;
			y++;
		}
	});

	return nodeList;
}

function findNode(x, y, nodeList) {
	return nodeList.find(node => node.x === x && node.y === y);
}

function compareNodes(nodeA, nodeB) {
	if (nodeA.heuristique < nodeB.heuristique) {
		return 1;
	} else if (nodeA.heuristique === nodeB.heuristique) {
		return 0;
	} else {
		return -1;
	}
}

function getNodeNeighbours(node, nodeList) {
	const [x, y] = [node.x, node.y];
	let nodeToAdd = undefined;
	let neighbours = [];

	for (let i=x-1; i<=x+1; i++) {
		for (let j=y-1; j<=y+1; j++) {
			if (i===x && j===y) continue;
			if (i<0 || j<0) continue; // TODO: add outer bounds

			nodeToAdd = findNode(i, j, nodeList);
			if (nodeToAdd) neighbours.push(nodeToAdd);
		}
	}

	return neighbours;
}

function getDistance(nodeA, nodeB) {
	return Math.sqrt(Math.pow(nodeB.x - nodeA.x, 2) + Math.pow(nodeB.y - nodeA.y, 2));
}

function addClassToNode(node, className) {
	if (className !== "neighbour") {
		removeClassFromNode(node, "neighbour");
	}
	node.domElt.classList.add(className);
}

function removeClassFromNode(node, className) {
	node.domElt.classList.remove(className);
}

async function showSolution(node) {
	let parent = node.parent;
	while (parent !== undefined) {
		await sleep(50);
		addClassToNode(parent, "solution");
		parent = parent.parent;
	}
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function mapDomElements(nodeList) { // only used for debug purposes
	return nodeList.map(node => node.domElt);
}

function addText(node, text) { // only used for debug purposes
	node.domElt.innerText = text;
}

function reset() {
	document.querySelectorAll("#grid > div > div").forEach(elt => {
		elt.classList.forEach(token => {elt.classList.remove(token)});
		elt.innerText = '';
	})
}

export {
	getNodeListFromGrid,
	findNode,
	compareNodes,
	getNodeNeighbours,
	getDistance,
	addClassToNode,
	removeClassFromNode,
	showSolution,
	sleep,
	mapDomElements,
	addText,
	reset
};
