const bcrypt = require('bcryptjs')
const users = []

// if (users[i].username === username && users[i].password === password)

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      // console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
        var existingPass = bcrypt.compareSync(password, users[i].passHash)
        if (existingPass) {
          let newUserObj = {...users[i]}
          delete newUserObj.passHash
          res.status(200).send(newUserObj)
          return
        }
       }
       res.status(400).send("User not found.")
    }
  },
    register: (req, res) => {
        console.log('Registering User')
        let { username, email, firstName, lastName, password } = req.body
        console.log(req.body)
        // users.push(req.body)

        const salt = bcrypt.genSaltSync(5)
        // console.log('salt', salt)
        const passHash = bcrypt.hashSync(password, salt)
        console.log("registering:", passHash)

      let userObj = {
        username,
        email,
        firstName,
        lastName,
        passHash
      }

      // console.log('userObj:', userObj)
      users.push(userObj)

        console.log('passHash', passHash)
        res.status(200).send(req.body)
    }
}