const particles = [];

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);

	const particlesLength = Math.floor(window.innerWidth / 10);

	for(let i = 0; i < particlesLength; i++){
		particles.push(new Particle());
	}
}


function draw() {

	background(204,0,0);

	particles.forEach((p, index) => {
		p.update();
		p.draw();
		p.checkPrticles(particles.slice(index));
	});
}

class Particle{

	constructor() {
		//position
		this.pos = createVector(random(width), random(height));
		//velocity
		this.vel = createVector(random(-1, 1), random(-1, 1));
		//size
		this.size = 10;
	}
	// update movement by adding velocity
	update() {
		this.pos.add(this.vel);
		this.edges();
	}
	// draw a single particle
	draw() {
		noStroke();
		fill('rgba(255,255,255,0.5)');
		circle(this.pos.x, this.pos.y, this.size);
	}
	// detect edges
	edges() {
		if(this.pos.x < 0 || this.pos.x > width) {
			this.vel.x *= -1;
		}
		if(this.pos.y < 0 || this.pos.y > height) {
			this.vel.y *= -1;
		}
	}
	checkPrticles(particles) {


		particles.forEach(particle => {
			const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
			const b = dist(mouseX, mouseY, particle.pos.x, particle.pos.y);

			if(d < 120) {
				stroke('rgba(255,255,255,0.2)');
				line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
			}
			if(b < 120) {
				stroke('rgba(255,255,255,0.005)');
				line(mouseX, mouseY, particle.pos.x, particle.pos.y);
			}
		});	
	}
}

window.addEventListener('mousemove', mousePos)

function mousePos(e) {
	var mouseX = e.offsetX;
	var mouseY = e.offsetY;
}