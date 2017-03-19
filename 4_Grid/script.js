
function Nodes(canvas, space, r) {
    this.canvas = canvas;
    this.space = space;
    this.r = r;

    this.draw = function () {
        for(var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].update();
            this.nodes[i].draw();
        }
    }

    this.update = function() {
        for(var i = 0; i < this.nodes.length; i++) {
            if( !this.nodes[i].isBlinking && flipcoin(0.0005) ) {
                this.nodes[i].startBlinking();
            }
        }
    }

    this.resize = function() {
        delete this.nodes;
        this.init();
    }

    this.mousemove = function(x,y) {
        for(var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].mousemove(x,y);
        }
    }

    this.mouseleave = function() {
        for(var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].mouseleave();
        }
    }

    this.init = function() {
        var s = this.space + this.r;
        var xCount = Math.ceil(this.canvas.width / s);
        var yCount = Math.ceil(this.canvas.height / s);
        this.nodes = [];
        var id = 0;
        for(var i = 0; i < xCount; i++) {
            for(var j = 0; j < yCount; j++) {
                this.nodes.push(new Node(canvas, id, {
                    p: [i*s, j*s],
                    g: 5,
                    r: r
                }));
                id += 1;
            }
        }
        console.log(this.nodes.length, xCount, yCount);
    }

    this.init();
}

function Node(canvas, id, opt) {
    opt = (typeof opt === typeof {}) ? opt : {};
    this.id = id;
    this.canvas = canvas;
    this.p = opt.p;
    this.v = opt.v;
    this.g = opt.g;
    this.r = opt.r;
    this.color = [255,255,255, 0.2];
    this.isBlinking = false;
    this.blinkStartTime = null;


    this.startBlinking = function() {
        this.isBlinking = true;
        this.blinkStartTime = new Date();
    }

    this.update = function() {
        if( this.isBlinking  ) {
            var t = ((new Date()) - this.blinkStartTime) / 1000;
            var alpha = 2*0.6 / ( Math.pow(Math.E, 3*(t - 2)) + Math.pow(Math.E, 3*(2 - t)) ) + 0.2;
            this.color[3] = clamp(alpha, 0.2, 0.8);
            if( 6.00 < t ) this.isBlinking = false;
        }
    }

    this.draw = function(x,y) {
        var c = this.canvas.c;

        c.globalAlpha = this.color[3];
        c.beginPath();
        c.arc(this.p[0], this.p[1], this.r, 0, 2*Math.PI, false);
        c.fillStyle = rgb(this.color);
        c.fill();
        c.globalAlpha = 1;
    }

    this.mousemove = function(x,y) {
        var dx = (this.p[0] - x),
            dy = (this.p[1] - y);
        var radius = 300;
        var d = clamp(Math.sqrt(dx*dx + dy*dy), 0, radius) / radius;
        this.color[1] = Math.round(plot(d, 108, 255));
        this.color[2] = Math.round(plot(d,  74, 255));
        this.color[3] = plot(d, 0.8, 0.2);
    }

    this.mouseleave = function() {
        this.color = [255,255,255, 0.2];
    }
}


function Canvas() {
    this.el = document.createElement('canvas');
    this.el.id = "playground";
    this.c = this.el.getContext('2d');
    document.body.appendChild(this.el);

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.resize = function() {
        this.el.width = window.innerWidth;
        this.el.height = window.innerHeight;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

    this.clear = function() {
        this.c.clearRect(0, 0, this.el.width, this.el.height);
    }

    this.setUpdate = function(fn) {
        this.update = fn.bind(this);
    }

    this.clear();
    this.resize();
}



window.onload = function setup() {
    var canvas = new Canvas();

    canvas.clear();

    canvas.setUpdate(function(){
        this.clear();
        var c = this.c;
        c.fillStyle = '#181818';
        c.fillRect(0,0, this.width, this.height);
    });

    var n = new Nodes(canvas, 40, 1);
    canvas.update();
    n.draw();

    document.onmousemove = function(e){
        n.mousemove(e.pageX,e.pageY);
    };

    document.onmouseleave = function(e) {
        n.mouseleave();
    }



    function Render() {
        canvas.update();
        n.update();
        n.draw();
    }

    var interval = setInterval(Render, 30);

    window.onresize  = debounce(function() {
        canvas.resize();
        canvas.update();
        clearInterval(interval);
        n.resize();
        interval = setInterval(Render, 30);
    }, 500);
}
