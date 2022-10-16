const mongoose = require("mongoose");
const bcrypt= require("bcrypt");

const user = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
},{
    timestamps:true
})

user.pre('save', async function (next) {
    let user = this;

    if (!user.isModified('password')) return next();

    const hash = await bcrypt.hashSync(user?.password, 8);

    user.password = hash;
    return next();
});

module.exports = mongoose.model('User',user);