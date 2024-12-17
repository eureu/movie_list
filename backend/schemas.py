from pydantic import BaseModel
from datetime import date

class MovieBase(BaseModel):
    title: str
    description: str
    date: date
    rating: int
    image: str | None = None

class MovieCreate(MovieBase):
    pass

class MovieResponse(MovieBase):
    id: int

    class Config:
        orm_mode = True
