from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas, crud, database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/movies", response_model=list[schemas.MovieResponse])
def read_movies(db: Session = Depends(get_db)):
    return crud.get_movies(db)

@app.post("/movies", response_model=schemas.MovieResponse)
def create_movie(movie: schemas.MovieCreate, db: Session = Depends(get_db)):
    return crud.create_movie(db, movie)

@app.delete("/movies/{movie_id}")
def delete_movie(movie_id: int, db: Session = Depends(get_db)):
    if not crud.delete_movie(db, movie_id):
        raise HTTPException(status_code=404, detail="Movie not found")
    return {"detail": "Movie deleted"}
