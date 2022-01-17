const axios = require("axios");

const fetchBrandByName = async (name) => {
    const response = await axios.get(`https://api.trendyol.com/sapigw/brands/by-name?name=${name}`);
    return response.data;
}

module.exports = fetchBrandByName