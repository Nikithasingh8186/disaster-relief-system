"""
Incident model schema.
"""

from pydantic import BaseModel


class Incident(BaseModel):
    """Incident data model."""

    location: str
    people_affected: int
    injuries: int
    needs: str
    priority: str
