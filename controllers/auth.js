import { db } from '../database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = (req, res) => {
    // CHECK EXSITING USER

    const myQuery = 'SELECT * FROM users WHERE email = ?'

    db.query(myQuery, [req.body.email], (err, data) => {

        if (err) return res.json(err);

        if (data.length) return res.status(409).json('User already exists!');

        //Hash the password

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const registerQuery = 'INSERT INTO users(`name`, `email`, `password`, `type`, `status`) VALUES (?)';

        const values = [
            req.body.username,
            req.body.email,
            hash,
            'standard',
            'unblock'
        ]

        db.query(registerQuery, [values], (err, data) => {

            if (err) return res.json(err);

            return res.status(200).json('User succesfuly created');
        })
    });
}

export const login = (req, res) => {
    const myQuery = 'SELECT * FROM users WHERE email = ?'

    db.query(myQuery, [req.body.email], (err, data) => {

        if (err) return res.json(err);

        if (data.length === 0) return res.status(404).json(`User doesn't  exists!`);


        if (data[0].status === 'block') return res.status(403).json(`You are blocked`);


        //Hash the password
        const isPasswordCorrect = bcrypt.compare(req.body.password, data[0].password).then(res => res);;


        isPasswordCorrect.then(r => {

            if (!r) return res.status(400).json('Wrong email or password');

            const token = jwt.sign({ id: data[0].id }, 'jwtkey');
            const { password, ...other } = data[0]

            res.cookie("access_token", token).status(200).json(other);
        })
    });
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true,
    }).status(200).json('User has been logged out');


};