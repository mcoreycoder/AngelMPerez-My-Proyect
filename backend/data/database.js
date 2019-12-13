const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = process.env.ATLAS_CONNECTION;

const connection=()=>{
  const prom = new Promise((resolve,reject)=>{
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true },function(err,client){
      if(err){
        reject(err)
      }
      else{
        // const collection = client.db("Proyect").collection("MyProyect");
        console.log("conected")
        client.close();
        resolve('conected')
      }
    })  
  })
  return prom
}
const create =(insert)=>{
  const prom =new Promise((resolve,reject)=>{
    MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true }, function(err,client){
      if(err){
        reject(err)
      }
      else{
        console.log('create')
        const collection = client.db("Proyect").collection("MyProyect");

        collection.insertOne(insert,function(err,result){
            if(err){
              reject(err)
            }
            else{
              client.close()
              resolve('inserted')
            }
          })
      }
    })
  })
  return prom
}
const read=()=>{
  const prom = new Promise((resolve,reject)=>{
    MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true }, function(err,client){
      if(err){
        reject(err)
      }
      else{
        console.log('read')
        const collection = client.db("Proyect").collection("MyProyect");
      
        collection.find({}).toArray(function(err, docs) {
          if(err){
            reject(err)
          }
          else{
          console.log("Found the following records");
          console.log(docs)
          client.close()
          resolve(docs)
          }
        });
      }
   })
  })
  return prom
}
const readFilter=(type)=>{
  const prom = new Promise((resolve,reject)=>{
    MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true }, function(err,client){
      if(err){
        reject(err)
      }
      else{
        console.log('read')
        const collection = client.db("Proyect").collection("MyProyect");
      
        collection.find({"Type": type}).toArray(function(err, docs) {
          if(err){
            reject(err)
          }
          else{
          console.log("Found the following records");
          console.log(docs)
          client.close()
          resolve(docs)
          }
        });
      }
   })
  })
  return prom
}
const update=(insert,name)=>{
  const prom = new Promise((resolve, reject)=>{
    MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true }, function(err,client){
      if(err){
        reject(err)
      }
      else{
        const collection = client.db("Proyect").collection("MyProyect");
        console.log("update")
        collection.updateOne({"Name":name},{$set: insert},function(err,result){
          if(err){
            reject(err)
          }
          else{
            client.close()
            resolve('updated')
          }
        })
        
      }
    })
  })
  return prom
}
const erase=(insert)=>{
  const prom =new Promise((resolve,reject)=>{
    MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true }, function(err,client){
      if(err){
        reject(err)
      }
      else{
        const collection = client.db("Proyect").collection("MyProyect");
        console.log("delete")
        
        collection.deleteOne({'Name':insert}, function(err, result) {
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

module.exports ={
  connection,
  create,
  read,
  readFilter,
  update,
  erase
} 