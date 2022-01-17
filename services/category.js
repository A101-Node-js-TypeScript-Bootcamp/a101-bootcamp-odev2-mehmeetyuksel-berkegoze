const axios = require("axios");

exports.getCategory = async () => {
    const response =await axios.get('https://api.trendyol.com/sapigw/product-categories');
    
    return response.data;
}
exports.getSingleCategory = async (categoryId) => {
    const response =await axios.get(`https://api.trendyol.com/sapigw/product-categories/${categoryId}/attributes`);
    
    return response.data;
}


//module.exports = fetchBrand