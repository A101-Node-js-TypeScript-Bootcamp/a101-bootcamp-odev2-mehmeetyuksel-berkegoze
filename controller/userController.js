const jwt = require("jsonwebtoken");
const Joi = require("joi");

exports.loginUser = async (req,res) => {
    
    const schema = Joi.object({         // istenen validasyon kriterleri
        username: Joi.string()
            .min(3)
            .max(30)
            .required(),
        passwd : Joi.string()
        .min(3)
        .max(30)
        .required()  
         })

         try {

            const value = await schema.validateAsync({ username: req.body.username, passwd: req.body.passwd });   // validasyon işlemi

            if(value.username === "admin" & value.passwd === "123456") {
                const secret = "mySecretKey";
                const user = {
                    username : "Mehmet",
                    surname : "Yüksel",
                    email : "mh.mehmetyuksel@gmail.com",
                    role: "admin"
                }
        
                const token = jwt.sign(user, secret, {expiresIn : "7d"});  // Access Token oluşturma işlemi
        
                res.status(200).send({
                    status : true,
                    jwt : {
                        token: token,
                        expiresIn : "7d"
                    },
                    user
                    
                })
            }
        
            else {
                let response = {
                    status: false,
                    message : "Username or Password is wrong"
                }
                res.status(401).send(response)
            }   
        }
        catch (err) { 
            res.status(401).send(err.details[0].message)
        }



    
}