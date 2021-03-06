# a101-bootcamp-odev2-mehmeetyuksel-berkegoze

Bu projede npm paketlerinden express modülü ile server oluşturularak aşağıdaki taskler yapılmıştır.
- JWT entegrasyonu
-  JWT sign etmeden önce “joi” ile validasyon
-  Trendyol markalar GET endpointi ve bu endpointe id ya da name ile query params eklemek
- Trendyol kategoriler GET endpointi
- Trendyol single kategori GET endpoint
-  Error Handler entegrasyonu 

İlk öncellikle get methodu ile  **localhost:3000/api/category** ya da **localhost:3000/api/brand** adreslerine gidip kategori ya da marka bilgilerini çekebilmemiz için post methodu ile **localhost:3000/api/login** adresine gidip username ve passwd bilgileri ile request atmamız lazım. Bu işlem bize kimlik kontrolünü gerçekleştirmemizi sağlar. Girdiğimiz username ve passwd bilgileri database kısmında mevcut ise o zaman bize özel token verecektir. Daha sonra tokenı geri göndererek o token ile yukarıdaki adreslere gidebilmemize izin vermiş olacağız. Ayrıca yukarıdaki adreslere bir request attığımız zaman da biz request atanın kim olduğunu da görebilmiş olacağız. **index.js** dosyanın içindeki aşağıdaki kod kısımlarını incelersek;

```
const errorHandler = require("./helpers/errorHandler")
const jwt = require("./helpers/jwt");

app.use(jwt());
app.use(errorHandler);
```
 **app.use(jwt())**
aslında bize **localhost:3000/api/category** ya da **localhost:3000/api/brand** adreslerine gitmemizi engelliyor diye düşünebiliriz. 

**app.use(errorHandler)** ise eğer hata oluşursa onu return etmek için kullanıdğımız fonksiyon.

**helpers** klasörünün altında **errorHandler.js**  dosyasına bakacak olursak;

```
function errorHandler  (err, req, res, next){
    if (err.name === 'UnauthorizedError') {
       return res.status(401).send('invalid token...');
    }

    return res.status(500).json({message: err.message})
  };

module.exports = errorHandler
```
**helpers** klasörünün altında **jwt.js**  dosyasına bakacak olursak;
```
const expressJwt = require("express-jwt");
const secret = "mySecretKey";

function jwt() {
    return expressJwt({secret, algorithms: ['HS256']}).unless({
        path: [
            '/api/login'
        ]
    })
};

module.exports = jwt;
```
Burada **'/api/login'** server ilk kez çalıştırıldığında sadece **localhost:3000/api/login** adresine gitmemize izin verir. Bunun sebebi de brand ya da category çekebilmek için login olup kendimizi tanıtmamız lazım. Eğer kendimizi tanıtmadan brand ya da category gidecek olursak hata olarak bize **invalid token...** return edecektir. 

Login işlemi için çalışacak olan  loginUser fonksiyonu incelenirse;

```
const jwt = require("jsonwebtoken");
const Joi = require("joi");

exports.loginUser = async (req,res) => {
    const schema = Joi.object({
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
            const value = await schema.validateAsync({ username: req.body.username, passwd: req.body.passwd });
            if(value.username === "admin" & value.passwd === "123456") {
                const secret = "mySecretKey";
                const user = {
                    username : "Mehmet",
                    surname : "Yüksel",
                    email : "mh.mehmetyuksel@gmail.com",
                    role: "admin"
                }
                const token = jwt.sign(user, secret, {expiresIn : "7d"});
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
```
Burada hali hazırda bir database yok. O yüzden denetim yapmak için **username => admin** olan ve 
**passwd => 123456** olan bir kullanıcı oluşturduk diye düşünebiliriz. İlk olarak joi ile passwd kontrolü yapıyoruz. Burada passwd minumum 3 karakter maksimum 30 karakter olarak belirledik. 3 karakterden az bir passwd girildiğinde **"passwd" length must be at least 3 characters long** return almış oluruz. Ayrıca username ya da passwd değerleri girilmediği zaman **"username" is required** ya da **"passwd" is required** şeklinde return almış oluruz. Buna ek olarak username ya da passwd yanlış girilirse; 
```
{
    "status": false,
    "message": "Username or Password is wrong"
}
```
şeklide return alıyoruz. Peki, username ve passwd bilgilerini doğru girdiğimiz zaman ne oluyor? 
Bize encoded edilmiş kullanıcı bilgilerini içeren bir token döndürüyor. Bu tokenı postman üzerinden **localhost:3000/api/category** ve **localhost:3000/api/brand** adreslerinin **Authorization** kısmına eklersek, artık bu adresler erişim iznimiz olacaktır ve projede get methodu ile request attığımız için bize markaları ve kategorilere getirecektir. 

Marka ve kategori getirme kısmının kodları ise **services** klasörünün içinde yer almaktadır.
Örnek olarak getCatagory fonksiyonu incelenirse;
```
const axios = require("axios");

exports.getCategory = async () => {
    const response =await axios.get('https://api.trendyol.com/sapigw/product-categories');
    
    return response.data;
}
```
async anahtar kelimesi ile datalar gelene kadar response bekletiyoruz.

Son olarak request atan kullanıcının bilgilerini göreceğimiz kod bloğu ise ;

```
const jwt_decode=require('jwt-decode') 
// tüm kategori çekmek için kullanılan fonksiyon
exports.getAllCategory = async (req,res) => {
    let tokenArray =req.headers.authorization.split(' ')
    let token=tokenArray[1]
    let decodeHeader=jwt_decode(token,{payload:true})
    const data = await getCategoryService.getCategory();
    res.send({
        status : true,
        message:decodeHeader,
        data: data.categories,
        
    })
}
```
**decodeHeader** değişkeni decode olmuş token bilgisini içerir. **message:decodeHeader** ile de request geldiği zaman requesti kimin attığını görmüş oluyoruz.
