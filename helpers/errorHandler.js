function errorHandler  (err, req, res, next){
    if (err.name === 'UnauthorizedError') {
       return res.status(401).send('invalid token...');
    }

    return res.status(500).json({message: err.message})
  };

module.exports = errorHandler