import User from '../models/userModel.js'

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
export {createUser}