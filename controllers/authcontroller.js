// signup
const db = require('../sql/sql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.json({ err: 'please provide username email and password' });
    }
    try {
        const checkquery = 'SELECT * FROM users WHERE email = ?  OR username = ?;';
        const insertuserquery = `INSERT INTO users(username,email,password) VALUES(?,?,?);`;
        const finduserwithidjwt = `SELECT * FROM users where id = ?;`;
        await db.query(checkquery, [email, username], async (err, result) => {
            if (result?.length > 0) {
                return res.json({ err: "user name or email already taken please use a different one", auth: false });
            } else {
                const salt = await bcrypt.genSalt(10)
                const hashpass = await bcrypt.hash(password, salt);
                db.query(insertuserquery, [username, email, hashpass], async (err, result) => {
                    if (err) {
                        return res.json({ err, auth: false });
                    } else {
                        await db.query(finduserwithidjwt, [result.insertId], async (err, user) => {
                            if (err) return res.json({ err });
                            const senduser = {
                                id: user[0].id,
                                username: user[0].username,
                                email: user[0].email,
                                role: user[0].role
                            };
                            const token = jwt.sign(senduser, process.env.TOKEN_SECRET, { expiresIn: '1d' });
                            res.status(201).json({ token, auth: true });
                        })
                    }
                })
            }
        });

    } catch (error) {
        res.json({ err: error.message, auth: false })
    }
}


// signin
exports.signin = async (req, res) => {
    const { username, password } = req.body;
    const checkquery = 'SELECT * FROM users WHERE email = ?  OR username = ?;';
    await db.query(checkquery, [username, username], async (err, result) => {
        if (err) {
            return res.json({ err: 'invalid credentials', auth: false })
        }
        if (result.length > 0) {
            const comp = await bcrypt.compare(password, result[0].password);
            if (comp) {
                const { id, username, email, role } = result[0];
                const user = { id, username, email, role };
                const token = await jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1d' });
                res.status(200).json({ token, auth: true });
            } else {
                res.json({ err: 'invalid credentials', auth: false });
            }
        } else {
            res.json({ err: 'no user found', auth: false });
        }
    })
}


// admin alll users
exports.admin = (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, result) => {
        if (err) {
            return res.json({ err: 'failed to getuser', auth: true });
        }
        if (result.length > 0) {
            return res.json({ result, user: req.user, auth: true })
        }
        else {
            return res.json({ err: "no user exists", user: req.user, auth: true })
        }
    })
}

exports.home = (req, res) => {
    res.json({ user: req.user, auth: true })
}