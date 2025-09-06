const Listing=require("../models/listing");

module.exports.rooms=async(req,res)=>{
    let data=await Listing.find({category:"Rooms"});
    res.render("./searchicon/rooms.ejs",{data});
}

module.exports.mountains=async(req,res)=>{
    let data=await Listing.find({category:"Mountains"});
    res.render("./searchicon/mountain.ejs",{data});
}

module.exports.iconiccities=async(req,res)=>{
    let data=await Listing.find({category:"Iconic Cities"});
    res.render("./searchicon/iconcities.ejs",{data});
}

module.exports.castles=async(req,res)=>{
    let data=await Listing.find({category:"Castles"});
    res.render("./searchicon/castle.ejs",{data});
}

module.exports.amazingpools=async(req,res)=>{
    let data=await Listing.find({category:"Amazing Pools"});
    res.render("./searchicon/amazingpools.ejs",{data});
}

module.exports.camping=async(req,res)=>{
    let data=await Listing.find({category:"Camping"});
    res.render("./searchicon/camping.ejs",{data});
}

module.exports.beach=async(req,res)=>{
    let data=await Listing.find({category:"Beach"});
    res.render("./searchicon/beach.ejs",{data});
}

module.exports.artic=async(req,res)=>{
    let data=await Listing.find({category:"Artic"});
    res.render("./searchicon/artic.ejs",{data});
}