module.exports = {
    url: "checkRefCredit.php",
    func: async (q, s, db) => {
        let user = await db.getUser(q.body)
        let users = db.get("users").find({ ref: user.refID }).value()
        if(!users)return s.send("0;0")

        let oldRefs = user.refs;
        if(!users || !Array.isArray(users))
            users = [ users ]

        if(users.length != user.refs){
            user.refs = users.length;
            db.write()
        };

        s.send(`${users.length-oldRefs};${user.refs}`)
    }
}