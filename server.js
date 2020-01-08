const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const config = require('./utils/config')
const itemsRouter = require('./controllers/items')
const usersRouter = require('./controllers/users')
const authRouter = require('./controllers/auth')

const app = express()

// Bodyparser middleware
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))

// Controllers
app.use('/api/items', itemsRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// Connect to PORT
app.listen(config.PORT, () =>
  console.log(`Server running on port ${config.PORT}`)
)
