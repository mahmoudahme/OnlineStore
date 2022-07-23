const ProductRepo = require("../modules/product/repo");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/api/products/", verifyTokenAndAdmin, ProductRepo.CreateProduct);

//UPDATE
router.put("/api/products/:id", verifyTokenAndAdmin,ProductRepo.UpdateProduct);

//DELETE
router.delete("/api/products/:id", verifyTokenAndAdmin, ProductRepo.DeleteProduct);

//GET PRODUCT
router.get("/api/products/find/:id",ProductRepo.getProduct);

//GET ALL PRODUCTS
router.get("/api/products/", ProductRepo.getAllPRoduct);

module.exports = router;
