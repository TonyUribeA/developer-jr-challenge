if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');

//initializacions
const app = express();
require('./database');

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'),
    filename(req, file, cb){
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Routes
app.use('/api/tasks',require('./routes/tasks'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//start the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})