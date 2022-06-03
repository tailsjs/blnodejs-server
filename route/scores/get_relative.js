module.exports = {
    url: "get_relative.php",
    func: async (q, s, db) => {
        let users = db.get("users").find(e => e.name != "" && e.banned == false).value()
        let userString = []

        if(!users)return s.send("-1")

        if(!Array.isArray(users))
            users = [ users ]

        users.sort((a, b) => Number(a.score) - Number(b.score))

        for(let i of users)
            userString.push(`${i.name};${i.udid};${i.score};${i.context}`) // it's very safe put udid to scores.......
        
        
        return s.send("0__ " + userString.join(" "))
    }
}