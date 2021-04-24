const exec = require('child_process').exec;
const express = require('express');
const app = express();
const port = 8080;

app.get('/api/', (req, res) => {
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
          if (final.lines[i].CT === "N/A") {
            final.lines[i].CT === ""
          }
      }
      res.json(final)
  });
})
app.listen(port, () => {
    console.log(`Server started on port ${port}; press Ctrl-C to terminate...!`);
})
