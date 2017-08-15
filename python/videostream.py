import base64
import cv2
import time
from threading import Thread
import RPi.GPIO as GPIO
import os
import collect
from pymongo import MongoClient
import recognition
import face_recognition
from bson.objectid import ObjectId

GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.IN, pull_up_down=GPIO.PUD_UP)

class Stream(Thread):
	def __init__(self):
		self.flag = [False]
		self.capture_flag = [False]
		#self.ws = ws
		self.clients = []
		self.foldername = []
		Thread.__init__(self, name=Stream.__name__)
		
	def run(self):
		self.camera = cv2.VideoCapture(0)
		
		prev_input = 1
		
		mongo_db = MongoClient('localhost',27017)
		db = mongo_db.smartbell.visitors		
		
		while True:
			rval, frame = self.camera.read()
			
			if frame is None:
				self.camera.release()
				self.camera = cv2.VideoCapture(0)
				continue
			
			if self.flag[0]:
				rvel, jpeg = cv2.imencode('.jpg', frame)
				encode_string = base64.b64encode(jpeg)
				for client in self.clients:
					client.write_message(encode_string)
			
			#Push physical button
			but = GPIO.input(17)
			
			if(not prev_input and but):
				print(but)
				small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
				#exception : if not detect face, than cause error.
				if len(face_recognition.face_locations(small_frame)) == 0:
					print("Cannot detect face. Try again")
					
				else:
					__id = recognition.face_comparison(small_frame)
					if __id == 0:
						print("Does not register")
					else:
						print("I see someone id {}!".format(__id))
						#valid = db.find_one({"_id": ObjectId(__id[0])})
						#if valid['access'] == 0:
						#	print("Available face, open")
						#else:
						#	print("Unavailable face, close")
			prev_input = but
			time.sleep(0.05)
			
			#Click make photos button on web browser
			if self.capture_flag[0] == True:
				#Get last _id from mongodb
				visitors = db.find_one(sort=[('_id',-1)])
				__id = visitors['_id']
				path = 'pics/' + str(__id)
				if not os.path.exists(path):
					os.makedirs(path)
			
				file_name = '/img0.jpg'
				enough_image = False
				while enough_image == False:
					success, capture_img = self.camera.read()
					enough_image = collect.collect_picture(capture_img, path, file_name, __id)

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
		
		
	
