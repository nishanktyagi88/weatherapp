const http = require('http');
const fs=require('fs');
const requests = require('requests');
const port = 3200; 
const mainFile = fs.readFileSync("index.html","utf-8");

//api.openweathermap.org/data/2.5/weather?q=lucknow&appid=c46924feeab0166865d546d3d055093e
const server = http.createServer((req,res)=>{
    if(req.url=="/"){
      requests("http://api.openweathermap.org/data/2.5/weather?q=Lucknow&appid=c46924feeab0166865d546d3d055093e")
      .on("data",(chunk)=>{
        const objdata = JSON.parse(chunk);
        const arrData = [objdata];
        console.log(arrData[0].name)
        // console.log(chunk);
        myweatherstate = '<i class="fa-solid fa-cloud" style="font-size: 170px; color:rgb(92,92,92)"></i>';

        let realtime =mainFile.replace(
            "{%temperature%}",((arrData[0].main.temp - 273.15).toFixed(1) + "°C")).replace("{%city%}",arrData[0].name)
            .replace("{%weathericon%}",myweatherstate)
        // )
        res.write(realtime,"utf-8")
        // console.log(realtime);
        res.end()
      })
      .on("end",function(err){
        console.log("ended successfully");
      })
    }
})
server.listen(port,()=>{ 
    console.log("Server is running on port",port);
});