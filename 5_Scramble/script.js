

function Scramble() {
    var el = document.querySelector(arguments[0]);
    var alpha = arguments[1] || '!<>-_\\/[]{}—=+*^?#________';
    var queue = [];
    var frame = 0;
    var self = this;

    var randChar = function() {
        return alpha[Math.floor(Math.random() * alpha.length)];
    }

    this.setText = function(text) {
        var oldText = el.innerText,
            length = Math.max(oldText.length, text.length);
        queue = [];

        var promise = new Promise(function(resolve){
            self.resolve = resolve;
        });
        for(var i = 0; i < length; i++) {
            var from = oldText[i] || '';
            var to = text[i] || '';
            var start = Math.floor(Math.random() * 40);
            var end = start + Math.floor(Math.random() * 40);
            queue.push({ from: from, to: to, start: start, end: end });
        }
        cancelAnimationFrame(self.frameRequest)
        frame = 0;
        update();
        return promise;
    }

    var update = function() {
        var output = '',
            complete = 0;

        for(var i = 0, n = queue.length; i < n; i++) {
            var from = queue[i].from,
                to = queue[i].to,
                start = queue[i].start,
                end = queue[i].end,
                char = queue[i].char;

            if( end <= frame ) {
                complete++;
                output += to;
            } else if( start <= frame ) {
                if( !char || Math.random() < 0.28 ) {
                    char = randChar();
                    queue[i].char = char;
                }
                output += '<span class="dud">' + char + '</span>';
            } else {
                output += from;
            }
        }
        el.innerHTML = output;
        if( complete === queue.length ) {
            self.resolve();
        } else {
            self.frameRequest = requestAnimationFrame(update.bind(self));
            frame++;
        }
    }
}



window.onload = function setup() {
    var phrases = [
      'Hello World!',
      'Welcome',
      'I am Vincenzo Marconi',
      'and this is my site.'
    ]

    var fx = new Scramble('.text')

    var counter = 0;
    function next() {
        fx.setText(phrases[counter]).then(function() {
            setTimeout(next, 800)
        });    
        counter = (counter + 1) % phrases.length;
    }
    next();
}
