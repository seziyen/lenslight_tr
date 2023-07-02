//controller:  gelen isteğin döndüreceği yada yapacağı işlem kodlarının yazıldığı kısım
import Photo from '../models/photoModel.js'
import User from '../models/userModel.js'
const getIndexPage = async (req,res)=>{

    //son eklenen 3 fotoğrafı listeler
    const photos = await Photo.find().sort({uploadedAt: -1}).limit(3)
    //tüm kayıtların sayısını alır
    const numOfUser = await User.countDocuments({})
    const numOfPhotos = await Photo.countDocuments({})
    res.render('index',{
        link: 'index',
        photos,
        numOfUser,
        numOfPhotos

    })
}

const getAboutPage = (req,res)=>{
    res.render('about',{
    link: "about"
})
}

const getRegisterPage = (req,res)=>{
    res.render('register',{
    link: "register"
    })
}

const getLoginPage = (req,res)=>{
    res.render('login',{
    link: "login"
    })
}

const getLogout = (req,res)=>{
    res.cookie("jwt","",{
        maxAge:1,
    })
    res.redirect('/login')
}

export {getIndexPage, getAboutPage, getRegisterPage, getLoginPage, getLogout}