const express = require('express')
const path = require('path')
// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '46f9f01e72cf471fa2d3f05799827d85',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

const app = express()

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

const port = process.env.PORT || 4545

app.listen(port,()=>console.log(`Take us to warp ${port}`))