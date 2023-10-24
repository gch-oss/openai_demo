const express = require('express')
const { generateMeta, generateImage } = require('./controllers/openaiController')

//app set
const app = express()
app.listen(4000, () => {console.log('Server is running on port 4000')})

//middleware
app.use(express.json())
app.use(express.static('public'))

//routes
app.post('/openai/meta', generateMeta)
app.post('/openai/image', generateImage)