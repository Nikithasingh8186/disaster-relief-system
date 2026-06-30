from app.database.db import get_db
from app.services.parser_service import parse_incident
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS (IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 🔥 CREATE TABLE (AUTO SETUP)
def init_db():
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS incidents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT,
            image TEXT,
            location TEXT,
            time TEXT
        )
    """
    )

    conn.commit()
    conn.close()


init_db()


# 🔥 POST INCIDENT
@app.post("/incidents")
def add_incident(data: dict):
    cleaned = parse_incident(data)

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO incidents (text, image, location, time)
        VALUES (?, ?, ?, ?)
    """,
        (
            cleaned.get("text"),
            str(cleaned.get("image")),
            str(cleaned.get("location")),
            cleaned.get("time"),
        ),
    )

    conn.commit()
    conn.close()

    return {"message": "saved"}


# 🔥 GET INCIDENTS
@app.get("/incidents")
def get_incidents():
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM incidents")
    rows = cursor.fetchall()

    conn.close()

    incidents = []
    for row in rows:
        incidents.append(
            {
                "text": row["text"],
                "image": row["image"],
                "location": (
                    eval(row["location"])
                    if row["location"].startswith("{")
                    else row["location"]
                ),
                "time": row["time"],
            }
        )

    return [parse_incident(i) for i in incidents]
