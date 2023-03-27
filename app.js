// import express from 'express';
// import dotenv from 'dotenv';
// import path from 'path';
// import {fileURLToPath} from 'url';
// import userRoutes from './routes/userRoutes'
// import { registerUser, loginUser, getMe } from './controllers/userController';

// dotenv.config();

// const app = express();
// const PORT = 3000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// // Set templating engine
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');


// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use('/users', userRoutes);


// // Get Homepage -- Index.ejs
// app.get('/', async (req, res) => {
//     try {
//         return res.render('index', { title: 'Home' });
//     } catch (error) {
//         console.log(error);
//     }
//     });




// app.listen(PORT, () => console.log(`Client running on port: ${PORT}`));