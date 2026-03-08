import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from google.cloud.sql.connector import Connector, IPTypes

# Default to SQLite if DATABASE_URL isn't set (for local dev)
# For Cloud SQL, we'll use the connector in a custom engine function
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./truckdriverapp.db")
INSTANCE_CONNECTION_NAME = os.getenv("INSTANCE_CONNECTION_NAME") # e.g. project-id:region:instance-id
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASS = os.getenv("DB_PASS", "")
DB_NAME = os.getenv("DB_NAME", "postgres")

def get_engine():
    # If connection name is provided, use the Cloud SQL Connector
    if INSTANCE_CONNECTION_NAME:
        connector = Connector()

        def getconn():
            conn = connector.connect(
                INSTANCE_CONNECTION_NAME,
                "pg8000",
                user=DB_USER,
                password=DB_PASS,
                db=DB_NAME,
                ip_type=IPTypes.PUBLIC  # Or PRIVATE if using VPC
            )
            return conn

        return create_engine(
            "postgresql+pg8000://",
            creator=getconn,
        )
    
    # Otherwise, fallback to SQLALCHEMY_DATABASE_URL (SQLite or direct Postgres URL)
    connect_args = {}
    if SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
        connect_args = {"check_same_thread": False}
    
    return create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args=connect_args
    )

engine = get_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
