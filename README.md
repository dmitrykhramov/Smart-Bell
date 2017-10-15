# Face recognition security system

- Video demonstration of working application is available on the following link: https://youtu.be/qb1KZ4enTIA

The main goal of creating such a system is to make security as convenient as possible. Granting access to various facilities and areas inside them without keys, cards, or passwords can make the presence of a security guard or continuous in-person monitoring obsolete. At the same time, it can eliminate inconvenience caused by carrying keys and paper ID.

Smart security is the future, and with the help of the technology available today, an affordable intelligent security system is within our reach. This application is a low-cost, adaptive, and extensible surveillance system focused on identifying visitors. It can be integrated into an existing alarm system or be paired with a lock. It operates in real time and can distinguish between someone who is in the face database and someone who is not (a potential intruder).

## System architecture 

![1](https://user-images.githubusercontent.com/18744749/31586280-737f11b6-b1d7-11e7-8e09-c4c9bff7cd9f.jpg)

## Application logic

The system relies on a facial recognition technique and does it in real time. User simply walk up to the door that he/she wants to open or the room he/she wants to enter and presses the button: the system will either recognize user as a trusted visitor and let the user in, or it will identify user as a stranger and deny access.

The system, for the most part, is looking for faces. To get clearance, each user needs a profile picture that the algorithm can analyze for unique features. Then, whenever the same user is trying to get into a building or area, the system steps in.  If it recognizes that face, the LED blinks once and that person is cleared for entry or twice if access for this person is forbidden or no match is found within visitors’ database.

The core of the application is face recognition algorithm which first detects a face, then encodes face features and save them in a text file to be later compared alongside with another visitors’ face features to any new person trying to access a building or a room. 

![2](https://user-images.githubusercontent.com/18744749/31586324-f0b0e8f8-b1d7-11e7-902c-a526219f1d2f.jpg)

## Application features

- Face recognition
- Managing visitors 
    - add/delete visitor
    - change the access right for visitor
    - add visitor's photo from camera or from local storage
- History of entered visitors
- Authentication for administrator
- Video stream to web application
- Email notifications of entering the place
- Blocking the door via email link in case of cheating

![3](https://user-images.githubusercontent.com/18744749/31586456-fa48f930-b1d9-11e7-9839-93302146da40.jpg)

## System installation

- Software requirements
  - Download the code from GitHub repository
$ git clone https://github.com/dmitrykhramov/Smart-Bell.git 

  - Install MongoDB
Available for download from https://www.mongodb.com/. 

  - Install Python libraries
$ pip install -r requirements.txt

  - Install OpenCV
  
  Version 2.4.9.1 is available for download from: https://github.com/opencv/opencv.
  
  Guidelines for Raspberry Pi installation: https://www.pyimagesearch.com/2016/04/18/install-guide-raspberry-pi-3-raspbian-jessie-opencv-3/

 - Install DLIB library
 
 Guidelines for Raspberry Pi installation: https://www.pyimagesearch.com/2017/05/01/install-dlib-raspberry-pi/ 

- Hardware requirements
  - RaspberryPi 
  - USB camera 
  - Breadboard 
  - Button
  - LED

- Install node modules

Install node modules for NodeJS in server folder 
    - $ ~/Smart-bell/server $ npm install

Install node modules for ReactJS in frontend folder 
    - $ ~/Smart-bell/frontend $ npm install

- Starting program

Start MongoDB database
    - $ ~ sudo service mongodb start 

Start NodeJS server 
    - $ ~/Smart-bell/server $ npm run dev

Start Python application 
    - $ ~/Smart-bell/python $ python usbcamera.py

Start ReactJS application 
    - $ ~/Smart-bell/frontend $ npm start

Open ‘localhost:8080’ in the browser.

## Next steps
  -	Deploying web application and database to the cloud. It will improve the performance of the python application running on RaspberryPi and will make web application available from everywhere.  
  -	Improving the security of the face recognition algorithm, that it could not be cheated with pictures.
  -	Replace normal camera with 3D camera.
  -	Implement the door locker opening mechanism via Bluetooth.

