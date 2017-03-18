
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// Auxiliary Functions

HACK = {};


HACK.log = true;
function log() {
    return console.log.apply(this,arguments);
}

// Returns Int
function rand(a,b, double) {
	// [0,a]
    if( arguments.length == 1 )
    	return Math.round(Math.random() * a);
    // [a,b]
    else if( arguments.length == 2 )
    	return a + Math.round(Math.random() * (b - a)); 
    // [0,...]
    return Math.round(Math.random() * Number.MAX_SAFE_INTEGER);
}

// Returns Double
function random(a,b) {
	// [0,a]
    if( arguments.length == 1 )
    	return Math.random() * a;
    // [a,b]
    else if( arguments.length == 2 )
    	return a + (Math.random() * (b - a)); 
    // [0,...]
    return Math.random();
}

// Format text
function format(str) {
  if( typeof str != typeof '') return null;
  if( arguments.length <= 1 ) return str;
  for(var i = 1; i < arguments.length; i++) {
    str = str.replace(new RegExp('\\{'+(i-1)+'\\}','g'),arguments[i]);
  }
  return str;
}


// Given a function fn, runs only one at a time.
function oneAtATime(fn) {
    var isdone = true,
        done = function() { isdone = true; };
    return function() {
        if( isdone ) {
            isdone = false;
            var args = [].slice.call(arguments).concat(done);
            fn.apply(this, args);
        }
    }
}


// David Walsh's throttling function
function debounce(fn, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) fn.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) fn.apply(context, args);
    };
};


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// Graphics Functions


function DrawCircle(c, x, y, r) {
    c.beginPath();
    c.arc(x, y, r, 0, 2*Math.PI, false);
    c.fillStyle = '#fff';
    c.fill();
}


function rgb(r,g,b) {
    return 'rgb('+r+','+g+','+b+')';
}

function hsl(h,s,l) {
    return 'hsl('+h+','+s+'%,'+l+'%)';
}


