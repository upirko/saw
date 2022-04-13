import express from 'express'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/sendMessage', (req, res) => {
  // TODO: send letter
  res.end()
})

module.exports = app
