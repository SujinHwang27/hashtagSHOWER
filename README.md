# #SHOWER - Smart Water Monitoring System

## About the Project

#SHOWER(hashtag-SHOWER) is a Smart Water Monitoring System that transforms water conservation into an engaging daily habit. 
This project was developed for the Girls in ICT 2022 competition at Ericsson-LG, Seoul, South Korea.

### Deliverables
[Initial research, problem statement, and conceptual solution design](Girls_In_ICT_2022_SHOWER_PRELIMINARY.pdf)

[Technical implementation details and system architecture](Girls_In_ICT_2022_SHOWER_SEMI_FINAL.pdf)

### The Problem

According to the US EPA:
- The average daily water consumption of every household is 1135L
- 70% of this is indoor usage
- 63% of indoor water usage occurs in the bathroom
- 120L of water is consumed per shower

While overall indoor water usage reduced by 22% between 1999-2016, the Water Research Foundation found that the reduction in shower, faucet, and bathtub water usage remained at 0%.

### Our Solution

#SHOWER aims to connect individual behavior to collective sustainability through real-time feedback and community networking. By making water conservation visible, engaging, and social, we transform environmental responsibility into a daily habit users are excited about.

## Features

### Core Features
- **Real-time water usage monitoring** using ultrasonic and temperature sensors
- **Goal setting and progress tracking** based on Locke's Goal-Setting Theory
- **Personal history and statistics** to visualize individual water consumption
- **Community statistics** to create a sense of collective impact
- **Smart suggestions** for water conservation through pop-up notifications

### Future Extensions
- Water temperature monitoring for energy conservation
- Community building features
- Recommendation systems for water-saving peers
- Integration with wearable devices
- Expanded IoT capabilities

## Technical Architecture

### Hardware Components
- Raspberry Pi
- Ultrasonic sensor (water level measurement)
- Temperature sensor
- Water container (for demonstration purposes)

### Software Architecture
The system follows a containerized microservices architecture:

```
Infrastructure
├── Raspberry Pi
│   ├── Docker: Container Engine
│   │   ├── MySQL Container
│   │   └── NodeJS Container
│   └── Sensors
│       ├── Ultrasonic Sensor
│       └── Temperature Sensor
└── Client
    └── Web Application
```

### Technology Stack
- **Frontend**: React
- **Backend**: Node.js with Express
- **Database**: MySQL
- **Containerization**: Docker
- **Sensor Integration**: Node.js

## Setup

### Prerequisites
- Raspberry Pi
- Ultrasonic sensor
- Temperature sensor
- Docker installed on Raspberry Pi
- Node.js and npm

## System Flow

1. Ultrasonic and temperature sensors collect real-time data
2. Raspberry Pi processes this data and sends it to the server
3. Node.js server stores the data in MySQL database
4. React frontend displays the data in various formats:
   - Real-time water usage and temperature
   - Goal achievement charts
   - Monthly reports
   - Community statistics
   - Green contribution metrics

## Project Vision

#SHOWER aims to create a green community where people across the globe connect under the common goal of sustainability. We believe that when sustainable actions are enjoyable and visible, they become habits and lifestyles.

Our vision extends beyond just water monitoring in showers. The same approach can be applied to various areas of resource conservation, especially when combined with wearable devices and IoT technology.


## Contributors

- Suin Lee
- Hyunyoung Oh
- Sujin Hwang

## Acknowledgments

- Girls in ICT 2022 Hackathon by ERICSSON in Seoul, South Korea.
