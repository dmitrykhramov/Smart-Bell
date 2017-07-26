import cv2
import time
from threading import Thread
from datetime import datetime
import os
import collect

class MakePhotos(Thread):
	def __init__(self, camera):
		#self.flodername = 1
		self.camera = camera
		Thread.__init__(self, name=MakePhotos.__name__)
		
	def run(self):
		path = 'pics/' + str(datetime.now()) #ObjectId
		if not os.path.exists(path):
			os.makedirs(path)
		count = 0
		while count < 5:
			file_name = '/img' + str(datetime.now()) + '.jpg'
			success, frame = self.camera.read()
			small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
			if collect.collect_pictures(frame, path, file_name):
				count += 1
			time.sleep(1)
