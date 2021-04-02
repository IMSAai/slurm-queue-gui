const childProcess = require("child_process");
var content;
var final;
function execute(command) {
  return new Promise(function(resolve, reject) {
    childProcess.exec(command, function(error, standardOutput, standardError) {
      if (error) {
        reject();
        return;
      }
      if (standardError) {
        reject(standardError);
        return;
      }
      content += standardOutput;
    });
  });
}
function arrayToJSON(arr){
  var keys = arr[0];
  var newArr = arr.slice(1, arr.length);

  var formatted = [],
  data = newArr,
  cols = keys,
  l = cols.length;
  for(var i = 0; i<data.length; i++){
    var d = data[i],
    o={};
      for(var j =- 0; j<l; j++)
          o[cols[j]]=d[j];

    formatted.push(o);
  }
  return formatted;
}
//squeue -a -r -h -o %A,%V,%e,%r,%P,%N,%u
async function main(){
        try{
          content = execute('squeue -a -r -h -o %A,%V,%e,%r,%P,%N,%u');
          //content += "17,2021-03-08T00:58:29,2021-03-09T00:58:29,None,gpu-long,gpu1,dsingh";
          var rows = content.split("\n");
          for(var i = 0; i<rows.length; i++){
            final[i] = rows[i].split(",");
          }
          final = arrayToJSON(final);
}catch(error){
          console.error(error);
        }
}
main();
var http = require('http');
http.createServer(function(req, res){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(table);
}).listen(8080);
console.log('Server started on localhost:8080; press Ctrl-C to terminate...!');
