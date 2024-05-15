const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

// Configure PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.use(cors());

app.get('/api/projects', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM projects');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  const projectId = req.params.id;
  try {
    const { rows } = await pool.query('SELECT * FROM projects WHERE id = $1', [projectId]);
    if (rows.length > 0) {
      res.json(rows[0]);
      console.log(rows[0]);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/blogs', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM blogs');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/blogs/:id', async (req, res) => {
  const blogId = req.params.id;
  try {
    const { rows } = await pool.query('SELECT * FROM blogs WHERE blog_id = $1', [blogId]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Blog not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/blogs/project/:projectId', async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const { rows } = await pool.query('SELECT * FROM blogs WHERE project_id = $1', [projectId]);
    if (rows.length > 0) {
      console.log(rows[0]);
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'No blogs found for this project' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

