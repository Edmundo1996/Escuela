import express from 'express';
import morgan from 'morgan';
import routes from './routes/router'; 

const app = express();
const PORT  = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});