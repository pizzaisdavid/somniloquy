
const express = require('express')
const winston = require('winston')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.static('public'))

app.get('/v1/health', (request, response) => {
  response
    .status(200)
    .json({ status: true })
})

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: './somniloquy.log'
    })
  ]
})

logger.debug('test')

const messages = []

app.post('/v1/message', (request, response) => {
  const content = request.body.content

  if (content === undefined) {
    response
      .status(400)
      .json({ message: 'bad' })
    return
  }

  logger.debug(content)

  messages.push(content)

  response
    .status(201)
    .json({ message: 201 })
})

app.get('/v1/messages', (request, response) => {
  response
    .status(200)
    .json({
      messages
    })
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})
