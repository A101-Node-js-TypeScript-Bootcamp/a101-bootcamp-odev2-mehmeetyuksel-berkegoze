const axios = require("axios");

const fetchBrand = async () => {
    const response = await axios.get("https://api.trendyol.com/sapigw/brands");
    return response.data;
}

module.exports = fetchBrand