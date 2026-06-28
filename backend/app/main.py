from fastapi import FastAPI
from app.api.upload import router as upload_router
from app.api.incidents import router as incident_router
from app.api.export import router as export_router
app = FastAPI(title="RescueSync AI")

app.include_router(upload_router)
app.include_router(incident_router)
app.include_router(export_router)


@app.get("/")
def home():
    return {"message": "RescueSync AI Running"}