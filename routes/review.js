const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync");
const Reviews=require("../models/review");
const Listing=require("../models/listing");
const { validateReview, isLoggedin, isReviewOwner } = require("../middleware");
const controllerReviews= require("../controllers/reviews");



// reviews
//post route

router.post("/",isLoggedin, validateReview, wrapAsync(controllerReviews.createReview));

// delete route

router.delete("/:reviewId",isLoggedin,isReviewOwner, wrapAsync(controllerReviews.deleteReview));

module.exports=router;

