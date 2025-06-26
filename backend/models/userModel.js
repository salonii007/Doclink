import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    name: {
        type:String, 
        required:true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password:{
        type:String,
        required: true
    },

    image:{
        type:String,
        default: "https://media.istockphoto.com/id/1478688327/vector/user-symbol-account-symbol-vector.jpg?s=612x612&w=0&k=20&c=N1Wxw0XjkUoXT9_Vaxa4SNIj1IvdJ2L2GQfEVVMTaFM="
    },

    address:{
        type: Object,
        default:{
            line1:"",
            line2:""
        }
    },

    

    gender:{
        type: String, 
        default:"not selected"
    },
    
    dob:{
        type: Date, 
        default:null
    },

    phone:{
        type:String,
        default:"000000000"
    },

    slots_booked:{
        type:Object,
        default:{}
    }

})  //so tht we can use empty object as default value 

const userModel = mongoose.models.user || mongoose.model('user',userSchema)

export default userModel


