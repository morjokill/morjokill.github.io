const divContainer = document.getElementById("div-container");
const btn = document.getElementById("btn-add");
const setContainer = document.getElementById("set-holder");
const infoContainer = document.getElementById("info-holder");
const sumContainer = document.getElementById("sum-holder");
const slider = document.getElementById("speed");
const reset = document.getElementById("reset");

btn.addEventListener("click", iterate);
reset.addEventListener("click", stopReset);

var array = [];
const set = new Set();
var target = 0;
var speed = 600;
var state = "IDLE";
var maxValue = 100;

window.onload = function() {
    resetArray();
}

slider.oninput = function() {
  speed = (600 - slider.value)
}

async function iterate() {
	state = "RUNNING";
	btn.disabled = true;
  	setContainer.innerHTML = '';
  	sumContainer.innerHTML = '';
	set.clear();
	found = false;
	for (var i = 0; i < array.length; i++) {
		document.getElementById("iteration_index").innerHTML = "Iteration index: " + i;
		if (state == "STOP") break;
		const num = document.getElementById(i);
		num.className = 'elemHover';
		var diff = target - array[i];
		if (!set.has(diff)) {
			if (!set.has(array[i])) {
				addElement(array[i], "set" + array[i], setContainer);
				document.getElementById("set_elem").innerHTML = "Set length: " + set.size;
			}
			set.add(array[i]);
		} else {
			setElem = document.getElementById("set" + diff);
			arrayElem = document.getElementById(i);
			animateResults(setElem, arrayElem);
			addElement(array[i], "first_result", sumContainer);
			addElement(diff, "second_result", sumContainer);
			num.className = 'elem';
			break;
		}
		await sleep(speed);
		num.className = 'elem';
		found = true;
	}
	if (!found) addElement("Sum is not possible", "no_result", sumContainer);

	btn.disabled = false;
	state = "IDLE";
}

function stopReset() {
	state = "STOP";
	setContainer.innerHTML = '';
  	sumContainer.innerHTML = '';
  	divContainer.innerHTML = '';
  	infoContainer.innerHTML = '';
	array = [];
	set.clear();
	resetArray();
}

async function animateResults(setElem, arrayElem) {
	for (i = 0; i < 5; i++) {
		setElem.style.background = 'mediumseagreen';
		arrayElem.style.background = 'mediumseagreen';
		await sleep(500);
		setElem.style.background = '';
		arrayElem.style.background = '';
		await sleep(500);
	}
}

function resetArray() {
	createPer("[", 'per');
	var size = 50;
	for (var i = 0; i < size; i++) {
		var value = getRandomArbitrary(maxValue);
		array.push(value);
		addElement(value, i, divContainer);
		if (i != size -1) createPer(",", 'dot');
	}
	target = getRandomArbitrary(maxValue) + 5;
	createPer("]", 'per');
	addToInfo("Target: " + target);
	addToInfo("Array length: " + array.length);
	addToInfo("Set length: " + 0, "set_elem");
	addToInfo("Iteration index: " + 0, "iteration_index");
}

function addToInfo(val, id) {
	const left = document.createElement("div");
	left.innerHTML = val;
	if (id) left.setAttribute("id", id);
	infoContainer.appendChild(left);
}

function createPer(val, className) {
	const left = document.createElement("div");
	left.className = className;
	left.innerHTML = val;
	divContainer.appendChild(left);
}

function addElement(value, index, container) {
	const elem = document.createElement("div");
	elem.className = 'elem';
	elem.innerHTML = value;
	elem.setAttribute("id", index);
	container.appendChild(elem);
}

function getRandomArbitrary(max) {
    return Math.floor(Math.random() * max);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
