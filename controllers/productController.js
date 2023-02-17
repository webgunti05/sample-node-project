import productModel from "../models/productModel.js";

//get all products
export const getAllProducts = async(req, res) => {
    try{
        const findProducts = await productModel.find();
        if(findProducts){
            res.status(200).json({message: "Product Fetched Successfully", results:findProducts});
        } else{
            res.status(400).json({message: "Failed to fetch products"})
        }

    } catch(err){
        res.status(500).json({message: "Something went wrong"})
    }
}

//create a new product

export const createProduct = async(req, res) => {

    const { title, description, price, category, productImage} = req.body;
    try{
        const checkIsProductExist = await productModel.findOne({title:title});
        if(title === "" || description === "" || price === "" || category === "" || productImage === ""){
            res.status(400).json({message: "Please fill the mandatory fields"});

        } else {
            if(!checkIsProductExist){
                const productData = new productModel({
                    title:title,
                    description:description,
                    price:price,
                    category:category,
                    productImage:productImage
                });

                const saveProduct = await productData.save();
                res.status(200).json({message: "Product created successfully", results: saveProduct});
            }  else{
                res.status(400).json({message: "Product is already existed"});
            }
        }

    } catch(err){
        res.status(500).json({message:"Something went wrong"});
    }

}


//get product by id
export const getProductById = async(req, res) => {
    try{
        const getProduct = await productModel.findById({_id:req.params.id});
        if(getProduct){
            res.status(200).json({message:"Product details fetched successfully", results:getProduct});
        } else{
            res.status(400).json({message: "Unable to find the product"});
        }

    } catch(err){
        res.status(500).json({message: "Something went wrong"});
    }
}