const Sequelize = require("sequelize");
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
      rejectUnauthorized: false
    }
  }
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
const MentoringRequest = sequelize.define('mentoring_request', {})

User.hasMany(Question);
Question.belongsTo(User);

User.hasMany(UserHistory);
UserHistory.belongsTo(User);

UserHistory.hasOne(Room);
Room.belongsTo(UserHistory);

ChatHistory.hasOne(Room);
Room.belongsTo(ChatHistory);

User.hasMany(ChatHistory);
ChatHistory.belongsTo(User);

User.belongsToMany(User, {through: MentoringRequest, as: 'to'})
User.belongsToMany(User, {through: MentoringRequest, as: 'from'})

// sequelize.sync({ force: true }).then(() => {
//   log.info("[DB] Migration completed");
// });

module.exports = {
  User,
};
