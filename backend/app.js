require("dotenv").config();
const uuidv4 = require("uuid").v4;
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db/db");
app.use(express.json());

app.use(cors());

app.get("/api/banners", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, description, visible, endTime, createdAt, updatedAt FROM banner"
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/create-banner", async (req, res) => {
  try {
    const { description, visible, endTime } = req.body;
    const id = uuidv4();
    const createdAt = new Date();
    const [result] = await pool.query(
      "INSERT INTO banner (id, description, visible, endTime, createdAt) VALUES (?, ?, ?, ?, ?)",
      [id, description, visible, new Date(endTime), createdAt]
    );

    res.status(201).json({
      message: "Banner created successfully",
      id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/update-banner/:id", async (req, res) => {
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
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/banner/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM banner WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Banner not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/banners/:id/toggle-visibility", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAt = new Date();
    const { visible } = req.body;

    const [result] = await pool.execute(
      "UPDATE banner SET visible = ?, updatedAt = ? WHERE id = ?",
      [visible, updatedAt, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Banner not found" });
    }

    res.json({
      message: "Banner visibility changed successfully",
      visible,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
