const axios = require("axios");
// tüm kategorileri trendyoldan çekmek için kullanılan fonksiyon
exports.getCategory = async () => {
    const response =await axios.get('https://api.trendyol.com/sapigw/product-categories');
    
    return response.data;
}
// id göre kategorileri trendyoldan çekmek için kullanılan fonksiyon
exports.getSingleCategory = async (categoryId) => {
    const response =await axios.get(`https://api.trendyol.com/sapigw/product-categories/${categoryId}/attributes`);
    
    return response.data;
}
