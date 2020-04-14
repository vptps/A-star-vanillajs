function Node(x, y, cost, heuristique, traversable, domElt, parent) {
	this.x = x;
	this.y = y;
	this.cost = cost;
	this.heuristique = heuristique;
	this.traversable = traversable;
	this.domElt = domElt;
	this.parent = parent;
}

export {Node};
