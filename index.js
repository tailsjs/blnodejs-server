const e = require("express");
const a = e();
const fs = require("fs");
const files = fs.readdirSync("./route");
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapt = new FileSync('db.json');
const db = low(adapt);

db.defaults({ users: [] }).write();
db.getUser = getUser

a.use(e.urlencoded({ extended: true }));
a.use(e.json());

for(let i of files){
    const route = fs.readdirSync("./route/" + i);
    for(let s of route){
        if(s.endsWith(".js")){
            const file = require("./route/" + i  + "/" + s);
            a.post("/Boomlings/" + file.url, async(q, s)=>{
                console.log(`${q.url} has been called.`);
                await file.func(q, s, db)
            })
        }
    }
}

a.post('*', function(q, s){
    console.log(`${q.url} is invalid!`);
    s.status(404).send('-1')
});

a.get('*', function(q, s){
    s.status(404).send('Nothing to see here.');
});

a.listen(80, () => {
    console.log('Server started!');
})

async function getUser(userData){
    let user = db.get("users").find({ udid: userData.udid, secret: userData.secret }).value()
    if(!user){
        db.get("users").push({
            udid: userData.udid,
            secret: userData.secret,
            refID: genRefID(),
            ref: "",
            refs: 0,
            daily: {
                sinceLastDaily: 0,
                streak: 1
            },
            context: "",
            name: "",
            score: "",
            banned: false
        }).write()
        user = db.get("users").find({ udid: userData.udid, secret: userData.secret }).value()
    }
    return user
}

function genRefID(){
    const symbols = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789".split("");
    let refID = "";

    for(let i = 0; i < 6; i++)
        refID += symbols[random(0, symbols.length - 1)]
    
    return refID
}

function random(min, max) {
    return Math.round(Math.random() * (max - min)) + min
}