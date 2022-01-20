
const getBrandService = require("../services/brand")


exports.getAllBrands = async (req,res) => {
    
    const data = await getBrandService.fetchBrand();        // Bütün Brand'lerin çekilmesi
    res.send({
        status : true,
        data: data.brands
    })
}

exports.getBrandByName = async (req, res) => {
    
    const data = await getBrandService.fetchBrandByName(req.params.name)   // isim params'ı ile Brand çekilmesi
    res.send({
        status: true,
        data: data
    })
}