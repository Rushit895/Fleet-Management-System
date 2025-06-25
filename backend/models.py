# backend/models.py
from sqlalchemy import Column, Integer, String, Text, Date, DateTime, Boolean, DECIMAL, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Owner(Base):
    __tablename__ = "owners"
    owner_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    contact_email = Column(String(100))
    phone_number = Column(String(15))
    address = Column(Text)

    vehicles = relationship("Vehicle", back_populates="owner")
    drivers = relationship("Driver", back_populates="owner")


class Vehicle(Base):
    __tablename__ = "vehicles"
    vehicle_id = Column(Integer, primary_key=True, index=True)
    registration_no = Column(String(50), unique=True, index=True, nullable=False)
    type = Column(String(50))
    model = Column(String(100))
    status = Column(String(50))
    capacity = Column(Integer)
    owner_id = Column(Integer, ForeignKey("owners.owner_id"))

    owner = relationship("Owner", back_populates="vehicles")
    drivers = relationship("Driver", back_populates="vehicle")
    consignments = relationship("Consignment", back_populates="vehicle")
    maintenances = relationship("Maintenance", back_populates="vehicle")
    availabilities = relationship("Availability", back_populates="vehicle")


class Customer(Base):
    __tablename__ = "customers"
    customer_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100))
    phone_number = Column(String(15))
    address = Column(Text)

    consignments = relationship("Consignment", back_populates="customer")


class Driver(Base):
    __tablename__ = "drivers"
    driver_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    license_no = Column(String(50))
    license_expiry = Column(Date)
    phone_number = Column(String(15))
    status = Column(String(20), nullable=False, default="off-duty")
    owner_id = Column(Integer, ForeignKey("owners.owner_id"))
    assigned_vehicle_id = Column(Integer, ForeignKey("vehicles.vehicle_id"))

    owner = relationship("Owner", back_populates="drivers")
    vehicle = relationship("Vehicle", back_populates="drivers")
    consignments = relationship("Consignment", back_populates="driver")
    availabilities = relationship("Availability", back_populates="driver")


class Consignment(Base):
    __tablename__ = "consignments"
    consignment_id = Column(Integer, primary_key=True, index=True)
    vehicle_id = Column(Integer, ForeignKey("vehicles.vehicle_id"))
    driver_id = Column(Integer, ForeignKey("drivers.driver_id"))
    customer_id = Column(Integer, ForeignKey("customers.customer_id"))
    origin = Column(String(100))
    destination = Column(String(100))
    departure_time = Column(DateTime)
    arrival_time = Column(DateTime)
    status = Column(String(50))

    vehicle = relationship("Vehicle", back_populates="consignments")
    driver = relationship("Driver", back_populates="consignments")
    customer = relationship("Customer", back_populates="consignments")


class Maintenance(Base):
    __tablename__ = "maintenances"
    maintenance_id = Column(Integer, primary_key=True, index=True)
    vehicle_id = Column(Integer, ForeignKey("vehicles.vehicle_id"))
    service_date = Column(Date)
    description = Column(Text)
    cost = Column(DECIMAL(10, 2))
    next_due_date = Column(Date)

    vehicle = relationship("Vehicle", back_populates="maintenances")


class Availability(Base):
    __tablename__ = "availabilities"
    availability_id = Column(Integer, primary_key=True, index=True)
    vehicle_id = Column(Integer, ForeignKey("vehicles.vehicle_id"))
    driver_id = Column(Integer, ForeignKey("drivers.driver_id"))
    is_available = Column(Boolean, default=True)
    available_from = Column(DateTime)
    available_to = Column(DateTime)

    vehicle = relationship("Vehicle", back_populates="availabilities")
    driver = relationship("Driver", back_populates="availabilities")
