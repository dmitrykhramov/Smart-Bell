import face_recognition
import numpy as np
from pymongo import MongoClient
import time
import cv2
import pickle
#import known_faces_encoding

def face_comparison(frame):
	
	__id = 0
	
	with open('faces_encodings.txt','r') as f:
		image_face_encoding = pickle.load(f)
	#print(image_face_encoding)
	s_time = time.time()
	face_locations = []
	face_encodings = []
	
	face_encodings = face_recognition.face_encodings(frame)
		
	for i in range(len(image_face_encoding)):
		for face_encoding in face_encodings:
			if len(image_face_encoding) == 2 and len(image_face_encoding[0]) == 1:
				ret, encoding_data = image_face_encoding
				match = face_recognition.compare_faces([[encoding_data]], face_encoding)
			else:	
				ret, encoding_data = image_face_encoding[i]
				match = face_recognition.compare_faces([encoding_data], face_encoding)
			if match:
				#print([encoding_data])
				__id = ret
				print("I see someone id {}!".format(ret))
				print(time.time()-s_time)
		if __id != 0:
			break

	return __id
'''
	face_locations = face_recognition.face_locations(frame)
	face_encodings = face_recognition.face_encodings(frame, face_locations)

	for face_encoding in face_encodings:
		match = face_recognition.compare_faces(image_face_encoding, face_encoding)
		if match[0]:
			valid = True
			print("I see someone")
			
	print(time.time()-s_time)
	return valid

	client = MongoClient('localhost',27017)
	db = client.smartbell.visitors

	visitors = db.find()
	__id = []
	for cur in visitors:
		__id.append(cur['_id'])
	

	#image_face_encoding = known_faces_encoding.known_faces_encoding_()
	
	
	#image_face_encoding = np.loadtxt('faces_encodings.txt')
	s_time = time.time()
	for i in __id:
		# Load a sample picture and learn how to recognize it.
		print("Loading known face image(s)")
		image = face_recognition.load_image_file('pics/'+str(i)+'/img0.jpg')
		
		small_image = cv2.resize(image, (0, 0), fx=0.25, fy=0.25)
		image_face_encoding = face_recognition.face_encodings(small_image)[0]
		
		# Initialize some variables
		face_locations = []
		face_encodings = []

		# Find all the faces and face encodings in the current frame of video
		face_locations = face_recognition.face_locations(frame)
		
		print("Found {} faces in image.".format(len(face_locations)))
		face_encodings = face_recognition.face_encodings(frame, face_locations)

		# Loop over each face found in the frame to see if it's someone we know.
		for face_encoding in face_encodings:
			# See if the face is a match for the known face(s)
			match = face_recognition.compare_faces([image_face_encoding], face_encoding)

			if match[0]:
				valid = True
				
		if valid:
			print("I see someone id {}!".format(i))
			print(time.time()-s_time)
			break

	return valid

#client = MongoClient('localhost',27017)
	
#db = client.smartbell.visitors
	
#visitors = db.find()
#__id = []
#for cur in visitors:
#	__id.append(cur['_id'])
#s_time = time.time()

known_faces = []

#known_faces = np.loadtxt('faces_encodings.txt')

#print(known_faces)
#print(type(known_faces))
#print(np.shape(known_faces))
image = face_recognition.load_image_file('pics/598c1f89dafdd80806e70448/img0.jpg')
image1 = face_recognition.load_image_file('pics/598c1fecdafdd80806e70449/img0.jpg')
	
small_image = cv2.resize(image, (0, 0), fx=0.25, fy=0.25)
a_en = face_recognition.face_encodings(small_image)[0]
small_image1 = cv2.resize(image1, (0, 0), fx=0.25, fy=0.25)
b_en = face_recognition.face_encodings(small_image1)[0]
	
image_face_encoding =[a_en,b_en]
#print(image_face_encoding)
print(type(image_face_encoding))
print(np.shape(image_face_encoding))

known_faces.append(a_en)
known_faces.append(b_en)

if known_faces == image_face_encoding:
	print("same")
else:
	print("differ")

with open('faces_encodings.txt','wb') as writefile:
	pickle.dump(known_faces,writefile)

with open('faces_encodings.txt','rb') as readfile:
	result = pickle.load(readfile)
	#print(result)
	print(type(result))
	print(np.shape(result))

#s_time = time.time()
#face_locations = []
#face_encodings = []
	
#face_locations = face_recognition.face_locations(frame)
	
#face_encodings = face_recognition.face_encodings(frame, face_locations)

#result = face_recognition.compare_faces(image_face_encoding, face_encoding)
#print(result)

for i in __id:
	# Load a sample picture and learn how to recognize it.
	print("Loading known face image(s)")
	image = face_recognition.load_image_file('pics/'+str(i)+'/img0.jpg')
		
	small_image = cv2.resize(image, (0, 0), fx=0.25, fy=0.25)
		
	while True:
		loc = face_recognition.face_locations(small_image)
		print(len(loc))
		if len(loc) !=0:
			print("success")
			break
		
	image_face_encoding = face_recognition.face_encodings(small_image)[0]
	known_faces.append(image_face_encoding)

print(known_faces)
print(np.shape(known_faces))
np.savetxt('faces_encodings.txt',known_faces)

def known_faces_encoding_():

	client = MongoClient('localhost',27017)
	
	db = client.smartbell.visitors
	
	visitors = db.find()
	__id = []
	for cur in visitors:
		__id.append(cur['_id'])
	s_time = time.time()
	
	known_faces = []
	
	for i in __id:
		# Load a sample picture and learn how to recognize it.
		print("Loading known face image(s)")
		image = face_recognition.load_image_file('pics/'+str(i)+'/img0.jpg')
		
		small_image = cv2.resize(image, (0, 0), fx=0.25, fy=0.25)
		
		while True:
			loc = face_recognition.face_locations(small_image)
			print(len(loc))
			if len(loc) !=0:
				print("success")
				break
		
		image_face_encoding = face_recognition.face_encodings(small_image)[0]
		
		known_faces.append({'__id':i, 'face_encoding':image_face_encoding})

	#np.savetxt('faces_encodings.txt',known_faces)
	print(time.time()-s_time)
	#return known_faces
'''

