const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

//get all user
exports.getAllUsers =  async(req,res) => {
        try{
            const users =await userModel.find({});
            return res.status(201).send({
                count: users.length,
                messsage :"registration succesfull",
                success: true,
                users
            });
        }catch(err){
            console.log(err);
            return res.status(500).send({
                messsage :"Error in getting all user",
                success: false,
            });
        }
    };

//register user
exports.registerController = async(req,res) => {
    try{
        const {username,email,password} = req.body;

        //validation
        if(!username || !email || !password){
            return res.status(400).send({
                messsage :"please fill all fields",
                success: false,
            });
        }

        // existing user
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(401).send({
                messsage :"user already exisits",
                success: false,
            });
        }

        //save new user
        const user = new userModel({username,email,password});
        await user.save();
        return res.status(201).send({
            messsage :"registration succesfull",
            success: true,
            user
        });
    }catch(err){
        console.log(err);
        return res.status(500).send({
            messsage :"Error in register callback",
            success: false,
        });
    }
};

exports.loginController = async(req,res) => {
    try{
        const {email,password} = req.body;

        //validation
        if(!email || !password){
            return res.status(400).send({
                messsage :"please fill all fields",
                success: false,
            });
        }

        const user = await userModel.findOne({email});
        if(!user){
            return res.status(401).send({
                messsage :"user does not exist",
                success: false,
            });
        }

        //password validation
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).send({
                messsage :"invalid username or password",
                success: false,
            });
        }

        //user is valid
        return res.status(200).send({
            messsage :"login succesfull",
            success: true,
            user
        });


    }catch(err){
        console.log(err);
        return res.status(500).send({
            messsage :"Error in login callback",
            success: false,
        });
    }
};

// async(req,res) => {
//     try{

//     }catch(err){
//         console.log(err);
//         return res.status(500).send({
//             messsage :"Error in register callback",
//             success: false,
//         });
//     }
// };