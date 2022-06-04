module.exports = {
    url: "checkDailyReward.php",
    func: async (q, s, db) => {
        let user = await db.getUser(q.body);
        let canGot = 1;
        let tier = user.daily.streak

        if(Math.floor((Date.now() - user.daily.sinceLastDaily) / 1000) < 86400)
            canGot = 0;
        
        if(Math.floor((Date.now() - user.daily.sinceLastDaily) / 1000) > 86400*2){
            tier = 1
            user.daily.streak = 1
        }
        
        s.send(`${canGot}_${tier}`)
        
        if(canGot == 1){
            user.daily.streak += 1;
            user.daily.sinceLastDaily = Date.now()
            db.write()
        }
        return;
    }
}