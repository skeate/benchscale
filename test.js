var benchscale = require('./index');

var linear = function(haystack, needle){
  for( var i = 0; i < haystack.length; i++ ){
    if( haystack[i] === needle ) return i;
  }
};

var binary = function(haystack, needle, min, max){
  if( !min ){ min = 0; }
  if( !max ){ max = haystack.length - 1; }
  var mid = Math.floor((max+min) / 2);

  if( haystack[mid] === needle ) return mid;
  if( haystack[mid] < needle ) return binary(haystack,needle,mid+1,max);
  if( haystack[mid] > needle ) return binary(haystack,needle,min,mid);
};

var gen = function(n){
  var r = [];
  for(var j = 0; j < n; j++) r.push(j);
  return r;
};

benchscale.bench({
  funcs: [linear, binary],
  gen: gen
});
