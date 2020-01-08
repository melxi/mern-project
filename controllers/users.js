const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

//@route POST api/users
//@desc create a user
//@access public

usersRouter.post('/', (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400).json({ msg: 'Please enter all fields' })
  }

  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: 'User already exists' })

    const newUser = new User({
      name,
      email,
      password
    })

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash

        newUser.save().then(user => {
          jwt.sign({ id: user.id }, process.env.SECRET, (err, token) => {
            if (err) throw err
            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              }
            })
          })
        })
      })
    })
  })
})

module.exports = usersRouter
