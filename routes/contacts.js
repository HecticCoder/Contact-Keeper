const express = require('express')

const router = express.Router()

// @route   GET api/contacts
// @desc    get all contacts
// @access   private

router.get('/', (req, res) => {
    res.send('get all contacts from user')
})

// @route   POST api/contacts
// @desc    add contact
// @access   private
router.post('/', (req, res) => {
    res.send('add contact')
})
// @route   PUT api/contacts/:id
// @desc    update contact
// @access   private
router.put('/:id', (req, res) => {
    res.send('update contact')
})
// @route   DELETE api/contacts/:id
// @desc    delete the contact
// @access   private
router.delete('/:id', (req, res) => {
    res.send('delete contact')
})

module.exports = router