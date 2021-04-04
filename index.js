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
            execute('squeue -a -r -h -o %A,%V,%e,%r,%P,%N,%u');
            //content += "17,2021-03-08T00:58:29,2021-03-09T00:58:29,None,gpu-long,gpu1,dsingh";
            var rows = content.split("\n");
            for(var i = 0; i<rows.length; i++){
              final[i] = rows[i].split(",");
            }
            final = {
              lines: []
          };
          for(var j = 0; j<rows.length; j++){
              final.lines[i] = {jobID:final[i][0] + '',ST:final[i][1] + '',CT:final[i][2] + '', REASON:final[i][3] + '',PARTITION:final[i][4] + '',NODES:final[i][5] + '', USER:final[i][6] + ''};
          }
          //something to make it in json form
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
