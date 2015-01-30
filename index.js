var Benchmark = require('benchmark');

module.exports.bench = function(opts){
  if( !opts.funcs ){ throw 'Must declare functions to test.'; }
  if( !opts.gen ){ throw 'Must declare function to generate test case.'; }

  var suites = [];
  
  var setupForN = function(n){
    var suite = new Benchmark.Suite;

    opts.funcs.forEach(function(func, i){
      suite.add({
        'name': 'test '+i,
        'fn': function(){
          var testCase = opts.gen(n);
          func(testCase, Math.floor(Math.random()*n));
        },
        meta: n
      });
    });

    suite.on('complete', function(){
      anotherComplete();
    });

    suites.push(suite);
  };

  var base = 100;
  for( var i = base; i < base + 5; i++ ){
    setupForN(i);
  }

  console.log('running tests...');
  suites.forEach(function(suite){
    suite.run({async:true});
  });

  var running = suites.length;
  var anotherComplete = function() {
    if( --running ) {
      console.log(running + ' left to complete');
      return;
    }

    // all suites have run. output their data

    suites.forEach(function(suite){
      console.log(' -- size '+suite[0].meta+' -- ')
      suite.forEach(function(bm){
        console.log(
          bm.name,
          1 / bm.times.period
        );
      });
    });
  };
};
