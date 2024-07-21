const mongoose = require('mongoose');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');


//Get all Blogs
exports.getAllBlogsController = async(req,res) => {
    try{
        const blogs = await blogModel.find({}).populate('user');
        if(!blogs){
            return res.status(401).send({
                messsage: "no blogs found",
                success: false,
            });
        }

        return res.status(200).send({
            blogCount: blogs.length,
            messsage: "got all blogs",
            success: true,
            blogs
        });
    }catch(err){
        console.log(err);
        return res.status(500).send({
            messsage :"Error in getAllBlogs callback",
            success: false,
        });
    }
}

//create blog
exports.createBlogController = async(req,res) => {
    try{
        const { title,description,image,author,user } = req.body;

        //validations
        if(!title || !description || !user){
            return res.status(400).send({
                messsage :"title and desciption are required",
                success: false,
            });
        }
        // console.log(user);
        const existingUser =  await userModel.findById(user);
        // console.log(existingUser);
        if(!existingUser){
            res.status(404).send({
                succes:false,
                messsage:'unable to find user'
            })
        }
        const newBlog = new blogModel({title,description,image,author,user});
        const session = await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({session});
        existingUser.blogs.push(newBlog)
        await existingUser.save({session});
        await session.commitTransaction();
        await newBlog.save();

        return res.status(201).send({
            messsage: "blog registration succesfull",
            success: true,
            newBlog
        });
    }catch(err){
            return res.status(500).send({
            messsage :"Error in creating blog",
            success: false,
            err
        });
    }
}

//update blog
exports.updateBlogController = async(req,res) => {
    try{
        // const { title,description,image } = req.body;
        const {id} = req.params;
        // const blog = await blogModel.findById(id);
        // blog.title=title;
        // blog.description = description;
        // blog.image=image;
        // await blog.save();

        const blog = await blogModel.findByIdAndUpdate(id,{...req.body},{new:true});
        return res.status(200).send({
            succes: true,
            messsage: "Blog Updated!",
            blog
        })
    }catch(err){
            return res.status(500).send({
            messsage :"Error in updating blog",
            success: false,
            err
        });
    }
}

//get specific blog
exports.getBlogByIdController = async(req,res) => {
    try{
        const {id} = req.params;
        const blog = await blogModel.findById(id);
        if(!blog){
            return res.status(404).send({
                messsage :"invalid blog request",
                success: false,
            });
        }
        return res.status(200).send({
            succes: true,
            messsage: "Blog found!",
            blog
        })
    }catch(err){
            return res.status(500).send({
            messsage :"Error in getting user",
            success: false,
            err
        });
    }
}

//delete blog
exports.deleteBlogByIdController = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the blog by ID
      const blog = await blogModel.findById(id).populate('user');
      if (!blog) {
        return res.status(404).send({
          success: false,
          message: 'Blog not found',
        });
      }
  
      // Remove the blog from the user's blogs array
      blog.user.blogs.pull(blog);
  
      // Save the user after removing the blog
      await blog.user.save();
  
      // Delete the blog
      await blogModel.findByIdAndDelete(id);
  
      return res.status(200).send({
        success: true,
        message: 'Blog deleted successfully',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: 'Error in deleting blog',
        success: false,
        err,
      });
    }
  };
  

exports.userBlogController = async (req,res) =>{
    try{
        const userBlog = await userModel.findById(req.params.id).populate("blogs")
        if(!userBlog){
            return res.status(400).send({
                succes:false,
                messsage:'blogs not found with this id'
            })
        }


        return res.status(200).send({
            succes: true,
            messsage: "user blogs",
            userBlog
        })
    }catch(err){
        return res.status(500).send({
        messsage :"Error in getting user blogs",
        success: false,
        err
    });
}
}