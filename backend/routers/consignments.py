# backend/routers/consignments.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal, engine
from .. import models, schemas

models.Base.metadata.create_all(bind=engine)

router = APIRouter(prefix="/consignments", tags=["Consignments"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[schemas.ConsignmentOut])
def get_all_consignments(db: Session = Depends(get_db)):
    return db.query(models.Consignment).all()

@router.get("/{consignment_id}", response_model=schemas.ConsignmentOut)
def get_consignment(consignment_id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Consignment).get(consignment_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Consignment not found")
    return obj

@router.post("/", response_model=schemas.ConsignmentOut)
def create_consignment(consignment: schemas.ConsignmentCreate, db: Session = Depends(get_db)):
    obj = models.Consignment(**consignment.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.put("/{consignment_id}", response_model=schemas.ConsignmentOut)
def update_consignment(consignment_id: int, data: schemas.ConsignmentCreate, db: Session = Depends(get_db)):
    obj = db.query(models.Consignment).get(consignment_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Consignment not found")
    for key, value in data.dict().items():
        setattr(obj, key, value)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/{consignment_id}")
def delete_consignment(consignment_id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Consignment).get(consignment_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Consignment not found")
    db.delete(obj)
    db.commit()
    return {"message": "Consignment deleted successfully"}
