import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import { generateHash } from '../utils/auth.js';
const validRoles = ['user', 'admin']; // Define the valid roles

export default (sequelize, Sequalize) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Username cannot be null',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Email cannot be null',
        },
        isEmail: {
          msg: 'Invalid email format',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password cannot be null',
        },
      },
    },
    roles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ['user'],
      validate: {
        isValidRoles(value) {
          if (!Array.isArray(value) || value.length === 0) {
            throw new Error('Roles must be an array with at least one role.');
          }

          const invalidRoles = value.filter(role => !validRoles.includes(role));
          if (invalidRoles.length > 0) {
            throw new Error(`Invalid roles: ${invalidRoles.join(', ')}`);
          }
        },
      },

    },
  }, {
    sequelize,
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    },
    scopes: {
      without_sensitive_data: {
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      }
    },

    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await generateHash(user.password);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const temp =  await generateHash(user.password);
          console.log("hook user.password", user.password, temp);
            user.password = temp;
        }
      },
    },


  });

  return User;
}


