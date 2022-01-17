const getCategoryService = require("../services/category")

exports.getAllCategory = async (req,res) => {
    const data = await getCategoryService.getCategory();
    res.send({
        status : true,
        data: data.categories
    })
}

exports.getSingleCategory = async (req,res) => {
    try {
        const response = await getCategoryService.getSingleCategory(req.params.id);
        res.send({
            status : true,
            data: response
        })
        
    } catch{
        res.send({
            status : false,
            data: 'id mevcut değil'
        })
    }
}