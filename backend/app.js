require("dotenv").config();
const uuidv4 = require("uuid").v4;
const express = require("express");
const app = express();
const pool = require("./db/db");
app.use(express.json());    

const BASE_URL = "http://localhost:3000";

app.post("/api/banners", async (req, res) => {
  try {
    const { description, visible, endTime } = req.body;
    const id = uuidv4();
    const link = `${BASE_URL}/banners/${id}`;
    const createdAt = new Date();
    console.log(process.env.DB_HOST);
    const [result] = await pool.execute(
      "INSERT INTO banner (id, description, visible, endTime, link, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
      [id, description, visible, endTime, link, createdAt]
    );
    console.log(result);

    res.status(201).json({
      message: "Banner created successfully",
      id,
      link,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/banners/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, visible, endTime } = req.body;
    const updatedAt = new Date();

    const [result] = await pool.execute(
      "UPDATE banner SET description = ?, visible = ?, endTime = ?, updatedAt = ? WHERE id = ?",
      [description, visible, endTime, updatedAt, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Banner not found" });
    }

    res.json({
      message: "Banner updated successfully",
      link: `${BASE_URL}/banners/${id}`,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
