from models import Base
from schemas import MovieCreate, MovieResponse
from crud import get_movies, create_movie, delete_movie
from database import engine, SessionLocal
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/movies", response_model=list[MovieResponse])
def read_movies(db: Session = Depends(get_db)):
    return get_movies(db)

@app.post("/movies", response_model=MovieResponse)
def create_new_movie(movie: MovieCreate, db: Session = Depends(get_db)):
    return create_movie(db, movie)

@app.delete("/movies/{movie_id}")
def remove_movie(movie_id: int, db: Session = Depends(get_db)):
    if not delete_movie(db, movie_id):
        raise HTTPException(status_code=404, detail="Movie not found")
    return {"detail": "Movie deleted"}
