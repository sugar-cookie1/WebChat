const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

class AuthFunctions{
    constructor(){}
    async register(req,res) {
 
        const {username, password} =  req.body;
            username?.trim();
            password?.trim();
            if(!username || !password){
                return res.status(400).json({message:"username or password empty"})
            }
            try{
                const exsistingUser = await User.findOne(({username: username}));
                if(exsistingUser){
                    return res.status(400).json({message: "username already exists"});
                }
        
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
        
                const newUser = new User({
                    username: username,
                    password: hashedPassword,
                });
                await newUser.save();
                const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
                    expiresIn: "1h"
                });
                res.status(201).json({ token: token, username: newUser.username });
        
            } catch(err){
                res.status(500).json({message: `error registering user ${err}`});
            }
        
    }

    async login(req,res){
        const {user, pass} = req.body;
        const username = user?.trim();
        const password = pass?.trim();
        try{
            const user = await User.findOne({username: username});
            
            if(!user){
                return res.status(400).json({ message: "Invalid credentials" });
            }
    
            const isMatch = await bcrypt.compare(password, user.password);
    
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
    
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1h"
            });
    
            res.status(200).json({ token: token, username: user.username });
        }catch(err){
            res.status(500).json({message: "Login error", error:err});
        }   
    }
};

module.exports = AuthFunctions;