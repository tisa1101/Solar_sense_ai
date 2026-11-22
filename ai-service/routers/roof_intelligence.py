from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import base64
import io

from services.roof_analyzer import analyze_roof_image

router = APIRouter()

class Base64RoofAnalysisRequest(BaseModel):
    image: str
    filename: Optional[str] = "roof.jpg"

@router.post("/analyze-file")
async def analyze_roof_file(file: UploadFile = File(...)):
    """Analyze uploaded roof photo file using Keras computer vision."""
    try:
        contents = await file.read()
        if len(contents) == 0:
            raise HTTPException(status_code=400, detail="Uploaded file is empty.")
        
        result = analyze_roof_image(contents, file.filename or "roof.jpg")
        return {
            "success": True,
            "message": "Roof photo analyzed successfully using Keras vision model.",
            "data": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Roof analysis failed: {str(e)}")

@router.post("/analyze-base64")
async def analyze_roof_base64(request: Base64RoofAnalysisRequest):
    """Analyze base64-encoded rooftop photo using Keras computer vision."""
    try:
        raw_b64 = request.image
        if "," in raw_b64:
            raw_b64 = raw_b64.split(",", 1)[1]
        
        image_bytes = base64.b64decode(raw_b64)
        if len(image_bytes) == 0:
            raise HTTPException(status_code=400, detail="Decoded image data is empty.")

        result = analyze_roof_image(image_bytes, request.filename or "roof.jpg")
        return {
            "success": True,
            "message": "Roof photo analyzed successfully using Keras vision model.",
            "data": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Base64 roof analysis failed: {str(e)}")

@router.get("/health")
async def roof_health():
    return {
        "status": "ready",
        "engine": "Keras MobileNetV2 Vision Extractor",
        "supportedFormats": ["JPG", "PNG", "WEBP", "TIFF"]
    }
