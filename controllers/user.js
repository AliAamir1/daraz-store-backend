import { Users } from "../db/connection.js";

const get = async (req, res) => {
  try {
    const allUsers = await Users.scope("without_sensitive_data").findAll();
    return res.status(200).json({ data: allUsers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await Users.scope("without_sensitive_data").findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const update = async (req, res) => {
  const { username } = req.body;

  if (Object.keys(req.body).length === 0) {
    return res.status(200).json({ message: "No changes made." });
  }

  const { id: userId } = req.user;

  const existingUser = await Users.findByPk(userId);

  if (!existingUser) {
    return res.status(404).json({ error: "User not found" });
  }

  existingUser.username = username;
  await existingUser.save();

  return res.status(200).json({ data: existingUser });
};

const remove = async (req, res) => {
  // Find the user by ID
  const userId = req.params.userId;
  const existingUser = await Users.findByPk(userId);

  if (!existingUser) {
    return res.status(404).json({ error: "User not found" });
  }

  // Delete the user from the database
  await existingUser.destroy();

  // Return success message
  return res.status(204).json({ message: "User Deleted Successfully" });
};

export { get, getById, update, remove };
