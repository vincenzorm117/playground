
function Particles(canvas, count) {
    this.count = 0;
    this.particles = {};

    this.add = function() {
        this.particles[this.count] = new Particle(canvas, this.count, this.particles, {
            y: 1
        });
        this.count += 1;
    }

    this.draw = function() {
        Object.values(this.particles).forEach(function(p){ p.draw(); });
    }

    count = count || rand(500, 1000);
    for(var i = 0; i < count; i++) {
        this.add();
    }

    
}



function Particle(canvas, id, parent, opt) {
    opt = (typeof opt === typeof {}) ? opt : {};
    this.id = (typeof id == typeof 0) ? id : new Date().getTime();
    this.parent = parent;
    this.canvas = canvas;
    this.p = [opt.x || rand(), 0];
    this.v = [random(-10,10), random(0,2)];
    this.a = [random(-1,1), 0];
    this.r = opt.r || random(0,2);
    this.color = [random(360), 66, 66, random()];

    this.amp = random(1.5);

    this.draw = function() {
        var canvas = this.canvas.el;
        var c = this.canvas.c;

        this.v[1] = (this.v[1] + this.a[1]);

        this.p[0] = (this.p[0] + this.amp * Math.sin(this.v[0])) % canvas.width;
        this.p[1] = (this.p[1] + this.v[1]);

        if( canvas.height < this.p[1] ) {
            delete this.parent[this.id];
        }

        this.color[0] = (this.color[0] + this.v[0]) % 360;

        c.globalAlpha = this.color[3];
        c.beginPath();
        c.arc(this.p[0], this.p[1], this.r, 0, 2*Math.PI, false);
        c.fillStyle = '#fff';
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
        this.c.clearRect(0, 0, this.el.width, this.el.height);
    }

    this.resize();
}



window.onload = function setup() {
    var canvas = new Canvas();

    canvas.refresh();

    window.onresize  = function() {
        canvas.resize();
    }

    var p = new Particles(canvas, 100);

    setInterval(function(){
        canvas.refresh();
        p.draw();
    }, 30);

    setInterval(function(){
        p.add();
    }, 60);
}
