# backend/routers/vehicles.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal, engine
from .. import models, schemas

models.Base.metadata.create_all(bind=engine)  # ensure tables exist

router = APIRouter(prefix="/vehicles", tags=["Vehicles"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=list[schemas.VehicleOut])
def get_all_vehicles(db: Session = Depends(get_db)):
    return db.query(models.Vehicle).all()


@router.get("/{vehicle_id}", response_model=schemas.VehicleOut)
def get_vehicle(vehicle_id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Vehicle).get(vehicle_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return obj


@router.post("/", response_model=schemas.VehicleOut)
def create_vehicle(vehicle: schemas.VehicleCreate, db: Session = Depends(get_db)):
    obj = models.Vehicle(**vehicle.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.put("/{vehicle_id}", response_model=schemas.VehicleOut)
def update_vehicle(
    vehicle_id: int, data: schemas.VehicleCreate, db: Session = Depends(get_db)
):
    obj = db.query(models.Vehicle).get(vehicle_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    for key, value in data.dict().items():
        setattr(obj, key, value)
    db.commit()
    db.refresh(obj)
    return obj


@router.delete("/{vehicle_id}")
def delete_vehicle(vehicle_id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Vehicle).get(vehicle_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    db.delete(obj)
    db.commit()
    return {"message": "Vehicle deleted successfully"}
