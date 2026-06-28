from pydantic import BaseModel


class IncidentCreate(BaseModel):
    text: str