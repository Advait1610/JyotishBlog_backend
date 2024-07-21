const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the Person schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'username is required']
    },
    email: {
        type: String,
        required: [true,'email is required'],
        unique: true
    },

    password: {
        type: String,
        required: [true,'password is required']
    },
    blogs:[
        {
            type:mongoose.Types.ObjectId,
            ref:'Blog'
        },
    ],
},{timestamps:true});


userSchema.pre('save', async function(next){
    const person = this;

    // Hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();
    try{
        // hash password generation
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);
        
        // Override the plain password with the hashed one
        person.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    try{
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;