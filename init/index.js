const mongoose=require('mongoose');
const initData=require("./data");
const listing = require('../models/listing');

const mongo_url='mongodb://127.0.0.1:27017/wanderlust';

 async function main(){
    await mongoose.connect(mongo_url);
}

main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
})


const initDB=async ()=>{
    await listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:'68b3a7392c411724b17646e7'}));
    await listing.insertMany(initData.data);
    console.log("data was initilized");
}

initDB();
