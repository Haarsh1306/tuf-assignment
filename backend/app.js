require("dotenv").config();
const uuidv4 = require("uuid").v4;
const express = require("express");
const app = express();
const pool = require("./db/db");
app.use(express.json());

app.use(cors());

app.get("/api/banners", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, description, visible, endTime, link, createdAt, updatedAt FROM banner");

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
    console.log(process.env.DB_HOST);

    const [result] = await pool.query(
      "INSERT INTO banner (id, description, visible, endTime, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
      [id, description, visible, new Date(endTime), createdAt],
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

app.put("/api/update-banner/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, visible, endTime } = req.body;
    const updatedAt = new Date();

    const [result] = await pool.execute(
      "UPDATE banner SET description = ?, visible = ?, endTime = ?, updatedAt = ? WHERE id = ?",
      [description, visible, endTime, updatedAt, id],
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

app.get("/api/banner/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM banner WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Banner not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/api/banners/:id/toggle-visibility", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAt = new Date();

    const [currentStatus] = await pool.query(
      "SELECT visible FROM banner WHERE id = ?",
      [id],
    );

    if (currentStatus.length === 0) {
      return res.status(404).json({ error: "Banner not found" });
    }

    const newVisible = !currentStatus[0].visible;

    const [result] = await pool.execute(
      "UPDATE banner SET visible = ?, updatedAt = ? WHERE id = ?",
      [newVisible, updatedAt, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Banner not found" });
    }

    res.json({
      message: "Banner visibility toggled successfully",
      visible: newVisible,
      link: `${BASE_URL}/banners/${id}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
