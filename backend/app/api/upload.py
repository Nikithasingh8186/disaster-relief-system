from fastapi import APIRouter
from pydantic import BaseModel

from backend.app.services.llm_service import extract_incident
from backend.app.database.db import get_db

router = APIRouter()


class TextRequest(BaseModel):
    text: str


@router.post("/upload/text")
def upload_text(data: TextRequest):
    incident = extract_incident(data.text)

    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO incidents(
            location,
            people_affected,
            injuries,
            needs,
            priority
        )
        VALUES (?, ?, ?, ?, ?)
        """,
        (
            incident["location"],
            incident["people_affected"],
            incident["injuries"],
            incident["needs"],
            incident["priority"],
        ),
    )

    conn.commit()
    conn.close()

    return incident