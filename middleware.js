 const Listing=require("./models/listing.js");
 const ExpressErr=require("./utils/ExpressErr.js");
 const { listingSchema } = require("./schema.js");
 const { reviewSchema } = require("./schema.js");
 const Reviews=require("./models/review");



 module.exports.isLoggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged in to create  listing!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
      let{id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","you are not the owner of this listing");
        return res.redirect(`/Listings/${id}`);
    }
    next();
}

module.exports.validateListing=(req,res,next)=>{
     let{error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(',');
        throw new ExpressErr(400,errMsg);
    }else{
        next();
    }
}

module.exports.validateReview=(req,res,next)=>{
     let{error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(',');
        throw new ExpressErr(400,errMsg);
    }else{
        next();
    }
}

module.exports.isReviewOwner=async(req,res,next)=>{
      let{id,reviewId}=req.params;
    let Review=await Reviews.findById(reviewId);
    if(!Review.author.equals(res.locals.currUser._id)){
        req.flash("error","you are not the author of this review");
        return res.redirect(`/Listings/${id}`);
    }
    next();
}