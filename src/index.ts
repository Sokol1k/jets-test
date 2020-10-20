import express from 'express';
import db from '../database/index'
const app: express.Application = express();
app.get('/', function (req, res) {
    res.send('Hello World!');
});

db.authenticate()
    .then(() => {
        app.listen(3000, () => {
            console.log('App is listening on port 3000!');
        });        
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })