const itemsRouter = require('express').Router()
const Item = require('../models/item')
const middleware = require('../utils/middleware')

//@route GET api/items
//@desc get all items
//@access public
itemsRouter.get('/', async (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
})

//@route POST api/items
//@desc create an item
//@access private
itemsRouter.post('/', middleware.auth, async (req, res) => {
  const newItem = await new Item({
    name: req.body.name
  })

  newItem.save().then(item => res.json(item))
})

//@route DELETE api/items/:id
//@desc delete an item
//@access private
itemsRouter.delete('/:id', middleware.auth, async (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove())
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }))
})

module.exports = itemsRouter
