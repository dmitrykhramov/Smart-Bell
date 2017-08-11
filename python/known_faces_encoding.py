import face_recognition
import numpy as np
from pymongo import MongoClient
import time
import cv2
import pickle
import os
from bson.objectid import ObjectId

client = MongoClient('localhost',27017)
db = client.smartbell.visitors
a = '598c31c5dafdd80806e7044a'
b = [ObjectId(a)]
print(b)
print(b[0])
#visitors = db.find_one({"_id": ObjectId(a)})
#print(visitors['__v'])


#with open('faces_encodings.txt','r') as f:
#	a = pickle.load(f)
#	print(a)
#with open('faces_encodings.txt','w'):
#	pass
'''
client = MongoClient('localhost',27017)
db = client.smartbell.visitors
visitors = db.find()
__id = []

for cur in visitors:
	__id.append(cur['_id'])

img = face_recognition.load_image_file('pics/'+str(__id[0])+'/img0.jpg')
small_img = cv2.resize(img, (0, 0), fx=0.25, fy=0.25)
img_face_encoding = face_recognition.face_encodings(small_img)[0]

data = [[__id[0]],img_face_encoding]
with open('faces_encodings.txt','w') as f:
	pickle.dump(data,f)
	
image = face_recognition.load_image_file('pics/'+str(__id[1])+'/img0.jpg')
small_image = cv2.resize(image, (0, 0), fx=0.25, fy=0.25)
image_face_encoding = face_recognition.face_encodings(small_image)[0]
dataa = [[__id[1]],image_face_encoding]

with open('faces_encodings.txt','r') as f:
	already_data = pickle.load(f)
	print(already_data)
already_data = np.vstack((already_data, dataa))
print(already_data)

with open('faces_encodings.txt','w') as f:
	pickle.dump(already_data,f)
	
imag = face_recognition.load_image_file('pics/'+str(__id[2])+'/img0.jpg')
small_imag = cv2.resize(imag, (0, 0), fx=0.25, fy=0.25)
imag_face_encoding = face_recognition.face_encodings(small_imag)[0]
dataaa = [[__id[2]],imag_face_encoding]

with open('faces_encodings.txt','r') as f:
	already_data = pickle.load(f)
	print(already_data)
already_data = np.vstack((already_data, dataaa))
print(already_data)

with open('faces_encodings.txt','w') as f:
	pickle.dump(already_data,f)



#with open('faces_encodings.txt','r') as f:
#	a = pickle.load(f)
#b = a[0]
#c = a[1]
#d = a[2]


#data = [[__id[0]],b]
#print(data)
#print(np.shape(data))
#ret, dat = data
#print(dat)

#image = face_recognition.load_image_file('pics/'+str(__id[0])+'/img0.jpg')
#small_image = cv2.resize(image, (0, 0), fx=0.25, fy=0.25)
#image_face_encoding = face_recognition.face_encodings(small_image)[0]

#print([image_face_encoding])

#cam = cv2.VideoCapture(0)
#ret, frame = cam.read()

#small_face = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
#face_encodings = face_recognition.face_encodings(small_face)
#print(face_encodings)
#print([image_face_encoding])
#match = face_recognition.compare_faces(image_face_encoding, face_encodings)
#make text file empty
#with open('faces_encodings.txt','w'):
#	pass

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
'''
