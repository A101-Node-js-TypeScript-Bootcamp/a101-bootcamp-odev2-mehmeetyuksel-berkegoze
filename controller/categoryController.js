const getCategoryService = require("../services/category")
const jwt_decode=require('jwt-decode') 
 
// tüm kategori çekmek için kullanılan fonksiyon
exports.getAllCategory = async (req,res) => {
    let tokenArray =req.headers.authorization.split(' ')
    let token=tokenArray[1]
    let decodeHeader=jwt_decode(token,{payload:true})
    
    const data = await getCategoryService.getCategory();
    res.send({
        status : true,
        user:decodeHeader,
        data: data.categories,
        
    })
}
// id göre kategori çekmek için kullanılan fonksiyon
exports.getSingleCategory = async (req,res) => {
    let tokenArray =req.headers.authorization.split(' ')
    let token=tokenArray[1]
    let decodeHeader=jwt_decode(token,{payload:true})
   
    try {
        const response = await getCategoryService.getSingleCategory(req.params.id);
        res.send({
            status : true,
            user:decodeHeader,
            data: response,
            
        })
        
    } catch{
        res.send({
            status : false,
            data: 'id mevcut değil'
        })
    }
}