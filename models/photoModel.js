import mongoose, { mongo } from "mongoose";

const {Schema} = mongoose

const photoSchema = new Schema({
    name:{
        type:String,
        require: true,
        trim: true
    },
    description:{
        type:String,
        require: true,
        trim: true
    },
    uploadedAt:{
        type:Date,
        default: Date.now
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    url:{
        type:String,
        required: true
    },
    image_id:{
        type: String
    }
})

//Schema'dan model örneği oluşturma
const Photo = mongoose.model('Photo',photoSchema)

export default Photo