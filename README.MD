# Server ![RYL](logo.png)
---
### What is it?
 This is the respoistory for the server-side of RYL. An app to empower tenants by allowing them to review landlords and share their first hand experiences with living at one of their residences.

### How does it work?
It is a server with 3 tables for user information, landlords, & user reviews. The production application is deployed and housed with Heroku.

Check it out here => [RYL App](https://ryl-client.herokuapp.com/)

### Technologies Incorporated
The backbone of the app is postgreSQL and express to translate JavaScript into language the server can read and interact with. It also utilizes the following dependencies: 
- "bcryptjs": "^2.4.3"
- "dotenv": "^10.0.0"
- "express": "^4.17.1"
- "jsonwebtoken": "^8.5.1"
- "pg": "^8.6.0"
- "pg-hstore": "^2.3.4"
- "sequelize": "^6.6.4"

### Database Associations  -->
The server uses two DB associations to aggregate user and app information:

*UserModel.hasMany(ReviewModel)*

*ReviewModel.belongsTo(UserModel)*



### Security 
The app utilizes jsonwebtoken and bcrypt to encrypt, transfer, and store  data. All passwords and sensitive user information are salted and hashed as to be hidden from the server. 