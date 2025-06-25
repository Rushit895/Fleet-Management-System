# backend/routers/drivers.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal, engine
from .. import models, schemas

models.Base.metadata.create_all(bind=engine)

router = APIRouter(prefix="/drivers", tags=["Drivers"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[schemas.DriverOut])
def get_all_drivers(db: Session = Depends(get_db)):
    return db.query(models.Driver).all()

@router.get("/{driver_id}", response_model=schemas.DriverOut)
def get_driver(driver_id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Driver).get(driver_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Driver not found")
    return obj

@router.post("/", response_model=schemas.DriverOut)
def create_driver(driver: schemas.DriverCreate, db: Session = Depends(get_db)):
    obj = models.Driver(**driver.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.put("/{driver_id}", response_model=schemas.DriverOut)
def update_driver(driver_id: int, data: schemas.DriverCreate, db: Session = Depends(get_db)):
    obj = db.query(models.Driver).get(driver_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Driver not found")
    for key, value in data.dict().items():
        setattr(obj, key, value)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/{driver_id}")
def delete_driver(driver_id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Driver).get(driver_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Driver not found")
    db.delete(obj)
    db.commit()
    return {"message": "Driver deleted successfully"}
