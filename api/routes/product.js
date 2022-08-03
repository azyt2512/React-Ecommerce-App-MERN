const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndSeller,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/seller", verifyToken, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/seller/:id", verifyToken, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/seller/:id", verifyToken, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET ALL PRODUCTS
router.get("/all", async (req, res) => {
  // const qNew = req.query.new;
  const qCategory = req.query.cat;
  try {
    let products;

    // console.log(products);
    // if (qNew) {
    //   products = await Product.find().sort({ createdAt: -1 }).limit(1);
    // } else
     if (qCategory==="all") {
       products = await Product.find({});
      } else {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    }
    res.status(200).json(products);

  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS FOR SELLER
router.get("/seller/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  try {
    let products;
    products = await Product.find({sellerId : id}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
