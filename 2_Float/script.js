
function Particles(canvas, count) {
    this.count = count || rand(500, 1000);
    this.particles = [];
    for(var i = 0; i < this.count; i++) {
        this.particles.push(new Particle(canvas, random(0, canvas.width), random(0, canvas.height)));
    }

    this.draw = function() {
        this.particles.forEach(function(p){ p.draw(); });
    }
}



function Particle(canvas, x,y, r) {
    this.canvas = canvas;
    this.x = x || rand();
    this.y = y || rand();
    this.vx = random(-1,1);
    this.vy = random(-1,1);
    this.r = r || rand(1,2);
    this.color = [255,255,255,random()];
    this.draw = function() {
        var canvas = this.canvas.el;
        var c = this.canvas.c;
        this.x = (this.x + this.vx) % canvas.width;
        this.y = (this.y + this.vy) % canvas.height;

        c.globalAlpha = this.color[3];
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
        c.fillStyle = rgb(this.color);
        c.fill();
        c.globalAlpha = 1;
    }
}



function Canvas() {
    this.el = document.createElement('canvas');
    this.el.id = "playground";
    this.c = this.el.getContext('2d');
    document.body.appendChild(this.el);

    this.resize = function() {
        this.el.width = window.innerWidth;
        this.el.height = window.innerHeight;
    }

    this.refresh = function() {
        this.c.fillStyle = 'black';
        this.c.fillRect(0,0, this.el.width, this.el.height);
    }

    this.resize();
}



window.onload = function setup() {
    var canvas = new Canvas();

    canvas.refresh();

    window.onresize  = function() {
        canvas.resize();
    }

    var p = new Particles(canvas, 500);

    setInterval(function(){
        canvas.refresh();
        p.draw();
    }, 30);
}
