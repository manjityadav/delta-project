const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync");
const { rooms, mountains, iconiccities, castles, amazingpools, camping, beach, artic } = require("../controllers/search");


router.get("/search/rooms",wrapAsync(rooms));

router.get("/search/iconiccities",wrapAsync(iconiccities));

router.get("/search/mountains",wrapAsync(mountains));

router.get("/search/castles",wrapAsync(castles));

router.get("/search/amazingpools",wrapAsync(amazingpools));

router.get("/search/camping",wrapAsync(camping));

router.get("/search/beach",wrapAsync(beach));

router.get("/search/artic",wrapAsync(artic));

module.exports=router;