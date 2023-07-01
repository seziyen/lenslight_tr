import User from '../models/userModel.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


//post
const createUser = async (req,res)=>{

    try{
        const user = await User.create(req.body)
        res.status(201).json({ user: user._id})
    }catch(error){


        let errors2 = {}
        
        if(error.code == 11000){
            errors2.email = "The Email is already registered"
        }

        if(error.name === "ValidationError"){
            Object.keys(error.errors).forEach((key)=>{
                errors2[key] = error.errors[key].message
            })
        }
        console.log("Errors2",errors2);

        res.status(400).json(errors2)
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
            const token = createToken(user._id)
            res.cookie("jwt",token,{
                httpOnly: true,
                maxAge : 24 * 60 * 60 *  1000 
            })
            res.redirect("/users/dashboard")
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


const getDashboardPage = (req,res)=>{
    res.render('dashboard',{
    link: "dashboard"
})
}

export {createUser,loginUser,getDashboardPage}