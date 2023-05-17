const bodyParser = require('body-parser')
const express = require('express')
const axios = require("axios")
const app = express()
const port = 5000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const MakeRequest = (url) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            const response = await axios({
                url: url,
                method: "get",
            });
            resolve(response.data)
        } catch (err) {
            reject(err);
        }
    })
}

app.get('/' , (req , res)=>{
    res.send("OK")
})

app.post('/',async (req,res)=>{
    if(req.body.url){
        MakeRequest(req.body.url)
        .then((response)=> res.send(response))
        .catch((err)=>res.send(err))
    }
})

app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))