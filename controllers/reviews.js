const Listing=require("../models/listing");
const Reviews=require("../models/review");

module.exports.createReview= async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    let newReview=new Reviews(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
    newReview.save();
    listing.save();
    req.flash("success","New Review Created")
    res.redirect(`/Listings/${id}`);
};

module.exports.deleteReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Reviews.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    req.flash("success","Review Deleted!");
    res.redirect(`/Listings/${id}`);
};