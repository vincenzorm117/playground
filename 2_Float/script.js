
function Particles(canvas, count) {
    this.count = count || rand(500, 1000);
    this.particles = [];
    for(var i = 0; i < this.count; i++) {
        var y_fourth = Math.floor(canvas.height / 4);
        var y = random() * Math.floor(canvas.el.height / 4) + Math.floor(canvas.el.height * 2) + 1;
        this.particles.push(new Particle(canvas, 1, y));
    }

    this.draw = function() {
        this.particles.forEach(function(p){ p.draw(); });
    }
}



function Particle(canvas, x,y, r) {
    this.canvas = canvas;
    this.x = x || rand();
    this.y = y || rand();
    this.vx = random(-2,3);
    this.vy = random(-1,1);
    this.r = r || rand(1,5);
    this.color = "rgb(255,255,255)";
    this.draw = function() {
        var canvas = this.canvas.el;
        var c = this.canvas.c;
        this.x = (this.x + this.vx) % canvas.width;
        this.y = (this.y + this.vy) % canvas.height;

        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
        c.fillStyle = '#fff';
        c.fill();
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
