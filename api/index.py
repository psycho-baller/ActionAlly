from fastapi import FastAPI
from .obsidian_loader import get_all_notes

app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

@app.get("/api/py/healthcheck")
def healthchecker():
    return {"status": "success", "message": "Integrated FastAPI Framework with Next.js and chrome extension successfully!"}

# Works only in my machine coz I have the notes in my machine
@app.get("/api/py/notes")
async def notes():
  return get_all_notes()