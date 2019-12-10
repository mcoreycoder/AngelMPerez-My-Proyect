const Express =require('express')
const server = Express()
const app = require('../data/test')
const cors = require('cors')
server.use(Express.json())
server.use(cors())

server.listen(4000,()=>console.log("Ready in Port 4000"))

server.get('/',async (req, res) => {
    // const results = app.read()
    res.send(await app.read())
})

server.get('/:type',async (req, res) => {
    // const results = app.read()
    res.send(await app.readFilter(req.params.type))
    console.log(req.params.type)
})

server.post('/',async function(req,res){
    await app.create(req.body)
    console.log(req.body)
    res.send('success')
})

server.patch('/:type',async function(req,res){
    res.send(await app.update(req.body,req.params.type))
})

server.delete('/:type',async function(req,res){
    let result = await app.erase(req.params.type)
    // console.log(req.params)
    console.log(result)
    res.send('removed : '+ req.params.type )
})
