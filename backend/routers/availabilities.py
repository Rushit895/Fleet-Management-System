# backend/routers/availabilities.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal, engine
from .. import models, schemas

models.Base.metadata.create_all(bind=engine)

router = APIRouter(prefix="/availabilities", tags=["Availabilities"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[schemas.AvailabilityOut])
def get_all_availabilities(db: Session = Depends(get_db)):
    return db.query(models.Availability).all()

@router.get("/{availability_id}", response_model=schemas.AvailabilityOut)
def get_availability(availability_id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Availability).get(availability_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Availability not found")
    return obj

@router.post("/", response_model=schemas.AvailabilityOut)
def create_availability(availability: schemas.AvailabilityCreate, db: Session = Depends(get_db)):
    obj = models.Availability(**availability.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.put("/{availability_id}", response_model=schemas.AvailabilityOut)
def update_availability(availability_id: int, data: schemas.AvailabilityCreate, db: Session = Depends(get_db)):
    obj = db.query(models.Availability).get(availability_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Availability not found")
    for key, value in data.dict().items():
        setattr(obj, key, value)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/{availability_id}")
def delete_availability(availability_id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Availability).get(availability_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Availability not found")
    db.delete(obj)
    db.commit()
    return {"message": "Availability deleted successfully"}
