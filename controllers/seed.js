import { Users, Products } from "../db/connection.js";
import bcrypt from "bcrypt";

// Seed function to create dummy users
const seedUsers = async (req, res) => {
  try {
    // Dummy users data
    const dummyUsers = [
      {
        username: "user1",
        email: "user1@example.com",
        password: "password1",
        roles: ["user"],
      },
      {
        username: "user1",
        email: "user1@example2.com",
        password: "password1",
        roles: ["user"],
      },
      {
        username: "user1",
        email: "user1@example1.com",
        password: "password1",
        roles: ["user"],
      },
      {
        username: "user1",
        email: "user1@example3.com",
        password: "password1",
        roles: ["user"],
      },
      {
        username: "user1",
        email: "user1@example4.com",
        password: "password1",
        roles: ["user"],
      },
      {
        username: "user1",
        email: "user1@example5.com",
        password: "password1",
        roles: ["user"],
      },
    ];

    await Promise.all(
      dummyUsers.map(async (user) => {
        await Users.create(user);
      })
    );

    const adminUser = {
      username: "ali",
      email: "aliaamir@gmail.com",
      password: "alirules1",
      roles: ["admin"],
    };

    await Users.create(adminUser);

    return res.status(201).json({ message: "Seed successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const seedProducts = async (req, res) => {
  // Dummy products data
  const dummyProducts = [];

  // Generate 100 dummy products
  for (let i = 1; i <= 100; i++) {
    const product = {
      name: `Product ${i}`,
      price: parseFloat((Math.random() * (1000 - 10) + 10).toFixed(2)),
      quantity: Math.floor(Math.random() * 50) + 1,
      brand: `Brand ${i}`,
    };

    dummyProducts.push(product);
  }

  // Create dummy products
  await Promise.all(
    dummyProducts.map(async (product) => {
      // Create product in the database
      await Products.create(product);
    })
  );

  return res.status(201).json({ message: "Product seed successful" });
};

export { seedUsers, seedProducts };
