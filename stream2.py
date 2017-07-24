import base64
import cv2
import time
from threading import Thread

class Stream(Thread):
	def __init__(self, ws):
		self.flag = [True]
		self.ws = ws
		Thread.__init__(self, name=Stream.__name__)
	
	def run(self):
		self.camera = cv2.VideoCapture(0)
		
		while self.flag[0]:
			rval, frame = self.camera.read()
		
			if frame is None:
				self.camera.release()
				self.camera = cv2.VideoCapture(0)
				continue
				
			rvel, jpeg = cv2.imencode('.jpg', frame)
			encode_string = base64.b64encode(jpeg)
			self.ws.write_message(encode_string)
			time.sleep(0.05)
		self.camera.release()
		print ("terminated")
	
	def stop(self):
		self.flag[0] = False
