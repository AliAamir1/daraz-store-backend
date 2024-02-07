import { Users } from "../db/connection.js";
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

export { seedUsers };
