const router = require("express").Router();
const { UserModel, LandlordModel, ReviewModel } = require('../models');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session');
// const validateRole = require('../middleware/validate-role');

/*
=================================
        Add Landlord (CREATE)
=================================
- Requires login
*/

//! VERSION 2
router.post('/newLandlord', validateSession, async function (req, res) {
    const { propertyManagement, rating } = req.body.landlord

    try {
        const newLandlord = await LandlordModel.create({
            propertyManagement: propertyManagement,
            rating: rating,
            // userId: req.user.userId
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
                msg: 'You have already reviewed this property!'
            });
        } else {
            res.status(500).json({
                msg: `Server error: ${err}`
            })
        }
    }
});

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


module.exports = router;
