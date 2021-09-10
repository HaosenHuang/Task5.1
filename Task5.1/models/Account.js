const mongoose = require("mongoose")
const validator = require("validator")

const accountSchema = new mongoose.Schema(
    {
        country:{
            type: String, 
            validate(value){
                if(!(value=='Australia' || value=='China')){
                    throw new Error('country is required')
                }
            }
        },
        fname:{
            type: String, 
            required: [true, 'first name is required']
        },
        lname:{
            type: String,
            required: [true, 'last name is required']
        },
        email:{
            type: String,
            trim: true,
            required: [true, 'email is required'],
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('invalid email')
                }
            }
        },
        password:{
            type: String,
            minlength: [8, 'minlength:8'],
            maxlength: [16, 'maxlength:16'],
            required: [true, 'password is required']
        },
        confirm:{
            type: String,
            minlength: [8, 'minlength:8'],
            maxlength: [16, 'maxlength:16'],
            required: [true, 'password is required']
        },
        hashcode:{
            type: String
        },
        address:{
            type: String,
            required: [true, 'address is required']
        },
        city:{
            type: String,
            required: [true, 'city is required']
        },
        state:{
            type: String,
            required: [true, 'state is required']
        },
        ZIP: String,
        phone: String
    }
)

module.exports = mongoose.model("Account", accountSchema)