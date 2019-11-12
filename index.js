const fs = require('fs');
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt:// url',{
    clientId: "node-user",
    username: user,
    password: pass,
    port: port ,
});

const times = {
    data: []
};

client.on('connect',() => {
    console.log("Connected");
});
// Subscribes

client.subscribe('esp/data');
client.subscribe('getdata');


// Recieves and Publishes

client.on("message",(topic,message,packet) => {
    
    if(topic == "esp/data"){
        let msg = message.toString();
        console.log("Added new time: "+msg);
        msg = parseInt(msg);
        times.data.push(msg);
    }
    
    if(topic == "getdata"){
        var json = JSON.stringify(times);
        fs.writeFile('time.json',json,'utf8',(err)=>{
            if(err){
                console.log(err);
            }else{
                console.log("Json created");
            }
        });
        console.log(times);
    }
});
