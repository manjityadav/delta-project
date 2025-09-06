const express=require("express");
const router=express.Router();
const user=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const controllerUsers  = require("../controllers/users.js");


router.route("/signup")
.get(controllerUsers.renderSignup)
.post(wrapAsync(controllerUsers.signup));


router.route("/login")
.get(controllerUsers.renderLogin)
.post(saveRedirectUrl,
    passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
   controllerUsers.login);

router.get("/logout",controllerUsers.logout);

module.exports=router;