const mongoose = require('mongoose');

// Define the Person schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,'title is required']
    },
    description: {
        type: String,
        required: [true,'description is required']
    },

    author:{
        type: String,
        required: [true,'description is required']
    },

    image: {
        type: String,
    },

    user: {
        type:mongoose.Types.ObjectId,
        ref:'User',
        required: [true,'userID is required']
    }
},{timestamps:true});




const blogModel = mongoose.model('Blog', blogSchema);
module.exports = blogModel;