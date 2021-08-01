const router = require("express").Router();
const { UserModel, LandlordModel, ReviewModel } = require('../models');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session');
const validateRole = require('../middleware/validate-role');

router.get("/practice", (req, res) => {
    res.send("Hey!! This is a practice route!")
});

/*
============================
        Register User
============================
*/

router.post('/register', async(req, res)=>{
    let { firstName, lastName, email, password } = req.body.user;
    try {
        const User = await UserModel.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 13),
            admin: false
        });

        let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})

        res.status(201).json({
            msg: 'User successfully registered!',
            user: User,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError){
            res.status(409).json({
                msg: 'Email already registered! Login instead?'
            });
        } else {
            res.status(500).json({
                msg: `Registration failed due to ${err}`
            })
        }
    }
});

/*
============================
        Register User
============================
*/

router.post('/register/admin', async(req, res)=>{
    let { firstName, lastName, email, password } = req.body.user;
    try {
        const User = await UserModel.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 13),
            admin: true
        });

        let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})

        res.status(201).json({
            msg: 'User successfully registered!',
            user: User,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError){
            res.status(409).json({
                msg: 'Email already registered! Login instead?'
            });
        } else {
            res.status(500).json({
                msg: `Registration failed due to ${err}`
            })
        }
    }
});

/*
============================
        Login User
============================
*/

router.post("/login", async (req, res) => {
    const { email, password} = req.body.user;

    try {
        const loginUser = await UserModel.findOne({
            where: {
                email: email,
            },
    });

    if (loginUser) {

        const passwordComparison = await bcrypt.compare(password, loginUser.password);

        if (passwordComparison) {
            
            const token = jwt.sign(
                {id: loginUser.id},
                process.env.JWT_SECRET,
                { expiresIn: 60 * 60 * 24 }
                );
    
            res.status(200).json({
                user: loginUser,
                message: "User successfully logged in!",
                sessionToken: token
            });
        } else {
            res.status(401).json({
                message: 'Incorrect email or password'
            });
        }
        } else {
            res.status(401).json({
                message: "Incorrect email or password"
            });
        }
        } catch (error) {
        res.status(500).json({
            message:"Failed to log user in"
        })
    }
});

/*
============================
    * User Profile Get by ID
============================
*/

router.get('/profile/:id', async(req, res)=>{
    const { id } = req.params;
    try {
        const thisUser = await UserModel.findOne({
            where: { id: id},
           
        });
        if(thisUser !== null ){
            res.status(200).json({thisUser})
        } else {
            res.status(404).json({ message: 'No such user exists.'})
        }
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

module.exports = router;

/*
===============================
    ! ADMIN Delete User
===============================
*/
router.delete('/delete/:id/admin', validateRole, async(req, res)=>{
    const { id } = req.params;
    
    try {
        
        const deletedUser = await UserModel.destroy({
            where: { id: id},
        });

        res.status(200).json({
            msg: `User deleted`,
            deletedUser: deletedUser,
            
        })
    } catch (err) {
        res.status(500).json({
            msg: `Error: ${err}`
        })
    }
})