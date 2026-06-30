from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.upload import router as upload_router
from backend.app.api.incidents import router as incident_router
from backend.app.api.export import router as export_router

app = FastAPI(title="RescueSync AI")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(upload_router)
app.include_router(incident_router)
app.include_router(export_router)


@app.get("/")
def home():
    return {"message": "RescueSync AI Running"}