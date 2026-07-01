from pydantic import BaseModel


class IncidentCreate(BaseModel):
    """Schema for creating a new incident"""

    text: str
