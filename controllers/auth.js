const authRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const middleware = require('../utils/middleware')

//@route POST api/auth
//@desc auth user
//@access public
authRouter.post('/', (req, res) => {
  const { email, password } = req.body

  // Simple validation
  if (!email || !password) {
    res.status(400).json({ msg: 'Please enter all fields' })
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: 'User does not exist' })

    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })

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

//@route GET api/auth/user
//@desc get user data
//@access private
authRouter.get('/user', middleware.auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password') // don't return password
    .then(user => res.json(user))
})

module.exports = authRouter
