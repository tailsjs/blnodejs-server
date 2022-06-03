module.exports = {
    url: "get_scores.php",
    func: async (q, s, db) => {
        let users = db.get("users").find(e => e.name != "" && e.banned == false).value()
        let userString = []
        if(!users || !Array.isArray(users))
            users = [ users ]
        for(let i of users)
            userString.push(`${i.name};${i.udid};${i.score};${i.context}`) // it's very safe put udid to scores.......
        
        
        return s.send(userString.join(" "))
    }
}