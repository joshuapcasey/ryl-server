const UserModel = require('./user');
const ReviewModel = require('./review');
const LandlordModel = require('./landlord');
const Review = require('./review');

UserModel.hasMany(ReviewModel, {
    as: 'userReviews',
    // onDelete: 'CASCADE',
    foreignKey: 'reviewerID'
});


ReviewModel.belongsTo(UserModel);


// UserModel.hasMany(LandlordModel, {
//     foreignKey: 'owner'
// });

// LandlordModel.hasMany(ReviewModel, {
//     as: 'landlordReviews',
//     // onDelete: 'CASCADE',
//     foreignKey: 'landlordID'
// });
// ReviewModel.belongsToMany(UserModel);
// LandlordModel.belongsToMany(ReviewModel);

module.exports = { UserModel, LandlordModel, ReviewModel }