# Blood Donation Management System - Frontend

The Blood Request module enables hospitals or authorized medical personnel to submit requests for specific blood types when blood is needed for patients. The module records important details such as the requested blood group, number of units required, urgency level, patient information (if applicable), and request date.

Once a request is submitted, it is stored in the database and can be viewed by donors, administrators, or blood bank personnel depending on their access rights. The system helps streamline the process of locating suitable donors and managing blood inventory efficiently.


## Group members
- Marian 
- Safia
- Prince
- Cherop


## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#Features)
- [TechStack](#TechStack)
- [Contributing](#contributing)
- [License](#license)


## Installation
1. Clone the repository:
```bash
 git clone https://github.com/adisacodes/blood-donation-frontend.git
```
- cd blood-donation-frontend

2. Install dependencies:
```bash
 npm install
 ```

## Usage
```
- npm run dev
```

## Features
- Create a new blood request.
- Specify blood group and quantity required.
- Set request urgency (Normal, Urgent, Emergency).
- View all submitted blood requests.
- Update or cancel pending requests.
- Track request status (Pending, Approved, Fulfilled, Rejected).
- Allow administrators to monitor and manage all blood requests.

## Tech Stack
- Python 3.12
- FastAPI
- SQLite
- SQLAlchemy

## Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes.
4. Push your branch: `git push origin feature-name`.
5. Create a pull request.

## License
This project is a school project.