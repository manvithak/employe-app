import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';
import EmployeModel from '@models/employe.model';
import { logger } from '@utils/logger';

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  timezone: '+00:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();

const DB = {
  Users: UserModel(sequelize),
  Employe: EmployeModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
