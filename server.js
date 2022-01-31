const express = require('express'); //common js(different than import in react which uses es6 module)

const app = express()

app.get('/', (req, res) => res.json({new: 'shit'}) )


//define Routes

app.use('/api/users', require('./routes/users'))
app.use('/api/contacts', require('./routes/contacts'))
app.use('/api/auth', require('./routes/auth'))
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
 
