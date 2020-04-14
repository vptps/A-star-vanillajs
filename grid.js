// Manage walls
const debug = false;
let Mouse = {pressed: false};
document.querySelectorAll('#grid')[0].addEventListener("mousedown", function(event){
	Mouse.pressed = true;
	if(debug) console.log('mouse pressed true');
}, false);

document.querySelectorAll('#grid')[0].addEventListener("mouseup", function(event){
	Mouse.pressed = false;
	if(debug) console.log('mouse pressed false');
}, false);

document.querySelectorAll('#grid > div > div').forEach(elt => {
	elt.addEventListener("mouseover", function(event) {
		if (!Mouse.pressed) return;

		toggleDiv(event.srcElement);
		if(debug) console.log('mouse over a case');
	}, false)

	elt.addEventListener("mousedown", function(event) {
		toggleDiv(event.srcElement);
		if(debug) console.log('mouse clicked a case');
	}, false)
});

function toggleDiv(element) {
	if(element.id) return; // can't change start/end to walls

	if(element.classList.contains("blocked")) {
		element.classList = []; // TODO
	} else {
		element.classList.add("blocked");
	}
}
