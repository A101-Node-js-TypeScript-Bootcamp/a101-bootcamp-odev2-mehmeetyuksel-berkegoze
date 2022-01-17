const fetchBrand = require("../services/fetchAllBrand")
const fetchBrandByName = require("../services/fetchBrandByName")

exports.getAllBrands = async (req,res) => {
    const data = await fetchBrand();
    res.send({
        status : true,
        data: data.brands
    })
}

exports.getBrandByName = async (req, res) => {
    const data = await fetchBrandByName(req.params.name)
    res.send({
        status: true,
        data: data
    })
}