"""
Incident schema for API input.
"""

from pydantic import BaseModel


class IncidentCreate(BaseModel):
    """Schema for creating incident."""

    text: str
