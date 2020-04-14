import {Node} from './modules/node.js';
import {
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
} from './modules/utils.js'

(function () {
	'use strict';
	const debug = false;
	const [xSize, ySize] = [20, 20];

	async function AStar () {
		let nodeList = getNodeListFromGrid(xSize, ySize);
		if (debug) console.log(nodeList);

		// find start and end node
		let start = nodeList.find(node => {
			return node.domElt.id === 'start'
		});
		let end = nodeList.find(node => {
			return node.domElt.id === 'end'
		});
		if (debug) console.log("start and end : ", start, end);

		// Start A* algorithm
		let closedList = [];
		let openList = [];
		openList.push(start);

		while (openList.length > 0) {
			await sleep(50);
			let u = openList.pop();
			addClassToNode(u, "current");
			if (u.x === end.x && u.y === end.y) {
				showSolution(u);
				break;
			}

			let neighbours = getNodeNeighbours(u, nodeList);
			neighbours.forEach(v => {
				addClassToNode(v, "neighbour");
				if (!v.traversable) {
					closedList.push(v);
				}

				if (!(closedList.includes(v) || (openList.includes(v) && v.cost < u.cost + 1))) {
					v.parent = u;
					v.cost = u.cost + 1;
					v.heuristique = v.cost + getDistance(v, end);
					if (debug) addText(v, v.cost + " " + parseInt(v.heuristique));
					if (openList.includes(v)) {
						const idx = openList.indexOf(v);
						openList.splice(idx, 1);
					}
					openList.push(v);
		 			openList.sort(compareNodes);
				}
			})

			closedList.push(u);
			await sleep(50);
			removeClassFromNode(u, "current");
			addClassToNode(u, "closed");
		}
	}

	document.querySelectorAll("#go")[0].addEventListener("click", AStar, false);
	document.querySelectorAll("#reset")[0].addEventListener("click", reset, false);
})();


