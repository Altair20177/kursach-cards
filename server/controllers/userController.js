const ApiError = require("../error/ApiError");
const { User, UserLogin } = require("../models/models");
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

    const token = generateJwt(id, userData.email, userData.role);
    return res.json({ token });
  }

  async check(req, res, next) {
    console.log(req.user);
    console.log("id", req.user.id);
    console.log("email", req.user.email);
    console.log("role", req.user.userRole);
    const token = generateJwt(req.user.id, req.user.email, req.user.userRole);
    return res.json({ token });
  }
}

module.exports = new UserController();
