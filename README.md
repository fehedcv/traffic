
# Kottakkal Smart Traffic Management System

An intelligent web-based traffic monitoring and routing application tailored for Kottakkal, Kerala. This project integrates real-time traffic visualization, AI-powered surveillance analysis, and responsive route planning to support emergency services, commuters, and civic authorities.

![ScreenShot](/assets/page1.png)


![ScreenShot](/assets/page2.png)



![ScreenShot](/assets/page3.png)


![ScreenShot](/assets/page4.png)



![ScreenShot](/assets/page5.png)


## Features
**🔍 Smart Traffic Intelligence**

🎥 Automatic Traffic Analysis using AI + CCTV Feeds
Detects congestion, accidents, unusual vehicle patterns, and roadblocks in real time using live surveillance footage.

**🚧 Incident Reporting System**

Detects and reports accidents, road construction, waterlogging, and more—automatically or via user/admin input.

**🔄 Dynamic Reroute Finder**

Suggests alternate low-traffic routes intelligently when congestion or incidents are detected.

**🗺️ Interactive Mapping System**

- 🐍 Snake Path Animation
- Simulates live vehicle movement along a polyline route.

- 📍 Manual & Smart Routing
    Click to set start and end points, or allow the system to auto-suggest optimal paths.

- 📢 Live News Marquee
    Scrolls live traffic alerts, emergency updates, and system messages.

- 🧭 Mobile-Responsive UI
    Built with React and Leaflet for full cross-device compatibility.
## ⚙️ Tech Stack

- Layer	Technology Used
- Frontend	React.js, Leaflet, Tailwind CSS
- Mapping	OpenStreetMap, leaflet.heat, snake plugin
- AI Models	YOLOv8(Ultralitics), OpenCV (for surveillance AI)
- Backend	FastAPI
- Deployment	Ngrok


## Deployment

To deploy this project run


Clone the Project
```bash
  git clone https://github.com/fehedcv/traffic.git
```

change into directory
```bash
cd kottakkal-traffic-system

```

 Install Dependencies
 ```bash 
 npm install
```
 Run Locally

 ```bash 
 npm run dev
```

Run the back-end
```bash
  uvcorn app:main --reaload
```


# 👨‍💻 Contributors

- *[FahadCv](https://github.com/fehedcv)*
- *[Parveen MT](https://github.com/ReverseEngineeringDude)*
- *[Amna Parambat](https://github.com/Amna-parambat)*
- *[Mufeeda Moideenkutty](https://github.com/mufeeda-moideen)*

## License

[MIT](https://choosealicense.com/licenses/mit/)

