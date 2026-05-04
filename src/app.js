import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
import authRoutes from './routes/auth.Routes.js';
import userRoutes from './routes/user.Routes.js';
import adminRoutes from './routes/admin.Routes.js';

app.use(cookieParser())

const allowedOrigins = [
    'https://gupta-sales-frontend.vercel.app',
    'https://gupta-sales-frontend-git-*.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174'
];

if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.some(o => origin.startsWith(o.replace('*', '')))) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.options('*', cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.some(o => origin.startsWith(o.replace('*', '')))) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json({ limit: '15mb' }));

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/admin',adminRoutes)

export default app;