import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    vehicle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vehicle",
        required:true
    },

    quantity:{
        type:Number,
        default:1
    },

    totalPrice:{
        type:Number,
        required:true
    },

    paymentMethod:{
        type:String,
        enum:["COD"],
        default:"COD"
    },

    address:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true
    },

    status:{
        type:String,
        enum:[
            "Pending",
            "Confirmed",
            "Shipped",
            "Delivered",
            "Cancelled"
        ],
        default:"Pending"
    }

},
{
    timestamps:true
});

export default mongoose.model("Order",orderSchema);