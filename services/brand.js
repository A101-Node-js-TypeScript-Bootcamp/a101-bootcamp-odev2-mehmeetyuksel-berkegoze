const axios = require("axios");

exports.fetchBrand = async () => {
    const response = await axios.get("https://api.trendyol.com/sapigw/brands");  // Trendyol API'ye giden ve markaları getiren GET isteği
    return response.data;
}


exports.fetchBrandByName = async (name) => {
    const response = await axios.get(`https://api.trendyol.com/sapigw/brands/by-name?name=${name}`); // Trendyol API'ye giden ve name ile marka getiren GET isteği
    return response.data;
}