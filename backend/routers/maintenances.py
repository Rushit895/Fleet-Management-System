# backend/routers/maintenances.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal, engine
from .. import models, schemas

models.Base.metadata.create_all(bind=engine)

router = APIRouter(prefix="/maintenances", tags=["Maintenances"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[schemas.MaintenanceOut])
def get_all_maintenances(db: Session = Depends(get_db)):
    return db.query(models.Maintenance).all()

@router.get("/{maintenance_id}", response_model=schemas.MaintenanceOut)
def get_maintenance(maintenance_id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Maintenance).get(maintenance_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Maintenance not found")
    return obj

@router.post("/", response_model=schemas.MaintenanceOut)
def create_maintenance(maintenance: schemas.MaintenanceCreate, db: Session = Depends(get_db)):
    obj = models.Maintenance(**maintenance.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.put("/{maintenance_id}", response_model=schemas.MaintenanceOut)
def update_maintenance(maintenance_id: int, data: schemas.MaintenanceCreate, db: Session = Depends(get_db)):
    obj = db.query(models.Maintenance).get(maintenance_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Maintenance not found")
    for key, value in data.dict().items():
        setattr(obj, key, value)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/{maintenance_id}")
def delete_maintenance(maintenance_id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Maintenance).get(maintenance_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Maintenance not found")
    db.delete(obj)
    db.commit()
    return {"message": "Maintenance deleted successfully"}
