import { db } from '../database.js'
import jwt from 'jsonwebtoken';


export const getOwnPosts = (req, res) => {
    const q = "SELECT C1.idcollections, C1.name, C1.description, C1.topic, C1.img, U1.name as 'author' FROM collections AS C1 INNER JOIN users as U1 ON C1.uid = U1.id WHERE uid=? "


    db.query(q, [req.body.id], (err, data) => {

        if (err) return res.json(err);

        return res.status(200).json(data);
    });
}

export const getPosts = (req, res) => {
    const q = "SELECT C1.idcollections, C1.name, C1.description, C1.topic, C1.img, U1.name as 'author' FROM collections AS C1 INNER JOIN users as U1 ON C1.uid = U1.id"

    db.query(q, (err, data) => {
        if (err) return res.send(err);

        return res.status(200).json(data);
    })
}

export const getPost = (req, res) => {
    const q = "SELECT C1.idcollections, C1.name, C1.description, C1.topic, C1.img, U1.name as 'author' FROM collections AS C1 INNER JOIN users as U1 ON C1.uid = U1.id WHERE C1.idcollections = 1";
    db.query(q, (err, data) => {
        if (err) return res.send(err);

        return res.status(200).json(data);
    })
}

export const addPost = (req, res) => {
    const q = 'INSERT INTO `collections` (`name`, `description`, `topic`, `img`, `uid`) VALUES (?)'

    const data = [
        req.body.name,
        req.body.description,
        req.body.topic,
        req.body.img,
        req.body.userID
    ]

    db.query(q, [data], (err, data) => {
        if (err) return res.send(err);

        return res.status(200).json('User succesfuly created');
    })

}

export const updatePost = (req, res) => {
    const q = 'UPDATE collections SET `name`=?,`description`=?,`topic`=?,`img`=? WHERE `idcollections`=? AND `uid`=?'

    const data = [
        req.body.name,
        req.body.description,
        req.body.topic,
        req.body.img,
        req.body.postID,
        req.body.userID,
    ]

    db.query(q, data, (err, data) => {
        if (err) return res.send(err);

        return res.status(200).json('User succesfuly created');
    })
}

export const deletePost = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json('Non authenticated');

    jwt.verify(token, 'jwtkey', (err, userInfo) => {

        if (err) return res.status(403).json('Token invalid');

        const postID = req.params.id;
        const q = 'DELETE FROM collections WHERE `idcollections` = ? AND `uid` = ?'

        db.query(q, [postID, userInfo.id], (err, data) => {

            if (err || data.affectedRows === 0) return res.status(403).json(`Can't delete someones post`);

            return res.json('Post has been deleted');
        })
    })
}