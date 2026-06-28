from fastapi import APIRouter
from app.database.db import get_db

router = APIRouter()


@router.get("/incidents")
def get_incidents():
    conn = get_db()
    cur = conn.cursor()

    rows = cur.execute(
        "SELECT * FROM incidents"
    ).fetchall()

    conn.close()

    return [dict(row) for row in rows]