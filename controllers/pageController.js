//controller:  gelen isteğin döndüreceği yada yapacağı işlem kodlarının yazıldığı kısım
const getIndexPage = (req,res)=>{
    res.render('index')
}

const getAboutPage = (req,res)=>{
    res.render('about')
}

export {getIndexPage, getAboutPage}