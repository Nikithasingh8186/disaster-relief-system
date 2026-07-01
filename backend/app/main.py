from app.database.db import get_db
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def init_db():
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS incidents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            location TEXT,
            people_affected INTEGER,
            injuries INTEGER,
            needs TEXT,
            priority TEXT
        )
        """
    )

    conn.commit()
    conn.close()


init_db()


@app.post("/incidents")
def add_incident(data: dict):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO incidents
        (location, people_affected, injuries, needs, priority)
        VALUES (?, ?, ?, ?, ?)
        """,
        (
            data.get("location", "Unknown"),
            data.get("people_affected", 0),
            data.get("injuries", 0),
            data.get("needs", ""),
            data.get("priority", "Low"),
        ),
    )

    conn.commit()
    conn.close()

    return {"message": "saved"}


@app.get("/incidents")
def get_incidents():
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM incidents")
    rows = cursor.fetchall()

    conn.close()

    return [dict(row) for row in rows]


@app.get("/search")
def search():
    return {"results": []}
