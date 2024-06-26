import express from 'express';
import { connecttodb } from './src/models/db.connect';
import userRouter from './src/routes/user';
// import userRouter2 from './src/routes/user';
import authRouter from './src/routes/signin';
import { errorHandler } from './src/middlewares/error-middlewares';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE' , 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port =  8080;
connecttodb();
// app.get('/data', (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     res.status(200).send(
//         "hello world 2"
//     )
// });
app.use('/user', userRouter)
// app.use('/user', userRouter2)
app.use('/login', authRouter);
// app.use(logRequestDetails);

app.use(errorHandler);
//app.use(notFoundHandler);


app.listen(port, () => {
    return console.log(`Server is listening to PORT:${port}`);
});
