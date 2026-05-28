const express = require("express");
const router = express.Router();

/* =========================
   Middlewares
========================= */
const authMiddleware = require("../middleware/jwtauth");
const uploadProductImage = require("../middleware/multer");
const uploadOfferImage = require("../middleware/multeroffer");
// const adminauth = require("../middleware/adminauth")

/* =========================
   Controllers
========================= */

// Auth Controllers
const { register, logins } = require("../controller/login");

// Dashboard Controller
const { dash } = require("../controller/dash");

// Product Controllers
const { products , filterproduct , catagoryproduct} = require("../controller/product");

// Cart Controllers
const { addtocart, getcart ,deletecartproduct } = require("../controller/cart");

// Checkout Controller
const { checkout ,showcheckout} = require("../controller/checkout");

// Admin Controllers
const { addproduct, deleteproduct,adminverify ,admincheck} = require("../controller/admin");

// Offer Controller
const { offeradd ,getoffer} = require("../controller/offer");

const { logout } = require("../controller/logout");



/* =========================
   Authentication Routes
========================= */
router.post("/sign", register);
router.post("/log", logins);
router.post("/adminverify",adminverify)
router.get("/admincheck",admincheck)
router.get("/logout",logout)


/* =========================
   Dashboard Routes
========================= */
router.get("/dash", authMiddleware, dash);


/* =========================
   Product Routes
========================= */
router.get("/product", products);

router.post(
  "/addproduct",
  uploadProductImage.single("p_img"),
  addproduct
);
router.get("/filter",filterproduct)
router.get("/cat/:id",catagoryproduct)

router.delete("/product/:id", deleteproduct);


/* =========================
   Cart Routes
========================= */
router.post("/addcart", authMiddleware, addtocart);

router.get("/getcart", authMiddleware, getcart);
router.delete("/cartdelete/:productid",authMiddleware,deletecartproduct)


/* =========================
   Checkout Routes
========================= */
router.post("/checkout", authMiddleware, checkout);
router.get("/showbill/:id",showcheckout)


/* =========================
   Offer Routes
========================= */
router.post(
  "/addoffer",
  uploadOfferImage.single("imgs"),
  offeradd
);
router.get("/getoffer",getoffer);


/* =========================
   Export Router
========================= */
module.exports = router;