from sqlalchemy import Column, BigInteger, String, DateTime, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.sql import func
from database import Base
from pydantic import BaseModel
from typing import Optional, Any
from datetime import datetime


# --- SQLAlchemy Database Model ---

class ApplicationRecord(Base):
    __tablename__ = "applications"

    id         = Column(BigInteger, primary_key=True, index=True)
    first_name = Column(String, index=True, default="")
    last_name  = Column(String, index=True, default="")
    email      = Column(String, index=True, default="")
    phone      = Column(String, default="")
    status     = Column(String, default="Pending")
    pdf_path   = Column(String, nullable=True)
    raw_data   = Column(JSONB, nullable=False, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


# --- Pydantic Validation Models ---

class ApplicationSubmission(BaseModel):
    personal:     dict
    general:      dict
    experience:   dict
    licenses:     list
    military:     dict
    employment:   list
    training:     dict
    education:    dict
    unemployment: dict
    fmcsr:        dict
    documents:    Optional[list] = None
    disclosures:  dict
    signature:    dict


class ApplicationResponse(BaseModel):
    id:         int
    first_name: str
    last_name:  str
    email:      str
    status:     str
    created_at: datetime

    class Config:
        from_attributes = True
