import { Products } from "../db/connection.js";
import { Op } from "sequelize";

const get = async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    name,
    price_min,
    price_max,
    quantity_min,
    quantity_max,
    brand,
  } = req.query;

  const products = await Products.getFiltered(req.query);

  return res.status(200).json({ data: products });
};

const getById = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Products.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json({ data: product });
  } catch (error) {
    throw error;
  }
};

const create = async (req, res, next) => {
  const productData = req.body;

  try {
    const createdProduct = await Products.create(productData);
    return res.status(201).json({ data: createdProduct });
  } catch (error) {
    throw error;
  }
};

const update = async (req, res, next) => {
  const productData = req.body;
  const productId = req.params.productId;

  try {
    const existingProduct = await Products.findByPk(productId);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    await existingProduct.update(productData);
    return res.status(200).json({ data: existingProduct });
  } catch (error) {
    throw error;
  }
};

const remove = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const deletedProduct = await Products.destroy({
      where: { id: productId },
    });

    if (deletedProduct === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(204).json();
  } catch (error) {
    throw error;
  }
};

export { get, getById, create, update, remove };
export default { get, getById, create, update, remove };
