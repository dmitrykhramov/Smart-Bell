import base64
import cv2
import time
from threading import Thread
import RPi.GPIO as GPIO
import collect
import visit
import os
#import save
#from pymongo import MongoClient

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(17, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(27, GPIO.OUT)

class Stream(Thread):
	'''
	# Camera stream
	This class is to manage all matters related to stream of usb camera. We reads the camera and get frame in the infinite loop.
	If web browser opens, we would send the frame to web browser through web socket.
	If you click 'make photo' button which is for collecting visitor's face, we would make folder named visitor's id for saving the frame and send the frame which is a visitor's face to collect.py.
	If visitor pushes a button, we would send the frame which is a visitor's face to visit.py
	'''
	def __init__(self):
		self.flag = [False]
		self.capture_flag = [False]
		#self.ws = ws
		self.clients = []
		Thread.__init__(self, name=Stream.__name__)
		
	def run(self):
		
		self.camera = cv2.VideoCapture(0)
		
		prev_input = 1
		
		#mongo_db = MongoClient('localhost',27017)
		#db = mongo_db.smartbell.visitors		
		
		while True:
			# Read camera and get frame
			rval, frame = self.camera.read()
		
			if frame is None:
				self.camera.release()
				self.camera = cv2.VideoCapture(0)
				continue
			
			# Send camera stream to web
			if self.flag[0]:
				rvel, jpeg = cv2.imencode('.jpg', frame)
				encode_string = base64.b64encode(jpeg)
				for client in self.clients:
					client.write_message(encode_string)
			
			# A visitor pushes button
			but = GPIO.input(17)
			if(not prev_input and but):
				# It affects dlib speed. If frame size is small, dlib would be faster than normal size frame
				small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
				visit.visit(small_frame)
				for client in self.clients:
					client.write_message("log")
			prev_input = but
			time.sleep(0.05)
			
			# Click makephotos on web browser
			if self.capture_flag[0] == True:

				enough_image = collect.make_photo(frame)

				if enough_image == "success":
					print("Success to register")
				else:
					print("Fail to register")
				for client in self.clients:
					client.write_message(enough_image)

				self.capture_flag[0] = False
	
		self.camera.release()
	
	def change_capture_flag(self):
		self.capture_flag[0] = True

	def change_socket_flag(self):
		self.flag[0] = not self.flag[0]
	
	def add_client(self, newclient):
		self.clients.append(newclient)
		
	def remove_client(self, client):
		self.clients.remove(client)
		
		
	
