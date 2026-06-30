# scripts/create_database.py

import os
import sqlite3

# Create database directory if it doesn't exist
os.makedirs("database", exist_ok=True)

DB_PATH = "database/rescuesync.db"

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

# Create incidents table
cursor.execute(
    """
CREATE TABLE IF NOT EXISTS incidents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location TEXT NOT NULL,
    people_affected INTEGER DEFAULT 0,
    injuries INTEGER DEFAULT 0,
    needs TEXT,
    priority TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
"""
)

# Create reports table
cursor.execute(
    """
CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    incident_id INTEGER,
    report_text TEXT,
    source TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (incident_id) REFERENCES incidents(id)
)
"""
)

conn.commit()
conn.close()

print("✅ Database and tables created successfully!")
print(f"📁 Database location: {DB_PATH}")
