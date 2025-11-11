import os
from typing import Optional
from fastapi import FastAPI, UploadFile, File, Form, responses
from backend_server.ai_modules.load_and_store_data import load_and_store_data

app = FastAPI()
root_dir = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIRECTORY = os.path.join(root_dir, "uploaded_files")
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

@app.get("/")
async def home():
    return {"message": "Welcome to the SquadBrain Backend Server!"}

@app.post("/v1/upload")
async def upload_file(file: Optional[UploadFile] = File(None), url: Optional[str] = Form(None)):
    try:
        if not url and not file:
            return responses.JSONResponse(status_code=400, content={"message": "Either file or url must be provided"})
        if not url:
            file_path = os.path.join(UPLOAD_DIRECTORY, file.filename)
            print(file_path, file.filename)
            with open(file_path, "wb") as buffer:
                while content := await file.read(1024 * 1024):
                    buffer.write(content)
            file_type = file.filename.split(".")[-1]
            data_loaded = load_and_store_data(file_path, file_type)
        else:
            print(f"Loading data from URL: {url}")
            data_loaded = load_and_store_data(url, "url")
        if not data_loaded:
            return responses.JSONResponse(status_code=500, content={"message": "Failed to load and store the data"})

    except Exception:
        return responses.JSONResponse(status_code=500, content={"message": "There was an error uploading the file"})
    finally:
        if file:
            await file.close()
        
    return responses.JSONResponse(status_code=200, content={"message": f"Successfully uploaded and stored {file.filename if file else url}"})