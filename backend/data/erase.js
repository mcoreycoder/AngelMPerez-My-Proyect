const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = process.env.ATLAS_CONNECTION;

export default erase=(insert)=>{
    const prom =new Promise((resolve,reject)=>{
      MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true }, function(err,client){
        if(err){
          reject(err)
        }
        else{
          const collection = client.db("Proyect").collection("MyProyect");
          console.log("delete")
          collection.deleteOne(insert, function(err, result) {
            if(err){
              reject(err)
            }
            else{
              client.close()
              resolve('removed')  
            }
          });
        }
      })
    })
    return prom
  }
  