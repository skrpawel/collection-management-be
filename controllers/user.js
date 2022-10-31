import { db } from '../database.js'

export const getUsers = (req, res) => {
    const q = "SELECT * FROM users";

    db.query(q, (err, data) => {
        if (err) return res.send(err);

        return res.status(200).json(data);
    })
}

export const blockUser = (req, res) => {
    const q = 'UPDATE users SET `status` = ? WHERE `id` = ?'

    db.query(q, ['block', req.body.id], (err, data) => {
        if (err) return res.send(err);

        return res.status(200).json(data);
    })
}

export const unblockUser = (req, res) => {
    const q = 'UPDATE users SET `status` = ? WHERE `id` = ?'

    db.query(q, ['unblock', req.body.id], (err, data) => {
        if (err) return res.send(err);

        return res.status(200).json(data);
    })
}

export const deleteUser = (req, res) => {
    const q = 'DELETE FROM users WHERE `id`=?';

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.send(err);

        return res.status(200).json(data);
    })
}