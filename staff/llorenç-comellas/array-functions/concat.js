/**
 *  Method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.
 * 
 * @param {args} array The array to iterate.
 * 
 
 */


function concat(...args){
  var results = []
  var j = 0;
  for (var i = 0; i<args.length;i++){
    for(var k =0; k<args[i].length;k++){
      results[j]= args[i][k];
    j++;
    }
      
  }
  console.log(results)

}


