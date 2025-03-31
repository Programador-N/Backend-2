const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user.model');

// Mock database
const users = [
  new User('Admin', 'User', 'admin@example.com', 30, 'admin123', [], 'ADMIN'),
  new User('Regular', 'User', 'user@example.com', 25, 'user123', [], 'USER')
];

// Estrategia Local
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    const user = users.find(u => u.email === email);
    if (!user) return done(null, false, { message: 'Usuario no encontrado' });

    const isPasswordValid = User.comparePassword(password, user.password);
    if (!isPasswordValid) return done(null, false, { message: 'Contraseña incorrecta' });

    return done(null, user);
  })
);

// Estrategia JWT
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'default_secret'
    },
    (payload, done) => {
      const user = users.find(u => u.email === payload.email);
      if (!user) return done(null, false);
      return done(null, user);
    }
  )
);

// Serialización y deserialización
passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  const user = users.find(u => u.email === email);
  done(null, user);
});

module.exports = passport;