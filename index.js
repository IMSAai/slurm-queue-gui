const exec = require('child_process').exec;
const fs = require('fs');
const handlebars = require('handlebars');
const express = require('express');
const app = express();
const port = 8080;

function renderToString(source, data) {
  var template = handlebars.compile(source);
  var outputString = template(data);
  return outputString;
}

app.get('/', (req, res) => {
        //executing slurm command
        exec('squeue -a -r -h -o %A,%V,%e,%r,%P,%N,%u', (err, content, stderr) => {
            //initializing final sending variable
            var final = {
                lines: []
            };
            //rows of jobs
            let rows = content.split("\n");
            for(let i = 0; i<rows.length-1; i++){
                rows[i] = rows[i].split(",");
            }
            //putting job info into final with each column
            for(let i = 0; i<rows.length-1; i++){
                final.lines[i] = {jobID:rows[i][0] + '',ST:rows[i][1] + '',CT:rows[i][2] + '', REASON:rows[i][3] + '',PARTITION:rows[i][4] + '',NODES:rows[i][5] + '', USER:rows[i][6] + ''};
            }
            //header
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.readFile('home.handlebars', function(err,data){
              if(!err){
                //standard handlebars
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
