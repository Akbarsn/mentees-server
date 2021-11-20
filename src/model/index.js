const Sequelize = require("sequelize");
const moment = require("moment");
const bcrypt = require("bcrypt");
const log = require("../infra/log/winston");
const envDriver = require("../infra/env/env_driver");
const env = envDriver.GetDBEnv();

const UserModel = require("./User");
const QuestionrModel = require("./Question");
const RoomModel = require("./Room");
const ChatHistoryModel = require("./ChatHistory");
const UserHistoryModel = require("./UserHistory");

const sequelize = new Sequelize(env.Name, env.Username, env.Password, {
  host: env.Host,
  port: env.Port,
  dialect: env.Dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize
  .authenticate()
  .then(() => {
    log.info("[DB] DB Connected");
  })
  .catch((err) => {
    log.error("[DB] Failed to authenticate");
    log.error(`[Error] ${err}`);
  });

const User = UserModel(sequelize, Sequelize);
const Question = QuestionrModel(sequelize, Sequelize);
const Room = RoomModel(sequelize, Sequelize);
const ChatHistory = ChatHistoryModel(sequelize, Sequelize);
const UserHistory = UserHistoryModel(sequelize, Sequelize);
const MentoringRequest = sequelize.define("mentoring_request", {
  mentee_id: {
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  mentor_id: {
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  status: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Question, {foreignKey: "user_id"});
Question.belongsTo(User, {foreignKey: "user_id"});

User.hasMany(UserHistory, {foreignKey: "user_id"});
UserHistory.belongsTo(User, {foreignKey: "user_id"});

UserHistory.hasOne(Room, {foreignKey: "room_id"});
Room.belongsTo(UserHistory, {foreignKey: "room_id"});

ChatHistory.hasOne(Room, {foreignKey: "room_id"});
Room.belongsTo(ChatHistory, {foreignKey: "room_id"});

User.hasMany(ChatHistory, {foreignKey: "user_id"});
ChatHistory.belongsTo(User, {foreignKey: "user_id"});

User.belongsToMany(User, {
  through: MentoringRequest,
  as: "to",
  foreignKey: "mentee_id",
});
User.belongsToMany(User, {
  through: MentoringRequest,
  as: "from",
  foreignKey: "mentor_id",
});

// sequelize.sync({ force: true }).then(() => {
//   log.info("[DB] Migration completed");

//   User.bulkCreate([
//     {
//       username: "akbarsn",
//       email: "personal.akbarsn@gmail.com",
//       first_name: "Akbar",
//       last_name: "Nugraha",
//       password: bcrypt.hashSync("123dev", 12),
//       gender: "Male",
//       birth_date: moment("2000-03-25"),
//       nationality: "Indonesian",
//       current_study: "Bachelor",
//       university: "Universitas Brawijaya",
//       major: "Comp Science",
//       interest: "A|B|C|D",
//       skill: "A|B|C|D",
//       achievement: null,
//       bio: "This is bio",
//       role: "Mentee",
//     },
//     {
//       username: "johndoe",
//       email: "johndoe@gmail.com",
//       first_name: "John",
//       last_name: "Doe",
//       password: bcrypt.hashSync("123dev", 12),
//       gender: "Male",
//       birth_date: moment("2000-03-25"),
//       nationality: "Indonesian",
//       current_study: "Master",
//       university: "Universitas Brawijaya",
//       major: "Comp Science",
//       interest: "C|D",
//       skill: "A|B",
//       achievement: null,
//       bio: "This is bio",
//       role: "Mentor",
//     },
//     {
//       username: "budi",
//       email: "budi@gmail.com",
//       first_name: "Budi",
//       last_name: "-",
//       password: bcrypt.hashSync("123dev", 12),
//       gender: "Male",
//       birth_date: moment("2000-03-25"),
//       nationality: "Indonesian",
//       current_study: "Master",
//       university: "Universitas Brawijaya",
//       major: "Comp Science",
//       interest: "A",
//       skill: "D",
//       achievement: null,
//       bio: "This is bio",
//       role: "Mentor",
//     },
//   ])
//     .then(() => {
//       log.info("[DB] Seeding success");
//     })
//     .catch((err) => {
//       console.log(err)
//       log.error("[DB] Seeding failed");
//     });
// });

module.exports = {
  User,
  ChatHistory,
  Room,
  Question,
  UserHistory,
  MentoringRequest,
};
