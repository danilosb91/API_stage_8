const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();

    const checkUserExists = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (checkUserExists) {
      throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?,?,?)",
      [name, email, hashedPassword]
    );
    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    console.log(user)

    if(!user) {
      throw new AppError("Usuário não encontrado!");
    }


    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-email já está em uso.");
    }
    // nullish operator , se o name = vazio, então utiliza o valor de user.name
    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password) {
      throw new AppError("Você precisa informar a senha antiga para definir a nova senha");
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      console.log(checkOldPassword);
      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.");
      }
      user.password = await hash(password, 8);
    }
    console.log("passou aqui 3");
    await database.run(
      `
        UPDATE users SET
        name = ?,
        email = ?,
        password = ?
        WHERE id = ?`,
      [user.name, user.email, user.password, id]
    );
    console.log("passou aqui");

    return response.status(200).json();
  }
}

module.exports = UserController;
