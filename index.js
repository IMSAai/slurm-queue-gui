const childProcess = require("child_process");
var table;
var content;
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
      resolve(standardOutput);
    });
  });
}
async function main(){
        try{
        table = "<!DOCTYPE html><html><header></header><body><table>";  
        content = "JOB ID,SUBMISSION TIME,COMPLETION TIME,REASON FOR STATE,PARTITION,NODES,USER"
        content += "17, 2021-03-08T00:58:29,2021-03-09T00:58:29, None, gpu-long, gpu1, dsingh";
        var rows = content.split("\n");
        var headers = rows[0].split(",");
        if(headers != null){
                table+="<tr>";
                headers.forEach(headerCol => table+= "<td>" + headerCol + "</td>");
                table+="</tr>";
for(var i = 1; i<rows.length; i++){
                        var rowData = rows[i].split(",");
                        table+="<tr>";
                        rowData.forEach(cell => table+="<td>" + cell + "</td>");
                        table+="</tr>";
                } 
                table+="</table></body></html>";
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