
function Particles(canvas, count) {
    this.count = count || rand(500, 1000);
    this.particles = [];
    for(var i = 0; i < this.count; i++) {
        this.particles.push(new Particle(canvas));
    }

    this.draw = function() {
        this.particles.forEach(function(p){ p.draw(); });
    }
}




function Particle(canvas, x,y, r) {
    this.canvas = canvas;
    this.x = x || rand();
    this.y = y || rand();
    // this.vx = rand();
    // this.vy = rand();
    this.r = r || rand(6,10);
    this.color = "rgb(255,255,255)";
    this.draw = function() {
        var canvas = this.canvas.el;
        var c = this.canvas.c;
        this.x = rand(canvas.width);
        this.y = rand(canvas.height);

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



function setup() {
    var canvas = new Canvas();

    canvas.refresh();

    window.onresize  = function() {
        canvas.resize();
    }

    var p = new Particles(canvas, 500);

    setInterval(function(){
        canvas.refresh();
        p.draw();
    }, 1000);

}


window.onload = setup;
