
const getBrandService = require("../services/brand")
const jwt_decode=require('jwt-decode') 


exports.getAllBrands = async (req,res) => {
    let tokenArray =req.headers.authorization.split(' ')
    let token=tokenArray[1]
    let decodeHeader=jwt_decode(token,{payload:true})
    const data = await getBrandService.fetchBrand();        // Bütün Brand'lerin çekilmesi
    res.send({
        status : true,
        user: decodeHeader,
        data: data.brands
    })
}

exports.getBrandByName = async (req, res) => {
    let tokenArray =req.headers.authorization.split(' ')
    let token=tokenArray[1]
    let decodeHeader=jwt_decode(token,{payload:true})
    
    const data = await getBrandService.fetchBrandByName(req.params.name)   // isim params'ı ile Brand çekilmesi
    res.send({
        status: true,
        user: decodeHeader,
        data: data
    })
}