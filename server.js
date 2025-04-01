const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Antony@1010',
    database: 'user_auth'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/');
}

app.get('/', (req, res) => {
    res.render('index', { message: req.flash('message'), error: req.flash('error') });
});

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
        if (err) {
            req.flash('error', 'Username or email already exists');
            return res.redirect('/');
        }
        req.flash('message', 'Registration successful!');
        res.redirect('/');
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err || results.length === 0) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/');
        }

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/');
        }

        req.session.userId = user.id;
        req.session.username = user.username;
        res.redirect('/landing');
    });
});

app.get('/landing', isAuthenticated, (req, res) => {
    res.render('landing', { username: req.session.username });
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/landing');
        }
        res.redirect('/');
    });
});

app.get('/login', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/landing');
    }
    res.render('index', { message: req.flash('message'), error: req.flash('error') });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
