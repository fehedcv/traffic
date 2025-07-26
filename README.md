# 🚦 Kottakkal Smart Traffic Management System

An intelligent, AI-powered, real-time traffic monitoring and routing application tailored for **Kottakkal, Kerala**. This project integrates **live traffic visualization**, **CCTV-based surveillance analysis**, and **dynamic rerouting** to support emergency services, public transport, and daily commuters.

> Built with React, Leaflet, FastAPI, and AI models like YOLOv8 – it's your complete smart traffic assistant.

---

![Screenshot 1](/assets/page1.jpeg)
![Screenshot 2](/assets/page2.jpeg)
![Screenshot 3](/assets/page3.jpeg)
![Screenshot 4](/assets/page4.jpeg)
![Screenshot 5](/assets/page5.jpeg)

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Deployment](#deployment)
- [Contributors](#-contributors)
- [License](#license)

---

## 🚀 Features

### 🔍 Smart Traffic Intelligence

- 🎥 **Automatic Traffic Analysis using AI + CCTV Feeds**  
  Detects traffic congestion, accidents, unusual vehicle behavior, and roadblocks using real-time surveillance camera streams with AI models like YOLOv8 and OpenCV.

### 🚧 Incident & Hazard Reporting

- 🛠️ Detects & reports:
  - Accidents  
  - Road constructions  
  - Waterlogging  
  - Crowd gatherings  
- Supports both automatic (via AI) and manual (admin/user) input.

### 🔄 Dynamic Re-route Finder

- 🚗 Suggests optimal alternate routes when congestion or incidents are detected.
- Perfect for **ambulances**, **fire services**, and **VIP movement**.

### 🗺️ Interactive Map Features

- 🐍 **Snake Path Animation**  
  Simulates live vehicle movement along selected routes with animated polyline drawing.

- 📍 **Manual & Smart Routing**  
  - Click-to-select start/end points  
  - Or let the system auto-suggest best path via OSRM

- 🔥 **Traffic Heatmap**  
  Live traffic intensity visualized using `leaflet.heat`.

- 📢 **Live News Marquee**  
  Displays traffic alerts, emergency notices, and other updates in real-time.

- 📱 **Mobile-Responsive UI**  
  Seamlessly works across desktops, tablets, and mobile phones.

---

## ⚙️ Tech Stack

| Layer      | Technology Used                            |
|------------|---------------------------------------------|
| Frontend   | React.js, Leaflet.js, Tailwind CSS          |
| Mapping    | OpenStreetMap, Leaflet Heatmap, Snake Plugin |
| AI Models  | YOLOv8 (Ultralytics), OpenCV (Python)       |
| Backend    | FastAPI (Python)                            |
| Deployment | Ngrok (for dev tunneling), GitHub           |

---

## 🛠️ Installation

### Clone the Repository

```bash
git clone https://github.com/fehedcv/traffic.git
cd kottakkal-traffic-system

Install Frontend Dependencies

npm install

Run the Frontend

npm run dev

Start the Backend API (FastAPI)

uvicorn app:main --reload

> Ensure your Python virtual environment is activated and requirements.txt is installed (pip install -r requirements.txt).




---

👨‍💻 Contributors

<table>
  <tr>
    <td><a href="https://github.com/fehedcv"><img src="https://avatars.githubusercontent.com/fehedcv" width="60px;" alt=""/><br /><sub><b>Fahad Cv</b></sub></a></td>
    <td><a href="https://github.com/ReverseEngineeringDude"><img src="https://avatars.githubusercontent.com/ReverseEngineeringDude" width="60px;" alt=""/><br /><sub><b>Parveen MT</b></sub></a></td>
    <td><a href="https://github.com/Amna-parambat"><img src="https://avatars.githubusercontent.com/Amna-parambat" width="60px;" alt=""/><br /><sub><b>Amna Parambat</b></sub></a></td>
    <td><a href="https://github.com/mufeeda-moideen"><img src="https://avatars.githubusercontent.com/mufeeda-moideen" width="60px;" alt=""/><br /><sub><b>Mufeeda Moideenkutty</b></sub></a></td>
  </tr>
</table>
---

📝 License

This project is licensed under the MIT License.


---