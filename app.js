require('dotenv').config({ path: '.env' });
var express = require('express')
const http = require('http')
const port = normalizePort(process.env.PORT || 3001)
const bodyParser = require('body-parser')

const Joi = require("joi");
var app = express()

const validateBody = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  name: Joi.string().required(),
  occupation:Joi.string().valid('salaried','self','student').required(),
  salary: Joi.alternatives().conditional('occupation', { is: Joi.string().valid('salaried','self'), then: Joi.number().required(),otherwise:Joi.number().valid(null)  }),
  organization:Joi.alternatives().conditional('occupation', { is: Joi.string().valid('salaried'), then: Joi.string().required(),otherwise:Joi.string().valid('',null) })//
});
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); //handle queryStrings
// app.use(bodyParser.json())        //handle json data
app.use(bodyParser.json({ limit: '50mb' }))

app.post('/conditional-validation',(req,res,next)=>{

    let {name,email,occupation,salary,organization} = req.body;
    const { error } = validateBody.validate(req.body);
    if (error) {
        res.json({
            meta: {
                Status: false,
                Message: error.message,
                code: 400
            },
            Data: {}
        });
        return;
    }
    res.json({
        meta: {
            Status: true,
            Message: "success",
            code: 200
        },
        Data: req.body
    });

})



/**
 * Express MiddleWare
 */         //handle multipart requests




app.use((err, req, res, next) => {
  if (err) {
    let errDetail = []
    // we had a joi error, let's return a custom 400 json response
    if (err) {
      err.error.details.map(function (item) {
        var temp = {}
        temp[item.context.key] = item.message
        errDetail.push(temp)
      })
    }

    //return api response for joi error

  } else {
    //return other errors
  }
});

const server = http.createServer(app)
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function onError(error) {
  console.error('testing')
  if (error.syscall !== 'listen') {
    throw error
  }
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  console.error('Listening on ' + bind)
}

function normalizePort(val) {
  var port = parseInt(val, 10)
  if (isNaN(port)) {
    // named pipe
    return val
  }
  if (port >= 0) {
    // port number
    return port
  }
  return false
}