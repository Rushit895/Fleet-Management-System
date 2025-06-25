# backend/routers/owners.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal, engine
from .. import models, schemas

models.Base.metadata.create_all(bind=engine)

router = APIRouter(prefix="/owners", tags=["Owners"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[schemas.OwnerOut])
def get_all_owners(db: Session = Depends(get_db)):
    return db.query(models.Owner).all()

@router.get("/{owner_id}", response_model=schemas.OwnerOut)
def get_owner(owner_id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Owner).get(owner_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Owner not found")
    return obj

@router.post("/", response_model=schemas.OwnerOut)
def create_owner(owner: schemas.OwnerCreate, db: Session = Depends(get_db)):
    obj = models.Owner(**owner.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.put("/{owner_id}", response_model=schemas.OwnerOut)
def update_owner(owner_id: int, data: schemas.OwnerCreate, db: Session = Depends(get_db)):
    obj = db.query(models.Owner).get(owner_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Owner not found")
    for key, value in data.dict().items():
        setattr(obj, key, value)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/{owner_id}")
def delete_owner(owner_id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Owner).get(owner_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Owner not found")
    db.delete(obj)
    db.commit()
    return {"message": "Owner deleted successfully"}
