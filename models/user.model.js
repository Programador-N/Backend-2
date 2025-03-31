const bcrypt = require('bcrypt');

class User {
  constructor(first_name, last_name, email, age, password, cart = [], role = 'USER') {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.age = age;
    this.password = bcrypt.hashSync(password, 10); // Encriptar contraseña
    this.cart = cart;
    this.role = role;
  }

  static comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
}

module.exports = User;