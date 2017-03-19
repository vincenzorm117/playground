
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

// Return True/False depending on wether the 
//   random num falls below p which is by default 0.5
function flipcoin(p) {
    p = isNaN(p) ? 0.5 : ((0 <= p && p <= 1) ? p : 0.5);
    return Math.random() < p;
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

// WIP: needs more work
// Function transformation
// function transform(fn, amp, x, b) {
//     amp = isNaN(amp) ? 1 : amp;
//     x = isNaN(x) ? 1 : x;
//     b = isNaN(b) ? 1 : b;
//     return function() {
//         return amp*fn(x)+b;
//     }
// }

function clamp(num, min,max) {
    return Math.min(Math.max(num, min), max);
}


function dist(a,b) {
    var L = a.length, sum;
    for(var i = 0; i < L; i++) {
        var diff = a[i]-b[i];
        sum += diff*diff
    }
    return Math.sqrt(sum);
}

function plot(t,a,b) {
    return a + (b-a)*t
}


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


function rgb() {
    if( arguments.length == 1 )
        return 'rgb('+arguments[0][0]+','+arguments[0][1]+','+arguments[0][2]+')';
    return 'rgb('+arguments[0]+','+arguments[1]+','+arguments[2]+')';
}

function hsl(h,s,l) {
    return 'hsl('+h+','+s+'%,'+l+'%)';
}
