const morgan = require('morgan')
morgan.token('type', (req, res) => req.headers['content-type'] )
morgan.token('req', (req, res)=> JSON.stringify(req.body) )

const tinyLogger = morgan('tiny')

const customLoggerFormat = ':method :url :status :user-agent - :res[content-length] bytes :response-time ms :type :req'
const requestDataLogger = morgan(customLoggerFormat)

module.exports = { tinyLogger, requestDataLogger }