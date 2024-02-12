import { DataTypes, Op } from "sequelize";
export default (sequelize, Sequelize) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Product name cannot be null",
          },
        },
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price cannot be null",
          },
          min: {
            args: [0],
            msg: "Price must be greater than or equal to 0",
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Quantity cannot be null",
          },
          min: {
            args: [0],
            msg: "Quantity must be greater than or equal to 0",
          },
        },
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Brand cannot be null",
          },
        },
      },
      paymentUrl: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
        // validate: {
        //   notNull: {
        //     msg : "Payment Link cannot be null"
        //   }
        // }
      }
    },
    {
      sequelize,
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );

  Product.getFiltered = async (querry) => {
    const {
      page = 1,
      limit = 10,
      name,
      price_min,
      price_max,
      quantity_min,
      quantity_max,
      brand,
    } = querry;
    const offset = (page - 1) * limit;
    const products = await Product.findAll({
      where: {
        [Op.and]: [
          name && {
            name: {
              [Op.iLike]: `%${name.trim()}%`,
            },
          },
          (price_max || price_min) && {
            price: {
              ...(price_min && { [Op.gte]: price_min }),
              ...(price_max && { [Op.lte]: price_max }),
            },
          },

          (quantity_min || quantity_max) && {
            quantity: {
              ...(quantity_min && { [Op.gte]: quantity_min }),
              ...(quantity_max && { [Op.lte]: quantity_max }),
            },
          },
          brand && {
            brand: {
              [Op.iLike]: `%${brand.trim()}%`,
            },
          },
        ].filter(Boolean),
      },
      offset: offset,
      limit: limit,
    });

    return products;
  };

  return Product;
};
