from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from database import Base
from pydantic import BaseModel
from typing import Optional, Any
from datetime import datetime

# --- SQLAlchemy Database Models ---

class ApplicationRecord(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    email = Column(String, index=True)
    phone = Column(String)
    status = Column(String, default="Pending")
    pdf_path = Column(String, nullable=True)
    raw_data = Column(Text) # Store the entire JSON payload
    created_at = Column(DateTime(timezone=True), server_default=func.now())

# --- Pydantic Validation Models ---
# Using Any to accept the complex React form payload seamlessly

class ApplicationSubmission(BaseModel):
    personal: dict
    general: dict
    experience: dict
    licenses: list
    military: dict
    employment: list
    training: dict
    education: dict
    unemployment: dict
    fmcsr: dict
    documents: Optional[list] = None
    disclosures: dict
    signature: dict

class ApplicationResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True
