import base64
import cv2
import time
from threading import Thread
import RPi.GPIO as GPIO
from datetime import datetime
import oscd ..
import collect
from makephoto import MakePhotos

#makephotos_thread = None

GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.IN, pull_up_down=GPIO.PUD_UP)

class Stream(Thread):
	def __init__(self, ws):
		self.flag = [True]
		self.capture_flag = [False]
		self.ws = ws
		#self.flodername = 1
		Thread.__init__(self, name=Stream.__name__)
		
	def run(self):
		self.camera = cv2.VideoCapture(0)
		
		prev_input = 1
		
		while self.flag[0]:
			rval, frame = self.camera.read()
			
			if frame is None:
				self.camera.release()
				self.camera = cv2.VideoCapture(0)
				continue
			
			rvel, jpeg = cv2.imencode('.jpg', frame)
			encode_string = base64.b64encode(jpeg)
			self.ws.write_message(encode_string)
			
			but = GPIO.input(17)
			
			if(not prev_input and but):
				print(but)
			
			prev_input = but
			time.sleep(0.05)
			
			if self.capture_flag[0] == True:
				path = 'pics/' + str(datetime.now()) #str(self.foldername[0])
				if not os.path.exists(path):
					os.makedirs(path)
				count = 0
				while count < 15:
					file_name = '/img' + str(datetime.now()) + '.jpg'
					success, capture_img = self.camera.read()
					small_frame = cv2.resize(capture_img, (0, 0), fx=0.25, fy=0.25)
					if collect.collect_pictures(capture_img, path, file_name):
						count += 1
						print("finish")
					time.sleep(1)
				self.capture_flag[0] = False
		self.camera.release()
	
	def change_flag(self):
		self.capture_flag[0] = True

	def stop(self):
		self.flag[0] = False
		
	'''	
class Stream(Thread):
	def __init__(self, ws):
		self.flag = [True]
		self.capture_flag = [False]
		self.ws = ws
		#self.flodername = 1
		Thread.__init__(self, name=Stream.__name__)
		
	def run(self):
		self.camera = cv2.VideoCapture(0)
		
		prev_input = 1
		
		while self.flag[0]:
			rval, frame = self.camera.read()
			
			if frame is None:
				self.camera.release()
				self.camera = cv2.VideoCapture(0)
				continue
			
			rvel, jpeg = cv2.imencode('.jpg', frame)
			encode_string = base64.b64encode(jpeg)
			self.ws.write_message(encode_string)
			'''
			but = GPIO.input(17)
			
			if(not prev_input and but):
				print(but)
			
			prev_input = but
			'''
			time.sleep(0.05)
			
			if self.capture_flag[0] == True:
				global makephotos_thread
				makephotos_thread = MakePhotos(self)
				makephotos_thread.start()
				self.capture_flag[0] = False
				
		self.camera.release()
	
	def change_flag(self):
		self.capture_flag[0] = True

	def stop(self):
		self.flag[0] = False
'''
