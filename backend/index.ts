import express from 'express';
import { connecttodb } from './src/models/db.connect';
import userRouter from './src/routes/user';
import userRouter2 from './src/routes/user';
import userRouter3 from './src/routes/user';
import userRouter4 from './src/routes/user';
import userRouter5 from './src/routes/user';
import userRouter6 from './src/routes/user';
import userRouter7 from './src/routes/user';

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//const user= require("./data.json");
const port = 8080;
connecttodb();
// app.get('/data', (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     res.status(200).send(
//         "hello world 2"
//     )
// });
app.use('/user/student', userRouter)
app.use('/user/student', userRouter2)
app.use('/user/student', userRouter3)
app.use('/user', userRouter4)
app.use('/user', userRouter5)
app.use('/user', userRouter6)
app.use('/user/student', userRouter7)

app.listen(port, () => {
    return console.log(`Server is listening to PORT:${port}`);
});
