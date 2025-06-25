# backend/schemas.py
from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

# --- Owner schemas ---
class OwnerBase(BaseModel):
    name: str
    contact_email: Optional[str] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None

class OwnerCreate(OwnerBase):
    pass

class OwnerOut(OwnerBase):
    owner_id: int

    class Config:
        orm_mode = True


# --- Vehicle schemas ---
class VehicleBase(BaseModel):
    registration_no: str
    type: Optional[str] = None
    model: Optional[str] = None
    status: Optional[str] = None
    capacity: Optional[int] = None
    owner_id: Optional[int] = None

class VehicleCreate(VehicleBase):
    pass

class VehicleOut(VehicleBase):
    vehicle_id: int

    class Config:
        orm_mode = True


# --- Customer schemas ---
class CustomerBase(BaseModel):
    name: str
    email: Optional[str] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None

class CustomerCreate(CustomerBase):
    pass

class CustomerOut(CustomerBase):
    customer_id: int

    class Config:
        orm_mode = True


# --- Driver schemas ---
class DriverBase(BaseModel):
    name: str
    license_no: Optional[str] = None
    license_expiry: Optional[date] = None
    phone_number: Optional[str] = None
    status: str
    assigned_vehicle_id: Optional[int] = None

class DriverCreate(DriverBase):
    pass

class DriverOut(DriverBase):
    driver_id: int

    class Config:
        orm_mode = True


# --- Consignment schemas ---
class ConsignmentBase(BaseModel):
    vehicle_id: Optional[int] = None
    driver_id: Optional[int] = None
    customer_id: Optional[int] = None
    origin: Optional[str] = None
    destination: Optional[str] = None
    departure_time: Optional[datetime] = None
    arrival_time: Optional[datetime] = None
    status: Optional[str] = None

class ConsignmentCreate(ConsignmentBase):
    pass

class ConsignmentOut(ConsignmentBase):
    consignment_id: int

    class Config:
        orm_mode = True


# --- Maintenance schemas ---
class MaintenanceBase(BaseModel):
    vehicle_id: int
    service_date: date
    description: str
    cost: float
    next_due_date: date

class MaintenanceCreate(MaintenanceBase):
    pass

class MaintenanceOut(MaintenanceBase):
    maintenance_id: int

    class Config:
        orm_mode = True


# --- Availability schemas ---
class AvailabilityBase(BaseModel):
    vehicle_id: int
    driver_id: int
    is_available: bool
    available_from: Optional[datetime] = None
    available_to: Optional[datetime] = None

class AvailabilityCreate(AvailabilityBase):
    pass

class AvailabilityOut(AvailabilityBase):
    availability_id: int

    class Config:
        orm_mode = True
