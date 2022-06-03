module.exports = {
    url: "getRefID.php",
    func: async (q, s, db) => {
        try{
            let user = await db.getUser(q.body);
            return s.send(user.refID)
        }catch(e){
            console.log(e)
            return s.send("-1")
        }
    }
}