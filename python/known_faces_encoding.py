import face_recognition
import numpy as np
from pymongo import MongoClient
import time
import cv2
import pickle
import os
with open('faces_encodings.txt','w'):
	pass
'''
with open('faces_encodings.txt','r') as f:
	a = pickle.load(f)
	#print(a)
	print(np.shape(a))
	print(type(a))
'''
#cam = cv2.VideoCapture(0)
#ret, frame = cam.read()

#small_image = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
#image_face_encoding = face_recognition.face_encodings(small_image)[0]

#with open('faces_encodings.txt','a+') as f:
#	pickle.dump(image_face_encoding, f)

#with open('faces_encodings.txt','rb') as f:
#	a = pickle.load(f)
#	print(a)
#	print(np.shape([a]))
	
#a = np.vstack((a,image_face_encoding))
#print(a)
#print(np.shape(a))	

#with open('faces_encodings.txt','wb') as f:
#	pickle.dump(a,f)	
	
	
