const express = require('express')
const path = require('path')
// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '46f9f01e72cf471fa2d3f05799827d85',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

let students = []

const app = express()
app.use(express.json())


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
    // record a generic message and send it to Rollbar
    rollbar.info("html file served successfully");

})

app.post('/api/student',(req,res)=>{
    let {name} = req.body
    name = name.trim()
    students.push(name)

    rollbar.log('Student added successfully',{author: "Scott",type:"manual"})

    res.status(200).send(students)
})

const port = process.env.PORT || 4545
app.use(rollbar.errorHandler())

app.listen(port,()=>console.log(`Take us to warp ${port}`))