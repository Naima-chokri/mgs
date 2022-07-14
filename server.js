const express = require('express')
const app = express()
const connectDB = require('./config/connectDB')

app.use(express.json())


connectDB()


app.use("/persons",require('./routes/PersonRoutes'))


const port = 5000

//app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))