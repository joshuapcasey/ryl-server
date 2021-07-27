const router = require("express").Router();
const { UserModel, LandlordModel, ReviewModel } = require('../models');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session');

const chalk = require('chalk');
// const validateRole = require('../middleware/validate-role');

/*
===================================
        TEST Route
===================================
*/

router.get('/about', (req, res) => {
    res.send('This is the about route!')
});

/*
===================================
        Add Review {CREATE}
===================================
- Requires login
*/

// ! Version 2
router.post('/newReview/:landlordID', validateSession, async function (req, res) {
    const { propertyAddress, propertyManagement, comment, rent } = req.body.review;

    try {
        const newReview = await ReviewModel.create({
            propertyAddress: propertyAddress,
            propertyManagement: propertyManagement,
            comment: comment,
            rent: rent,
            landlordID: req.params.landlordID,
            reviewerID: req.user.id
        })
        .then(
            newReview => {
                res.status(201).json({
                    newReview: newReview,
                    message: 'landlord created',
                });
            }
        )
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                msg: 'You have already reviewed this property!'
            });
        } else {
            res.status(500).json({
                msg: `Server error: ${err}`
            })
        }
    }
});

/*
===================================
        Edit Review {Update}
===================================
- Requires login
*/
router.put('/:reviewID/:landlordID', validateSession, async function (req, res) {

console.log(chalk.bgRedBright(`THIS IS THE USER: ${req.user.id}`))

    const { propertyAddress, comment, rent } = req.body.review;
    const {reviewID, landlordID } = req.params;
    //const { reviewerID } = req.user.id;
    try {
        const editReview = await ReviewModel.update(
            { landlordID: landlordID,  propertyAddress, comment, rent, reviewerID: req.user.id }, 
            { where: {id: reviewID, reviewerID: req.user.id} }
            ); 
        res.status(200).json({ 
            message: 'Review successfully updated!',
            editReview
    });
        } catch (err) {
            res.status(500).json({
                msg: `Server error: ${err}`
            })
        }
    
});

/*
===================================
        Delete Review {Destroy}
===================================
- Requires login
*/

router.delete('/:reviewID', validateSession, async function (req, res) {
    const { reviewID } = req.params;
    try{
        const deleteReview = await ReviewModel.destroy({
            where: { id: reviewID }
        })
        res.status(200).json({
            message: 'Your review has successfully been deleted',
            deletedReview: deleteReview
        })
    } catch (err) {
        res.status(500).json({
            message: `failed to delete review: ${err}`
        })
    }
})

/*
===========================================
        Get All Review by User ID {Read}
===========================================
- Requires login
*/

router.get('/userreviews/:id', validateSession, async function(req, res){
    try{
        const userReviews = await ReviewModel.findAll({
            where: {reviewerID: req.params.id}
        })

        res.status(200).json({
            message: "Reviews successfully retrieved!",
            userReviews
        })
    } catch (err) {
        res.status(500).json({
            message: `failed to retrieve reviews: ${err}`
        })
    }
});

router.get('/landlordreviews/:id', validateSession, async function(req, res){
    try{
        const foundReviews = await ReviewModel.findAll({
            where: {landlordID: req.params.id}
        })

        res.status(200).json({
            message: "Reviews successfully retrieved!",
            foundReviews
        })
    } catch (err) {
        res.status(500).json({
            message: `failed to retrieve reviews: ${err}`
        })
    }
});


router.get('/all', validateSession, async function(req, res){
    try{
        const allReviews = await ReviewModel.findAll()
        res.status(200).json({
            message: "Reviews successfully retrieved!",
            allReviews
        })
    } catch (err) {
        res.status(500).json({
            message: `failed to retrieve reviews: ${err}`
        })
    }
});
module.exports = router;
