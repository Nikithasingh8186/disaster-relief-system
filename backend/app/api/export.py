from fastapi import APIRouter
from fastapi.responses import FileResponse
import pandas as pd

from backend.app.database.db import get_db

router = APIRouter()


@router.get("/export")
def export_csv():
    conn = get_db()

    df = pd.read_sql_query(
        "SELECT * FROM incidents",
        conn
    )

    path = "database/incidents.csv"
    df.to_csv(path, index=False)

    conn.close()

    return FileResponse(
        path,
        media_type="text/csv",
        filename="incidents.csv"
    )