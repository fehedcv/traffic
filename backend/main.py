from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from ultralytics import YOLO
from datetime import datetime
import cv2
import os
import random
import asyncio
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
templates = Jinja2Templates(directory="templates")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = YOLO("best.pt")
vehicle_classes = [0, 1, 2, 3, 4, 5]

routes = [
    "edarikode-chankuvetty",
    "chankuvetty-kottakkal",
    "kottakkal-puthur",
    "chankuvetty-palathara",
    "mammalippadi-edarikode",
    "palathara-randathani",
    "kozhichena-edarikode",
    "puthur-cherukunn"
]

traffic_data = {
    route: {
        "level": "unknown",
        "count": 0,
        "source_image": None,
        "time": None
    } for route in routes
}

def get_traffic_level(count):
    if count > 15:
        return "high"
    elif count > 6:
        return "moderate"
    else:
        return "low"

def process_image_for_route(route_name: str):
    image_files = [f for f in os.listdir("images") if f.lower().endswith((".jpg", ".jpeg", ".png"))]
    if not image_files:
        return

    selected_image = os.path.join("images", random.choice(image_files))
    image = cv2.imread(selected_image)

    if image is None:
        return

    results = model(image)[0]
    count = sum(1 for box in results.boxes if int(box.cls) in vehicle_classes)
    level = get_traffic_level(count)

    traffic_data[route_name] = {
        "level": level,
        "count": count,
        "source_image": os.path.basename(selected_image),
        "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "route":route_name
    }
    print(f"{traffic_data}[{route_name}] = lvl : {level}, cnt: {count} ,")
@app.on_event("startup")
async def start_background_processing():
    async def loop_routes():
        while True:
            for route in routes:
                process_image_for_route(route)
                await asyncio.sleep(13)  # Wait 20 seconds before processing the next route
    asyncio.create_task(loop_routes())

@app.get("/traffic/{route_name}")
def get_traffic(route_name: str):
    if route_name not in traffic_data:
        return {"error": "Invalid route"}
    return traffic_data[route_name]

@app.get("/", response_class=HTMLResponse)
async def show_map(request: Request):
    return templates.TemplateResponse("map.html", {"request": request})


@app.get("/traffic-summary")
def traffic_summary():
    return {
        route: {
            "level": data["level"],
            "count": data["count"],
            "last_updated": data["time"]
        } for route, data in traffic_data.items()
    }
