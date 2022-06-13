import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Employe } from '@interfaces/employe.interface';

export type EmployeCreationAttributes = Optional<Employe, 'id' | 'email' | 'firstName'>;

export class EmployeModel extends Model<Employe, EmployeCreationAttributes> implements Employe {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public gender: string;
  public mobile: string;
  public address: string;
  public city: string;
  public designation: string;
  public department: string;
  public status: string

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof EmployeModel {
  /* We can define employee model here, to make use of ORM specific query functionalities */
    EmployeModel.init(
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        }
    },
    {
      tableName: 'employe',
      sequelize,
    },
  );

  return EmployeModel;
}
