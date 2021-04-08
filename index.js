const childProcess = require("child_process");
const fs = require('fs');
const handlebars = require('handlebars');
const express = require('express');
const app = express();
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
      console.log(standardOutput);
    });
  });
}
function renderToString(source, data) {
  var template = handlebars.compile(source);
  var outputString = template(data);
  return outputString;
}
//squeue -a -r -h -o %A,%V,%e,%r,%P,%N,%u
async function main(){
        try{
          final = {
            lines: []
          };
            if(content!=null){
            execute('squeue -a -r -h -o %A,%V,%e,%r,%P,%N,%u');
            //content += "17,2021-03-08T00:58:29,2021-03-09T00:58:29,None,gpu-long,gpu1,dsingh";
            var rows = content.split("\n");
            for(var i = 0; i<rows.length; i++){
              rows[i] = rows[i].split(",");
           }
            for(var i = 0; i<rows.length; i++){
                final.lines[i] = {jobID:rows[i][0] + '',ST:rows[i][1] + '',CT:rows[i][2] + '', REASON:rows[i][3] + '',PARTITION:rows[i][4] + '',NODES:rows[i][5] + '', USER:rows[i][6] + ''};
            }
           }
          }catch(error){
              console.error(error);
          }
}
app.get('/', (req, res) => {
        //main();
        try{
          final = {
            lines: []
          };
            if(content!=null){
            execute('squeue -a -r -h -o %A,%V,%e,%r,%P,%N,%u');
            //content += "17,2021-03-08T00:58:29,2021-03-09T00:58:29,None,gpu-long,gpu1,dsingh";
            var rows = content.split("\n");
            for(var i = 0; i<rows.length; i++){
              rows[i] = rows[i].split(",");
           }
            for(var i = 0; i<rows.length; i++){
                final.lines[i] = {jobID:rows[i][0] + '',ST:rows[i][1] + '',CT:rows[i][2] + '', REASON:rows[i][3] + '',PARTITION:rows[i][4] + '',NODES:rows[i][5] + '', USER:rows[i][6] + ''};
            }
           }
          }catch(error){
              console.error(error);
          }
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('home.handlebars', function(err,data){
          if(!err){
            var source = data.toString();
            source = renderToString(source, final.lines);
            res.end(source);
          }else{
            console.log(err);
          }
        });
}).listen(8080);
console.log('Server started on localhost:9090; press Ctrl-C to terminate...!');
