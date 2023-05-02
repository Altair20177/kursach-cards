const ApiError = require("../error/ApiError");
const { User, UserLogin, Organization, Category } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = (id, email, userRole) => {
  return jwt.sign({ id, email, userRole }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { login, password, name, surname, email, userRole } = req.body;

    if (!email || !login || !password) {
      return next(
        ApiError.badRequest("Некорректный логин, email или password")
      );
    }
    const candidateEmail = await User.findOne({ where: { email } });
    const candidateLogin = await UserLogin.findOne({ where: { login } });
    if (candidateEmail || candidateLogin) {
      return next(
        ApiError.badRequest(
          "Пользователь с такой почтой или логином уже существует"
        )
      );
    }
    const hashPassword = await bcrypt.hash(password, 4);
    const userData = await User.create({
      userRole,
      name,
      surname,
      email,
    });
    const userLogin = await UserLogin.create({
      login,
      password: hashPassword,
      userId: userData.id,
    });
    const token = generateJwt(userData.id, email, userRole);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const userData = await User.findOne({ where: { email } });

    if (!userData) {
      return next(ApiError.internal("Пользователь не найден!"));
    }

    const id = userData.id;
    const user = await UserLogin.findOne({ where: { id } });

    let comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return next(ApiError.internal("Указан неверный пароль!"));
    }

    const token = generateJwt(id, userData.email, userData.userRole);
    return res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.userRole);
    return res.json({ token });
  }

  async getAdmins(req, res, next) {
    const users = await User.findAll({ where: { userRole: "admin" } });
    return res.json(users);
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await UserLogin.destroy({
        where: {
          userId: id,
        },
      });
      await User.destroy({
        where: {
          id,
        },
      });
      res.json(id);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new UserController();
