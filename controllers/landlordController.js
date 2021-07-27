const router = require("express").Router();
const { UserModel, LandlordModel, ReviewModel } = require('../models');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session');
const validateRole = require('../middleware/validate-role');

/*
=================================
    Add Landlord (CREATE)
=================================
- Requires login
*/

//! VERSION 1
// router.post('/newLandlord', validateSession, async function (req, res) {
//     const { propertyManagement, rating } = req.body;
//     const { id } = req.user;
//     const landlordEntry = {
//         propertyManagement,
//         rating,
//         owner: id
//     }
//     try {
//         const newLandlord = await LandlordModel.create(landlordEntry);
//         res.status(200).json(newLandlord);
//     } catch (err) {
//         if (err instanceof UniqueConstraintError) {
//             res.status(409).json({
//                 msg: 'You have already reviewed this property!'
//             });
//         } else {
//             res.status(500).json({
//                 msg: `Server error: ${err}`
//             })
//         }
//     }
// });

//! VERSION 2
router.post('/newLandlord', validateSession, async function (req, res) {
    const { propertyManagement, rating } = req.body.landlord

    try {
        const newLandlord = await LandlordModel.create({
            propertyManagement: propertyManagement,
            rating: rating,
            userId: req.user.id
        })
        .then(
            newLandlord => {
                res.status(201).json({
                    newLandlord: newLandlord,
                    message: 'landlord created',
                });
            }
        )
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                msg: 'This Landlord already exists!'
            });
        } else {
            res.status(500).json({
                msg: `Server error: ${err}`
            })
        }
    }
});

/*
===========================================
    * Get All Landlords {Read}
===========================================
- Requires login
*/
router.get('/all', validateSession, async function(req, res){
    try{
        const allLandlords = await LandlordModel.findAll()
        res.status(200).json({
            message: "Landlords successfully retrieved!",
            allLandlords
        })
    } catch (err) {
        res.status(500).json({
            message: `failed to retrieve landlord: ${err}`
        })
    }
});

/*
===================================
        ! Edit Landlord {Update}
===================================
- Requires login
*/
router.put('/:landlordID', validateSession, async function (req, res) {

    console.log(chalk.bgRedBright(`THIS IS THE landlord: ${req.landlord.id}`))
    
        const { propertyManagement, rating } = req.body.landlord;
        const { landlordID } = req.params;
        const { reviewerID } = req.user.id;
        try {
            const editLandlord = await LandlordModel.update({
                propertyManagement, 
                rating, 
                // userID: req.user.id
            }, 
                // { where: {id: landlordID } }
                // { where: { id: landlordID, reviewerID: req.user.id } }
                { where: { id: landlordID, reviewerID: reviewerID } }

                ); 
            res.status(200).json({ 
                message: 'Landlord successfully updated!',
                editLandlord
        });
            } catch (err) {
                res.status(500).json({
                    msg: `Server error: ${err}`
                })
            }
        
    });

/*
===================================
    * Delete Landlord {Destroy}
===================================
- Requires login
*/

router.delete('/:landlordID', validateSession, async function (req, res) {
    const { landlordID } = req.params;
    try{
        const deleteLandlord = await LandlordModel.destroy({
            where: { id: landlordID }
        })
        res.status(200).json({
            message: 'Your review has successfully been deleted',
            deletedReview: deleteLandlord
        })
    } catch (err) {
        res.status(500).json({
            message: `failed to delete review: ${err}`
        })
    }
})

/*
===================================
    ! Admin Delete Landlord {Destroy}
===================================
- Requires login
*/
router.delete('/:gigId/admin', validateRole, async(req, res)=>{
    const { landlordID } = req.params
    try {
        const deletedLandlord = await LandlordModel.destroy({
            where: { id: landlordID }
        });
        res.status(200).json({
            msg: `You have successfully deleted user review for ${landlordID}`,
            deletedLandlord: deletedLandlord
        })
    } catch (err) {
        res.status(500).json({msg: `Oh no, server error: ${err}`})
    }
})

module.exports = router;

module.exports = router;
