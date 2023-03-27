import express from 'express';
import dotenv from 'dotenv';
import customerRouter from './routes/customerRoutes'
import { errorHandler } from './middleware/errorMiddleware'
import path from 'path';
import {fileURLToPath} from 'url';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes';
import methodOverride from 'method-override';


dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));

// Set templating engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/customers', customerRouter);
app.use('/users', userRoutes);
app.use(errorHandler);

// Get Homepage -- Index.ejs
app.get('/', async (req, res) => {
    try {
        return res.render('index', { title: 'Home', token: '' });
    } catch (error) {
        console.log(error);
    }
});

app.listen(PORT, () => console.log(`API server is running on port ${PORT}... `));

