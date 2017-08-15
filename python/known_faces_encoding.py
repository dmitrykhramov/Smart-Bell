import face_recognition
import numpy as np
from pymongo import MongoClient
import time
import cv2
import pickle
import os
from bson.objectid import ObjectId
import delete


#with open('faces_encodings1.txt','w'):
#	pass

#image = face_recognition.load_image_file('pics/5992ce18d1cc3f16c0bc06ee/img0.jpg')
#small_image = cv2.resize(image, (0, 0), fx=0.25, fy=0.25)
# Encode the face as known face
#image_face_encoding = face_recognition.face_encodings(small_image)[0]
#__id = ObjectId('5992ce18d1cc3f16c0bc06ee')
#data = [[__id],image_face_encoding]
#print(data)
#with open('faces_encodings1.txt','w') as f:
#	pickle.dump(data,f)
'''
#delete
client = MongoClient('localhost',27017)
	
db = client.smartbell.visitors
visitors = db.find_one({"_id": ObjectId('5992ce18d1cc3f16c0bc06ee')})
print("delete start")
delete.delete_face(visitors['_id'])
'''
#photo encoding
with open('faces_encodings.txt','w'):
	pass

client = MongoClient('localhost',27017)
	
db = client.smartbell.visitors
visitors = db.find()
__id = []
for cur in visitors:
	__id.append(cur['_id'])

for i in __id:
	image = face_recognition.load_image_file('pics/'+str(i)+'/img0.jpg')
	small_image = cv2.resize(image, (0, 0), fx=0.25, fy=0.25)
	# Encode the face as known face
	image_face_encoding = face_recognition.face_encodings(small_image)[0]
	data = [[i],image_face_encoding]
	if os.path.getsize('faces_encodings.txt') == 0:
		with open('faces_encodings.txt','wb') as f:
			pickle.dump(data,f)
	else:
		with open('faces_encodings.txt','rb') as f:
			known_faces_encoding_data = pickle.load(f)
		known_faces_encoding_data = np.vstack((known_faces_encoding_data,data))
		#print(known_faces_encoding_data)
				
		with open('faces_encodings.txt','wb') as f:
			pickle.dump(known_faces_encoding_data, f)

#finish
'''
with open('5992945b627f2b0cf547c62a.txt','r') as fa:
	b = pickle.load(fa)
	print(b)
with open('5992945b627f2b0cf547c62a1.txt','r') as fa1:
	b1= pickle.load(fa1)
	print(b1)


client = MongoClient('localhost',27017)
	
db = client.smartbell.visitors
	
visitors = db.find()
__id = []
for cur in visitors:
	__id.append(cur['_id'])
s_time = time.time()

frame = face_recognition.load_image_file('pics/'+str(__id[0])+'/img0.jpg')
#small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
#face_locations = face_recognition.face_locations(small_frame)
face_encodings = face_recognition.face_encodings(frame)[0]
print(face_encodings)
data = [[__id[0]],face_encodings]

with open('faces_encodings.txt','wb') as f:
	pickle.dump(data,f)

#time.sleep(2)
frame1 = face_recognition.load_image_file('pics/'+str(__id[1])+'/img0.jpg')
#small_frame1 = cv2.resize(frame1, (0, 0), fx=0.25, fy=0.25)
#face_locations1 = face_recognition.face_locations(small_frame1)
face_encodings1 = face_recognition.face_encodings(frame1)[0]
print(face_encodings1)
data1 = [[__id[1]],face_encodings1]

#time.sleep(2)
with open('faces_encodings.txt','rb') as f:
	known_faces_encoding_data = pickle.load(f)
known_faces_encoding_data = np.vstack((known_faces_encoding_data,data1))
#print(known_faces_encoding_data)
with open('faces_encodings.txt','wb') as f:
	pickle.dump(known_faces_encoding_data, f)

print("start")
ret, image = cam.read()

s_image = cv2.resize(image, (0, 0), fx=0.25, fy=0.25)
face_locations12 = face_recognition.face_locations(s_image)
face_encodings12 = face_recognition.face_encodings(s_image, face_locations12)

for face_encoding123 in face_encodings12:
	match = face_recognition.compare_faces([face_encodings], face_encoding123)
	if match[0]:
		print("I know")
	else:
		print("I dont know")

for face_encoding123 in face_encodings12:
	match = face_recognition.compare_faces([face_encodings1], face_encoding123)
	if match[0]:
		print("I know")
	else:
		print("I dont know")

cam.release()

client = MongoClient('localhost',27017)
	
db = client.smartbell.visitors
	
visitors = db.find()
__id = []
for cur in visitors:
	__id.append(cur['_id'])
s_time = time.time()
	
known_faces = []
	
for i in __id:
'''

#cam = cv2.VideoCapture(0)
#ret, frame = cam.read()

#small_image = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
#image_face_encoding = face_recognition.face_encodings(small_image)[0]

#with open('faces_encodings.txt','r') as f:
#		image_face_encoding = pickle.load(f)
#a, b = image_face_encoding
#print([b])
#img = face_recognition.load_image_file('pics/5991347455b82c082e697c4d/img0.jpg')
#small_frame = cv2.resize(img, (0, 0), fx=0.25, fy=0.25)
#face_encodings = face_recognition.face_encodings(small_frame)
#print([face_encodings])


'''
client = MongoClient('localhost',27017)
db = client.smartbell.visitors
a = '598c31c5dafdd80806e7044a'
b = [ObjectId(a)]
print(b)
print(b[0])
'''
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


#copy from recognition.py

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

