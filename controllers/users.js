const user=require("../models/user.js");

module.exports.renderSignup=(req,res)=>{
    res.render("./users/signup.ejs");
};

module.exports.signup=async(req,res,next)=>{
    try{
           let{username,password,email}=req.body;
    const newUser=new user({username,email});
    let registeredUser=await user.register(newUser,password);
    req.login(registeredUser,(er)=>{
        if(er){
            return next(er);
        }
        req.flash("success","Welcome to Wanderlust");
        res.redirect("/Listings");
    }) 
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }

};

module.exports.renderLogin=(req,res)=>{
    res.render("./users/login.ejs")
};

module.exports.login= async(req,res)=>{
    req.flash("success","welcome back to Wanderlust");
    let redirectUrl=res.locals.redirectUrl||"/Listings";
    res.redirect(redirectUrl);
};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/Listings");
    })
};