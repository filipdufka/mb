let testSlider;
function setup() {
	createCanvas(800, 600);
	testSlider = new Slider(0,100);
}

function draw() {
	clear();
	testSlider.show();
}