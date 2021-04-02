const childProcess = require("child_process");
childProcess.config({nodeRequire: require});
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
//squeue -a -r -h -o %A,%V,%e,%r,%P,%N,%u
async function main(){
        try{
          content = execute('squeue -a -r -h -o %A,%V,%e,%r,%P,%N,%u');
          var rows = content.split("\n");
          for(var i = 0; i<rows.length; i++){
            final[i] = rows[i].split(",");
          }
 //content = await execute("ls");
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
