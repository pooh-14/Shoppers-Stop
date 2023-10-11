import jwt from "jsonwebtoken";
import ProductModal from "../Modals/Product.modal.js";
import UserModal from "../Modals/User.modal.js";

export const addProduct = async (req, res) => {
  try {
    const { name, price, image, category } = req.body.productData;
    const { token } = req.body;
    if (!name || !price || !image || !category || !token) return res.status(404).json({ success: false, message: "All fields are mandtory.." })
    
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData) {
      return res
        .status(404)
        .json({ success: false, message: "Token not valid." });
    }

    const userId = decodedData.userId;

    const product = new ProductModal({
      name,
      price,
      image,
      category,
      userId: userId,
    });

    await product.save();

    return res.status(201).json({ success: true , message:"Product added successfully!"});
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const allProduct = async (req, res) => {
  try {
    const products = await ProductModal.find({});
    // const products = await ProductModal.find({isBlocked:false,isVerified:"true"});
    if (products.length) {
      return res.status(200).json({ success: true, products: products });
    }
    return res
      .status(404)
      .json({ success: false, message: "No products found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};


export const getYourProducts = async (req, res) => {
    try {
        const { token } = req.body;

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedData) {
            return res.status(404).json({ success: false, message: "Token not valid." })
        }

        const userId = decodedData.userId;

        const yourProducts = await ProductModal.find({ userId: userId })

        if (yourProducts.length) {
            return res.status(200).json({ success: true, products: yourProducts })
        }

        return res.status(404).json({ success: false, message: "No products found." })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const updateYourProduct = async (req, res) => {
    try {
      const { name, image, price, category } = req.body.productData;
      const { productId,token} = req.body;
        if (!token) return res.status(404).json({ success: false, message: "Token is mandtory.." })

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedData) {
            return res.status(404).json({ success: false, message: "Token not valid." })
        }

        const userId = decodedData.userId;

        const updatedProduct = await ProductModal.findOneAndUpdate({ _id: productId, userId: userId }, { name, image, price, category }, { new: true })

        if (updatedProduct) {
            return res.status(200).json({ success: true, product: updatedProduct })
        }
        return res.status(404).json({ success: false, message: "You are trying to update product which is not yours.." })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}



export const deleteYourProduct = async (req, res) => {
  try {
    const { productId, token } = req.body;
    // console.log(productId, token);
    if (!productId || !token)
      return res.status(404).json({
        success: false,
        message: "Product id and token is mandtory..",
      });

      const decodedData = jwt.verify(token, process.env.JWT_SECRET)
      if (!decodedData) {
          return res.status(404).json({ success: false, message: "Token not valid." })
      }
      const userId = decodedData.userId;
    // console.log(decodedData);

    const isDeleted = await ProductModal.findOneAndDelete({
      _id: productId,
    });
    if (isDeleted) {
      const products = await ProductModal.find({});
      if (products) {
        console.log(products);
      }
      return res
        .status(200)
        .json({
          success: true,
          message: "Product Deleted Successfully.",
          products: products,
        });
    }

    throw new Error("Mongodb error");
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};


export const addRating = async(req,res)=>{
  try{
    const {productId,rating}=req.body;

    const updateProductRating = await ProductModal.findByIdAndUpdate(productId,{$push:{ratings:rating}},{new:true})

    if(updateProductRating){
      return res.status(200).json({success:true, message:"Rating added Successfully!", product: updateProductRating})
    }
    throw new Error("Mongodb error")
  }catch (error) {
      return res.status(500).json({ success: false, error: error.message })
  }
}


export const addComments = async(req,res)=>{
  try{
    const {productId,token,comments}=req.body;

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedData) {
            return res.status(404).json({ success: false, message: "Token not valid." })
        }

        const userId = decodedData.userId;

        const user = await UserModal.findById(userId)

    const updateComments = await ProductModal.findByIdAndUpdate(productId,{$push:{comments:{comments:comments,name:user.name}}},{new:true})

    if(updateComments){
      return res.status(200).json({success:true, message:"Comment added Successfully!", product: updateComments})
    }
    throw new Error("Mongodb error")
  }catch (error) {
      return res.status(500).json({ success: false, error: error.message })
  }
}



export const getSingleProductData = async (req, res) => {
  try {
      const { productId } = req.body;
      if (!productId) return res.status(404).json({ success: false, message: "Product id is mandtory.." })

      const product = await ProductModal.findById(productId);
      if (product) {
          return res.status(200).json({ success: true, product })
      }
      return res.status(404).json({ success: false, error: "Products details not found." })

  } catch (error) {
      return res.status(500).json({ success: false, error: error.message })
  }
}



export const addToCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is mandatory." });
    }
    
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is mandatory." });
    }

    // Assuming you have a User model set up correctly
    const user = await UserModal.findByIdAndUpdate(userId, { $push: { cart: productId } });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error while adding product to cart:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
}

export const allCartProducts = async (req, res) => {
  try {
      const { userId } = req.body;
      if (!userId) return res.status(404).json({ success: false, message: "User id is mandtory.." })


      const user = await UserModal.findById(userId)
      if (!user) return res.status(404).json({ success: false, message: "User not found.." })
      var finalData = [];
      var array = user?.cart;
      for (var i = 0; i < array?.length; i++) {
          const productData = await ProductModal.findById(array[i])
          if (productData) {
              finalData.push(productData)
          }
      }
      return res.status(200).json({ success: true, cartProducts: finalData })

  } catch (error) {
      console.log(error, "error")
      return res.status(500).json({ success: false, error: error.message })
  }
}
