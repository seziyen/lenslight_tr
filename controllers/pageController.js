//controller:  gelen isteğin döndüreceği yada yapacağı işlem kodlarının yazıldığı kısım
const getIndexPage = (req,res)=>{
    console.log("req user", req.user)
    res.render('index',{
        link: 'index'
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