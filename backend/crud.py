from sqlalchemy.orm import Session
from models import Movie
from schemas import MovieCreate


def get_movies(db: Session):
    return db.query(Movie).all()

def create_movie(db: Session, movie: MovieCreate):
    db_movie = Movie(**movie.dict())
    db.add(db_movie)
    db.commit()
    db.refresh(db_movie)
    return db_movie

def delete_movie(db: Session, movie_id: int):
    db_movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if db_movie:
        db.delete(db_movie)
        db.commit()
    return db_movie
