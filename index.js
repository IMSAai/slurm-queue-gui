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
              rows[i] = rows[i].split(",");
            }
            final = {
                lines: []
            };
            for(var i = 0; i<rows.length; i++){
                final.lines[i] = {jobID:rows[i][0] + '',ST:rows[i][1] + '',CT:rows[i][2] + '', REASON:rows[i][3] + '',PARTITION:rows[i][4] + '',NODES:rows[i][5] + '', USER:rows[i][6] + ''};
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
