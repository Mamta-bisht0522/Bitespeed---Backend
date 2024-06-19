import sequelize from "../config/sequelize.config";
import { DataTypes, Model, Sequelize } from 'sequelize';

class Contact extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public phoneNumber!: string;
  public password!: string;
  public linkedId!: number | null;
  public linkPrecedence!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Contact.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    linkedId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    linkPrecedence: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Contact',
    tableName: 'Contacts',
  }
);

// Contact.sync({ force: true });
// `sequelize.define` also returns the model
console.log(Contact === sequelize.models.Contact); // true

export default Contact;
