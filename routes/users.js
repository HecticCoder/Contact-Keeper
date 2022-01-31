const express = require('express')

const router = express.Router()

// @route   POST api/users
// @desc    register user
// @access    public

router.post('/', (req, res) => {
    res.send('register a user')
}) // in this '/' pretains to users in this file  
//get is used for fetching data from the server and post is used to submit data to the server
// whereas put and delete are used to update and delete something from the server

module.exports = router