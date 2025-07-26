import cv2
from fastapi import FastAPI
from ultralytics import YOLO
from typing import Dict
import os

app = FastAPI()
model = YOLO("best.pt")

VEHICLE_CLASSES = ["car", "motorbike", "bus", "truck", "bicycle"]
traffic_data: Dict[str, str] = {}

VIDEO_DIR = "videos"  # folder containing place videos

def classify_traffic(count):
    if count < 5:
        return "low"
    elif 5 <= count < 15:
        return "moderate"
    else:
        return "high"

def process_video_for_place(place: str):
    path = os.path.join(VIDEO_DIR, f"{place}.mp4")
    if not os.path.exists(path):
        return None

    cap = cv2.VideoCapture(path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    interval = int(fps * 5)
    frame_idx = 0
    total_vehicle_count = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        if frame_idx % interval == 0:
            results = model(frame)[0]
            count = 0
            for box in results.boxes:
                cls = int(box.cls[0])
                label = model.names[cls]
                if label in VEHICLE_CLASSES:
                    count += 1
            total_vehicle_count += count

        frame_idx += 1

    cap.release()
    return classify_traffic(total_vehicle_count)

@app.get("/traffic/{place}")
def get_traffic(place: str):
    place = place.lower()
    status = process_video_for_place(place)
    if status:
        traffic_data[place] = status
        return {"place": place, "traffic_level": status}
    return {"place": place, "traffic_level": "unknown", "error": "Video not found"}
