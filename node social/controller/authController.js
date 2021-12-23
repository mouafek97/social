const  User = require ('../models/User')
const CryptoJS = require('crypto-js')
const jwt =require("jsonwebtoken")
//register
exports.Register= async (req, res, next) => {
    const newUser = new User ({
        username : req.body.username ,
        email :req.body.email , 
        password :  CryptoJS.AES.encrypt(req.body.password, process.env.crypto_secret).toString() 
    })
    
    const savedUser = await newUser.save() ; 
    res.status(201).json(savedUser) ; 
}
//login 
exports.login = async (req,res,next ) =>{
    try { 
        const user = await User.findOne ({email :req.body.email})
        !user && res.status(401).json( "wrong user name !!! ")
        const decrybte = CryptoJS.AES.decrypt(user.password, process.env.crypto_secret);
         password1 = decrybte.toString(CryptoJS.enc.Utf8)
         password1 !== req.body.password &&
          res.status(401).json( "wrong user password !!! ")
          const Access_token = jwt.sign({ id : user._id , isAdmin : user.isAdmin  } ,
            process.env.jwt_key , 
            {expiresIn :"3d"} 
          )

          user.password =undefined 
          res.status(200).json({user , Access_token}) 


    }catch (err) {
        console.log(err)
        res.status(500).json(err)

    }
}
