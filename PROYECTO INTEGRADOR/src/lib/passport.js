const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const orm = require('../configuracionBaseDatos/orm')
const helpers = require("./helpers");

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const rows = await orm.usuario.findOne({ where: { username: username } });
      if (rows) {
        const user = rows;
        const validPassword = await helpers.matchPassword(
          password,
          user.password
        );
        if (validPassword) {
          done(null, user, req.flash("message", "Bienvenid@" + " " + user.nombre_usuario));
        } else {
          done(null, false, req.flash("message", "Datos incorrectos"));
        }
      } else {
        return done(
          null,
          false,
          req.flash("message", "El nombre de usuario no existe.")
        );
      }
    }
  )
);

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const usuarios = await orm.usuario.findOne({ where: { username: username } });
      if (usuarios === null) {
        const {nombre_usuario} = req.body
        let nuevoUsuario = {
          nombre_usuario,
          username,
          password
        };
        nuevoUsuario.password = await helpers.encryptPassword(password);
        const resultado = await orm.usuario.create(nuevoUsuario);
        nuevoUsuario.id = resultado.insertId;
        return done(null, nuevoUsuario);
      } else {
        if (usuarios) {
          const usuario = usuarios
          if (username == usuario.username) {
            done(null, false, req.flash("message", "El nombre de usuario ya existe."))
          } else {
            const {nombre_usuario} = req.body
            let nuevoUsuario = {
              nombre_usuario,
              username,
              password
            };
            nuevoUsuario.password = await helpers.encryptPassword(password);
            const resultado = await orm.usuario.create(nuevoUsuario);
            nuevoUsuario.id = resultado.insertId;
            return done(null, nuevoUsuario);
          }
        }
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});