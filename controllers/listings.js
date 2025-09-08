const Listing=require("../models/listing.js");
const axios = require('axios');
const fetch = require('node-fetch');

module.exports.index=async (req,res)=>{
    
    let allListings= await Listing.find({});
    res.render("./listings/index.ejs",{allListings})
};

module.exports.searchByName=async(req,res)=>{
  let title=req.body.title;
  let data =await Listing.findOne({title:title});
  if(!data){
    req.flash("error","listing do not exist!");
    return res.redirect("/Listings");
  }
  let id=data._id;
  res.redirect(`/Listings/${id}`);
}
module.exports.renderNewFrom=(req,res)=>{
    res.render("./listings/new.ejs");
};

module.exports.showListing=async (req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/Listings");
    }
    res.render("./listings/show.ejs",{listing});
};

module.exports.createListing=async (req,res,next)=>{
    let{location}=req.body.listing;
     let link = `https://nominatim.openstreetmap.org/search?format=json&q=${location}`;
    const response = await fetch(link, {
  headers: {
    "User-Agent": "MyAirbnbClone/1.0 ,manjeetyadav2905@gmail.com", 
    "Accept": "application/json"
  }
});
     // const data=await fetch(link);
     // const data2=await data.json();
    console.log(response);
     let coordinateLat=response[0].lat;
     let coordinateLon=response[0].lon;

    let url=req.file.path;
    let filename=req.file.filename;
    let newListing= new Listing(req.body.listing);
    newListing.coordinates.lat=coordinateLat;
    newListing.coordinates.lon=coordinateLon;
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    await newListing.save();
    
    req.flash("success","New Listing Created");
    res.redirect("/Listings");   
};

module.exports.editListing=async (req,res)=>{
    let{id}=req.params;
    let user=await Listing.findById(id);
     if(!user){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/Listings");
    }
    let originalUrl=user.image.url;
    originalUrl=originalUrl.replace("/upload","/upload/w_250");
    res.render("./listings/edit.ejs",{user,originalUrl});
};

module.exports.updateListing=async (req,res)=>{
    let{id}=req.params;
    let editListing=await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file !=="undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    editListing.image={url,filename};
    await editListing.save();
    }
    req.flash("success","Listing Updated!");
    res.redirect(`/Listings/${id}`);
};

module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect("/Listings");
};
