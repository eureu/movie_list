from sqlalchemy import Column, Integer, String, Date
from database import Base

class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    rating = Column(Integer, nullable=False)
    image = Column(String, nullable=True)
