

const express = require('express');
const app = express();
const Port = 8888;


// import body-parser
const bodyParser = require('body-parser');
// let's use it
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*****
    CORS
    Access Controlle CORS Enables  (Cross Domain)
    Allow developpers to access the application from Different Domains
*/

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


/*****
 * MIDDLEWARE
    Gestion des erreurs
*/
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

/**
 * Time tracker
 */
app.use((req, res, next) => {
    console.log('Request URL: ', req.originalUrl, ' Request Method: ', req.method, ' Time:', Date.now())
    next();
});


/****
 * ROUTES
 */

app.get('/', (req, res, next) => {
    res.json({ data: "Heeeeeey dude, welcome !" });
});

const chatRoutes = require('./Routes/Chat-Router')
app.use('/message', chatRoutes);




app.listen(Port, () => console.log(`Chat app listening on port ${Port} !`))