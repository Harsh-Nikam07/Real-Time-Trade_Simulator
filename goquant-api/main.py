from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from state import get_latest_tick, update_tick

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/latest-tick")
def fetch_latest_tick():
    return get_latest_tick()

@app.post("/update-tick")
async def receive_tick(request: Request):
    data = await request.json()
    update_tick(data)
    return {"status": "received"}
