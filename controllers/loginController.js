const bcrypt = require('bcryptjs');
const User = require('../user');

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Введите email или пароль');
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send('Неверный email или пароль');
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).send('Неверный email или пароль');
    }

    req.session.isAuthenticated = true;
    req.session.user = {
        _id: user._id,
        email: user.email,
    }

    res.redirect('/');
};

module.exports = {
    login
};