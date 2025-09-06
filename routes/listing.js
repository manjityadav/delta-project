const express=require("express");
const router=express.Router();

const wrapAsync=require("../utils/wrapAsync");
const Listing=require("../models/listing");
const {isLoggedin,isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage })


router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedin,validateListing,upload.single("listing[image]"), wrapAsync(listingController.createListing));

router.post("/search", listingController.searchByName);


//new route

router.get("/new",isLoggedin,listingController.renderNewFrom);


router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedin,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedin,isOwner,wrapAsync(listingController.deleteListing));


//edit route
router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listingController.editListing));


module.exports=router;