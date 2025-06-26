# Fleet Management & Tracking System (FMTS)

A unified, web-based solution to centralize and automate fleet operations—vehicle & driver management, real-time tracking simulation, task assignment, and maintenance scheduling—all backed by a RESTful API and a responsive React dashboard. :contentReference[oaicite:0]{index=0}

---

## Features

- **Centralized Data Management**  
  Single source of truth for vehicles, drivers, owners, customers, consignments, maintenance logs, and availability windows.

- **Role-Based Access Control**  
  Multiple user roles (Admin, Dispatcher, Mechanic, Driver) with differentiated permissions for CRUD operations.

- **Simulated GPS Tracking**  
  Background task updates “in-transit” vehicles’ coordinates every 10 seconds; interactive map visualization with color-coded markers.

- **Automated Workflows**  
  - Driver-vehicle assignment toggles status automatically  
  - Maintenance alerts based on service dates or odometer readings  
  - Availability windows enforcement to prevent scheduling conflicts

- **Real-Time KPIs & Reports**  
  Dashboard cards for total/available/deployed/maintenance counts; pre-built daily/weekly/monthly performance reports.

---

## Tech Stack

- **Backend**  
  - Python 3.10+ & FastAPI  
  - MySQL 8 (via mysql-connector)  
  - SQLAlchemy ORM & Pydantic  
  - Uvicorn ASGI server  
  - Background tasks for GPS simulation

- **Frontend**  
  - React 18 & Material-UI v5  
  - React Router v6  
  - Axios HTTP client  
  - React-Leaflet for maps  
  - date-fns for date handling

- **Dev Tools**  
  - Git, ESLint/Prettier, Flake8  
  - Environment via `.env` (back) & `.env.local` (front)  
  - Create-React-App & pip/pipenv
---

## Getting Started

### Prerequisites

- Node.js ≥16 & npm  
- Python 3.10+ & pip/pipenv  
- MySQL 8 server

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/<your-username>/fmts.git
   cd fmts
### Backend Setup
  cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your MySQL credentials and settings

### Database Initialization
# This will create all tables as defined in models.py
uvicorn main:app --reload

### Frontend Setup
cd ../frontend
npm install
cp .env.local.example .env.local
# Edit .env.local to point to your backend API URL
npm start

### API Endpoints
All endpoints are prefixed with /api (configurable in .env).

| Resource         | Method | Path                | Description             |
| ---------------- | ------ | ------------------- | ----------------------- |
| **Owners**       | GET    | `/owners/`          | List all owners         |
|                  | POST   | `/owners/`          | Create a new owner      |
|                  | GET    | `/owners/{id}`      | Get owner by ID         |
|                  | PUT    | `/owners/{id}`      | Update owner            |
|                  | DELETE | `/owners/{id}`      | Delete owner            |
| **Vehicles**     | GET…   | `/vehicles/`…       | *(same CRUD as Owners)* |
| **Drivers**      | …      | `/drivers/`…        |                         |
| **Customers**    | …      | `/customers/`…      |                         |
| **Consignments** | …      | `/consignments/`…   |                         |
| **Maintenances** | …      | `/maintenances/`…   |                         |
| **Availability** | …      | `/availabilities/`… |                         |

See backend/routers/ for full definitions.
---
### Database Schema
  Key tables and relationships:
  
  owners ⇆ vehicles, drivers
  
  vehicles ⇆ consignments, maintenances, availabilities
  
  drivers ⇆ consignments, availabilities
  
  customers ⇆ consignments
---
### Contributing
  Fork the repository
  
  Create your feature branch: git checkout -b feature/YourFeature
  
  Commit your changes: git commit -m "Add YourFeature"
  
  Push to the branch: git push origin feature/YourFeature
  
  Open a Pull Request
  
  Please follow the existing code style and add tests where applicable.
---
### Author
### Rushit Jani
