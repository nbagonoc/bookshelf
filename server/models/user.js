const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    name:{
        type:String,
        Maxlenght:100
    },
    lastname:{
        type:String,
        Maxlenght:100     
    },
    role:{
        type:Number,
        default:0
    },
    token:{
        type:String
    }
});

// hash password
userSchema.pre('save',function(next){
    const user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I,(err,salt)=>{
            if(err) return next(err)
            bcrypt.hash(user.password,salt,(err,hash)=>{
                if(err) return next(err)
                user.password = hash;
                next()
            })
        })
    }else{
        next()
    }
})

// compare typed password to hashed password
userSchema.methods.comparePassword = function(candidatePassword,cb){
    bcrypt.compare(candidatePassword,this.password,(err,isMatch)=>{
        if(err) return cb(err)
        cb(null,isMatch)
    })
}

// generate token
userSchema.methods.generateToken = function(cb){
    const user = this;
    const token = jwt.sign(user._id.toHexString(),config.SECRET);

    user.token = token;
    user.save((err,user)=>{
        if(err) return cb(err);
        cb(null,user)
    })
}

// check token if exist open logout
userSchema.statics.findByToken = function(token,cb){
    const user = this;
    jwt.verify(token,config.SECRET,(err,decode) =>{
        user.findOne({"_id":decode,"token":token},(err,user)=>{
            if(err) return cb(err)
            cb(null,user)
        })
    })
}

// delete token upon logout
userSchema.methods.deleteToken = function(token,cb){
    const user = this;

    user.update({$unset:{token:1}},(err,user)=>{
        if(err) return cb(err)
        cb(null,user)
    })
}

const User = mongoose.model('User',userSchema)

module.exports = { User }