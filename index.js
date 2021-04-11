const exec = require('child_process').exec;
const fs = require('fs');
const handlebars = require('handlebars');
const express = require('express');
const app = express();
const port = 8080;
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};
function renderToString(source, data) {
  var template = handlebars.compile(source);
  var outputString = template(data);
  return outputString;
}
//squeue -a -r -h -o %A,%V,%e,%r,%P,%N,%u
app.get('/', (req, res) => {
        exec('squeue -a -r -h -o %A,%V,%e,%r,%P,%N,%u', (err, content, stderr) => {
            var final = {
                lines: []
            };
            let rows = content.split("\n");
            for(let i = 0; i<rows.length-1; i++){
                rows[i] = rows[i].split(",");
            }
            for(let i = 0; i<rows.length-1; i++){
                final.lines[i] = {jobID:rows[i][0] + '',ST:rows[i][1] + '',CT:rows[i][2] + '', REASON:rows[i][3] + '',PARTITION:rows[i][4] + '',NODES:rows[i][5] + '', USER:rows[i][6] + ''};
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.readFile('home.handlebars', function(err,data){
              if(!err){
                let source = data.toString();
                source = renderToString(source, final.lines);
                res.end(source);
              }else{
                console.log(err);
              }
            });
        });
})
app.listen(port, () => {
    console.log('Server started on localhost:9090; press Ctrl-C to terminate...!');
})
