const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userRole: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  surname: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
});

const Favourite = sequelize.define("favourite", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  //cardId: { type: DataTypes.INTEGER },
  //userId: { type: DataTypes.INTEGER },
  timeNotification: { type: DataTypes.DATE },
});

const UserLogin = sequelize.define("user_login", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  //userId: { type: DataTypes.INTEGER },
  login: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
});

const RequestToAdmin = sequelize.define("request_to_admin", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  //userId: { type: DataTypes.INTEGER },
  organizationName: { type: DataTypes.STRING },
  //categoryId: { type: DataTypes.INTEGER },
  address: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
});

const Card = sequelize.define("card", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  //organizationId: { type: DataTypes.INTEGER },
  categoryId: { type: DataTypes.INTEGER },
  cardName: { type: DataTypes.STRING },
  dateTimeStart: { type: DataTypes.DATE },
  dateTimeFinish: { type: DataTypes.DATE },
  photo1: { type: DataTypes.STRING },
  photo2: { type: DataTypes.STRING },
  photo3: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  eventAddress: { type: DataTypes.STRING },
  webSite: { type: DataTypes.STRING },
  toAccept: { type: DataTypes.BOOLEAN },
});

const Organization = sequelize.define("organization", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  //categoryId: { type: DataTypes.INTEGER },
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  photo1: { type: DataTypes.STRING },
  photo2: { type: DataTypes.STRING },
  photo3: { type: DataTypes.STRING },
  photo4: { type: DataTypes.STRING },
  photo5: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  organizationAddress: { type: DataTypes.STRING },
  webSite: { type: DataTypes.STRING },
  workTime: { type: DataTypes.STRING },
  workTimeEnd: { type: DataTypes.STRING },
});

const Category = sequelize.define("category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  categoryName: { type: DataTypes.STRING },
});

const News = sequelize.define("new", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING },
});

User.hasOne(UserLogin);
UserLogin.belongsTo(User);

User.hasOne(RequestToAdmin);
RequestToAdmin.belongsTo(User);

User.hasMany(Favourite);
Favourite.belongsTo(User);

Card.hasMany(Favourite);
Favourite.belongsTo(Card);

Category.hasMany(Card);
Card.belongsTo(Category);

Organization.hasMany(Card);
Card.belongsTo(Organization);

Category.hasMany(Organization);
Organization.belongsTo(Category);

User.hasOne(Organization);
Organization.belongsTo(User);

Category.hasMany(RequestToAdmin);
RequestToAdmin.belongsTo(Category);

User.hasOne(RequestToAdmin);
RequestToAdmin.belongsTo(User);

module.exports = {
  User,
  Favourite,
  UserLogin,
  RequestToAdmin,
  Card,
  Organization,
  Category,
  News,
};
