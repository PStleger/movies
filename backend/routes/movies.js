require("dotenv/config");
const express = require("express");
const router = express.Router();
const pool = require("../db");

router.use(express.json());

router
  .route("/:id")
  // GET  /:id one movie (with the id)
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const singleMovie = await pool.query("SELECT * FROM movies WHERE id=$1", [
        id,
      ]);
      res.json(singleMovie.rows[0]);
    } catch (error) {
      console.error(error.message);
    }
  })
  // PUT /:id  edit one movie (with the id)
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const { title, director, year, rating, poster, genre } = req.body;
      const editMovie = await pool.query(
        "UPDATE movies SET title=$1,director=$2,year=$3, rating=$4,poster=$5,genre=$6 WHERE id=$7 RETURNING *",
        [title, director, year, rating, poster, genre, id]
      );
      res.json(editMovie.rows[0]);
    } catch (error) {
      console.error(error.message);
    }
  })
  // DELETE  /:id one movie (with the id)
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const deleteMovie = await pool.query(
        "DELETE FROM movies WHERE id=$1 RETURNING *",
        [id]
      );
      res.json(deleteMovie.rows[0]);
    } catch (error) {
      console.error(error.message);
    }
  });

router
  .route("/")
  // GET all the movies
  .get(async (req, res) => {
    try {
      const allMovies = await pool.query("SELECT * FROM movies");
      res.json(allMovies.rows);
    } catch (error) {
      console.error(error.message);
    }
  })
  // POST create a new movie
  .post(async (req, res) => {
    try {
      const { title, director, year, rating, poster, genre } = req.body;
      const createMovie = await pool.query(
        "INSERT INTO movies (title, director, year, rating, poster, genre) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
        [title, director, year, rating, poster, genre]
      );
      res.json(createMovie.rows[0]);
    } catch (error) {
      console.error(error.message);
    }
  });

module.exports = router;
