from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3

app = FastAPI()

class Movie(BaseModel):
    title: str
    date: str
    description: str
    rating: int
    genres: list
    image: str

def init_db():
    conn = sqlite3.connect('movies.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS movies
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                 title TEXT,
                 date TEXT,
                 description TEXT,
                 rating INTEGER,
                 genres TEXT,
                 image TEXT)''')
    conn.commit()
    conn.close()

@app.get("/movies")
def get_movies():
    conn = sqlite3.connect('movies.db')
    c = conn.cursor()
    c.execute('SELECT * FROM movies')
    movies = c.fetchall()
    conn.close()
    return movies

@app.post("/movies")
def add_movie(movie: Movie):
    conn = sqlite3.connect('movies.db')
    c = conn.cursor()
    c.execute('INSERT INTO movies (title, date, description, rating, genres, image) VALUES (?, ?, ?, ?, ?, ?)',
              (movie.title, movie.date, movie.description, movie.rating, ','.join(movie.genres), movie.image))
    conn.commit()
    conn.close()
    return {"status": "Movie added"}

if __name__ == '__main__':
    init_db()
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
