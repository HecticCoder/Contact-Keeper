const express = require('express')
const router = express.Router()

// @route   get api/auth
// @desc    get logged in user
// @acces   private

router.get('/', (req, res) => {
    res.send('user logged in')
})


// @route   POST api/auth
// @desc    auth user
// @access   private

router.post('/', (req, res) => {
    res.send('user added')
})

module.exports = router

module.exports = router