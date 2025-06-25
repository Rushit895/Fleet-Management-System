# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import (
    owners,
    vehicles,
    customers,
    drivers,
    consignments,
    maintenances,
    availabilities,
)

app = FastAPI(title="Fleet Management & Tracking API")

# CORS: allow your React frontend to call this API
origins = [
    "http://localhost:3000",  # React dev server
    "http://127.0.0.1:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# include all routers
app.include_router(owners.router)
app.include_router(vehicles.router)
app.include_router(customers.router)
app.include_router(drivers.router)
app.include_router(consignments.router)
app.include_router(maintenances.router)
app.include_router(availabilities.router)


@app.get("/")
def read_root():
    return {"message": "Welcome to the FMTS API"}
