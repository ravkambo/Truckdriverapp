from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, Base, get_db
from models import ApplicationRecord, ApplicationSubmission, ApplicationResponse

# Create the database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Cargo Clarity API", version="1.0.0")

# Configure CORS for the React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Cargo Clarity API is running."}

@app.post("/submit-application", response_model=ApplicationResponse)
def submit_application(data: ApplicationSubmission, db: Session = Depends(get_db)):
    """
    Receives the full driver application form, extracts key search fields, 
    and saves the entire payload as JSON in the SQLite database.
    """
    try:
        personal_info = data.personal
        
        # Create a new database record
        db_record = ApplicationRecord(
            first_name=personal_info.get("firstName", ""),
            last_name=personal_info.get("lastName", ""),
            email=personal_info.get("email", ""),
            phone=personal_info.get("phone", ""),
            raw_data=data.dict()
        )
        
        db.add(db_record)
        db.commit()
        db.refresh(db_record)
        
        return db_record
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/applications", response_model=list[ApplicationResponse])
def get_applications(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieves a list of submitted applications.
    """
    applications = db.query(ApplicationRecord).offset(skip).limit(limit).all()
    return applications

@app.post("/reset-database")
def reset_database(db: Session = Depends(get_db)):
    """
    Deletes all records from the applications table.
    """
    try:
        db.query(ApplicationRecord).delete()
        db.commit()
        return {"message": "All database records have been cleared."}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
