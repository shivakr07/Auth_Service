const UserService = require('../services/user-service');
const {response} = require('express');
const userService = new UserService();

const create = async (req, res) => {
    try{
        const response = await userService.create({
            email : req.body.email,
            password : req.body.password
        });
        return res.status(201).json({
            success : true,
            message : 'Successfully created a new User',
            data : response,
            err : {}
        })
    } catch(error) { 
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data : {},
            success : false,
            err : error
        });
    }
}

const signIn = async(req, res) =>{
    try{
        const response = await userService.signIn(req.body.email,req.body.password);
        return res.status(200).json({
            success : true,
            data : response,
            err : {},
            message : 'Successfully signedin'
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            message : 'Something went wrong in the controller',
            data : {},
            success : false,
            err : error
        });
    }
}

const isAuthenticated = async(req,res) => {
    try{
        const token = req.headers['x-access-token'];
        // const isVerified = userService.verifyToken(token);
         // {email : '', id : '', iat : '', exp : ''}
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success : true,
            err : {},
            data : response,
            message : 'user is authenticated and token is valid'
        });
        

    } catch(error){
        console.log(error);
        return res.status(500).json({
            message : 'Something went wrong ',
            data : {},
            success : false,
            err : error
        });
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated
}