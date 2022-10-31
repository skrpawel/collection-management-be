import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'

import postRoutes from './routes/posts.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'

const app = express();
const port = 5001;
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.use(express.json());
app.use(cookieParser());
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// ERRORS

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

// app.get('/', async (req, res) => {
//     const users = await getUsers();
//     res.send(users);
// })