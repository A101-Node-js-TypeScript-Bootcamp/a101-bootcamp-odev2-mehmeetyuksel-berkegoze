const getCategoryService = require("../services/category")
 
// tüm kategori çekmek için kullanılan fonksiyon
exports.getAllCategory = async (req,res) => {
    
    const data = await getCategoryService.getCategory();
    res.send({
        status : true,
        data: data.categories,
        
    })
}
// id göre kategori çekmek için kullanılan fonksiyon
exports.getSingleCategory = async (req,res) => {
   
    try {
        const response = await getCategoryService.getSingleCategory(req.params.id);
        res.send({
            status : true,
            data: response,
            
        })
        
    } catch{
        res.send({
            status : false,
            data: 'id mevcut değil'
        })
    }
}