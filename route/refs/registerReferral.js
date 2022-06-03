module.exports = {
    url: "registerReferral.php",
    func: async (q, s, db) => {
        let user = await db.getUser({ udid: q.body.udid, secret: q.body.secret })
        if(user.ref != "")return s.send("kE01")
        let refUser = db.get("users").find({ refID: q.body.refID }).value();
        if(!refUser)return s.send("kE02")
        if(refUser.ref == user.ref)return s.send("kE03")

        user.ref = q.body.refID
        db.write()

        return s.send(q.body.refID)
    }
}