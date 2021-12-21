const router = require("express").Router();

const Wishlist = require("../models/Wishlist");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");


//CREATE
router.post("/add", verifyToken, async(req, res) => {
    const newWishlist = new Wishlist(req.body);

    try{
        const savedWishlist = await newWishlist.save();
        res.status(200).json(savedWishlist);
    }
    catch(err){
        res.status(500).json(err);
    }
})



// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async(req, res) => {
    
    try{
        const updatedWishlist = await Wishlist.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new: true});

        res.status(200).json(updatedWishlist);
    }
    catch(err){
        res.status(500).json(err);
    }

})



// //DELETE
router.delete("/:id", verifyTokenAndAuthorization, async(req, res) => {
    try{
        await Wishlist.findByIdAndDelete(req.params.id);
        res.status(200).json("Wishlist has been deleted.");
    }
    catch(err){
        res.status(500).json(err);
    }
})



//GET USER WISHLIST
router.get("/find/:userId",verifyTokenAndAuthorization, async(req, res) => {
    try{
        const wishlist = await Wishlist.findOne({userId: req.params.userId});
        res.status(200).json(wishlist);
    }
    catch(err){
        res.status(500).json(err);
    }
})



 //GET ALL WISHLISTS
 router.get("/", verifyTokenAndAdmin, async(req, res) => {
     try{
        const wishlists = await Cart.find();
        res.status(200).json(wishlists);
     }
     catch(err){
        res.status(500).json(err);
    }
 })



module.exports = router;