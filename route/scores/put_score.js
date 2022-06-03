module.exports = {
    url: "put_score.php",
    func: async (q, s, db) => {
        let user = await db.getUser({ udid: q.body.udid, secret: q.body.secret })
        for(let i of Object.keys(q.body))
            user[i] = q.body[i]
        
        db.write()
        return s.send("1")
    }
}