require('dotenv').config();   
const Express = require('express');
const app = Express();
app.use(Express.json());
const dbConnection = require('./db');
const middleware = require('./middleware');
const controllers = require("./controllers");

app.use(middleware.headers);
// app.use(require("./middleware/validate-session"));
// app.use(require("./middleware/validate-role"));

app.use('/user', controllers.userController);
app.use('/property', controllers.propertyController);
app.use('/review', controllers.reviewController);

dbConnection.authenticate()                       
    .then(() => dbConnection.sync())           
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: is listening on ${process.env.PORT}`);
        });      
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed". Error ${err}`);
    })