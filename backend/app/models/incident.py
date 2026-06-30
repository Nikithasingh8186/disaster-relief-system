from pydantic import BaseModel


class Incident(BaseModel):
    location: str
    people_affected: int
    injuries: int
    needs: str
    priority: str
