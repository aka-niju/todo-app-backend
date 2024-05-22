const mongoose = require('mongoose')


async function connectToDb(url, dbName){
   await mongoose.connect(url, {dbName})
   .then((c)=> {
    console.log(`MongoDB connected successfully with ${c.connection.host}`);
   }).catch((e)=> {
    console.log(e);
   })
}

module.exports = {connectToDb};