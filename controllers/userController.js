import User from '../models/userModel.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


//post
const createUser = async (req,res)=>{

    try{
        const user = await User.create(req.body)
        res.status(201).json({
            succesed:true,
            user
        })
    }catch(error){
        res.status(500).json({
            succesed:false,
            error,
        })
    }
}

//post
const loginUser = async (req,res)=>{

    try{

        //formdan gelen kısım
        const {username,password} = req.body

        //veritabanından alınan
        const user = await User.findOne({username})

        //durum kontrolü
        let same = false

        if(user){
           same =  await bcrypt.compare(password, user.password)
        }
        else{
            return res.status(401).json({
                succesed:false,
                error: "There is no such user"
            })
        }
        if(same){
            res.status(200).json({
                 user,
                 token: createToken(user._id)
            })
        }
        else{
            return res.status(401).json({
                succesed:false,
                error: "Password isn't matched"
            })
        }
    }catch(error){
        res.status(500).json({
            succesed:false,
            error,
        })
    }
}

//authorization
const createToken = (userId) =>{
     return jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: '1d'
     })
}


export {createUser,loginUser}