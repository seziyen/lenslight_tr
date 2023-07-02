import Photo from '../models/photoModel.js'
import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'


//post
const createPhoto = async (req,res)=>{

    const result =  await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename: true,
            folder: 'lenslight_tr'
        }
    )

    console.log("result",result);

    try{
        await Photo.create({
            name:req.body.name,
            description:req.body.description,
            user:res.locals.user._id,
            url:result.secure_url,
            image_id: result.public_id
        })
        //fotoğrafları tmpden kaldırmak

        fs.unlinkSync(req.files.image.tempFilePath)

        res.status(201).redirect("/users/dashboard")


    }catch(error){
        res.status(500).json({
            succesed:false,
            error,
        })
    }
}

//get
const getAllPhotos = async (req,res)=>{
    try {
        const photos = res.locals.user
            ? await Photo.find({user: {$ne: res.locals.user._id}})
            : await Photo.find({})
        res.status(200).render('photos',{
            photos,
            link:"photos"
        })

    } catch (error) {
        res.status(500).json({
            succesed:false,
            error,
        })
    }
}

//get
const getAPhoto = async (req,res)=>{
    try {
        const photo = await Photo.findById({ _id: req.params.id}).populate("user")

        //yetkili kullanıcı silme adımı
        
        let isOwner = false

        if(res.locals.user){
            isOwner = photo.user.equals(res.locals.user_id)
        }

        res.status(200).render('photo',{
        photo,
        link:"photos",
        isOwner
    })

    } catch (error) {
        res.status(500).json({
            succesed:false,
            error,
        })
    }
}


//DELETE
const deletePhoto = async (req,res)=>{
    try {
        const photo = await Photo.findById(req.params.id)

        const photoId = photo.image_id

        await cloudinary.uploader.destroy(photoId)

        await Photo.findOneAndRemove({_id: req.params.id})

        res.status(200).redirect("/users/dashboard")

    } catch (error) {
        res.status(500).json({
            succesed:false,
            error,
        })
    }
}

const updatePhoto = async (req,res)=>{
    try {
        
        const photo =  await Photo.findById(req.params.id)
        
        if(req.files){ 
            //foto silme (güncelleme için)
            const photoId = photo.image_id
            await cloudinary.uploader.destroy(photoId)
            //foto ekle güncelleme için)
            const result =  await cloudinary.uploader.upload(
                req.files.image.tempFilePath,
                {
                    use_filename: true,
                    folder: 'lenslight_tr'
                }
            )
            photo.url = result.secure_url
            photo.image_id = result.public_id

            fs.unlinkSync(req.files.image.tempFilePath)
        }

        //name ve desc güncelleme
        photo.name = req.body.name
        photo.description = req.body.description

        photo.save()

        res.status(200).redirect(`/photos/${req.params.id}`)

    } catch (error) {
        res.status(500).json({
            succesed:false,
            error,
        })
    }
}
export { createPhoto, getAllPhotos, getAPhoto,deletePhoto,updatePhoto}