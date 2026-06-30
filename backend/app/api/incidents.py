from fastapi import APIRouter
from backend.app.database.db import get_db

router = APIRouter()


@router.get("/incidents")
def get_incidents():
    conn = get_db()
    cur = conn.cursor()

    cur.execute("SELECT * FROM incidents")
    rows = cur.fetchall()

    conn.close()

    return [dict(row) for row in rows]