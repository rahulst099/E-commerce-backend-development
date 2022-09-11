const Category = require("../models/category");

function listCategories(req, res){
    Category.listCategories(function(err, result){
        if(err){
            console.log(err);
            return res.status(500).send({
                message: "Error in fetching categories",
                success: false 
            })
        }
        return res.status(200).send({
            message: "Successfully fetched the categories",
            success: true,
            categories: result 
        })
    })
}

module.exports = {listCategories};