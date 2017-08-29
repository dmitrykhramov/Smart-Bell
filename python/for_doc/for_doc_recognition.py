def face_comparison(visitor_face):
	
	__id = 0
	
	with open('faces_encodings.txt','r') as f:
		try:
			image_face_encoding = pickle.load(f)
		except EOFError:
			return 0
	
	s_time = time.time()
	
	face_locations = []
	face_encodings = []
	
	face_locations = face_recognition.face_locations(visitor_face)
	face_encodings = face_recognition.face_encodings(visitor_face, face_locations)
	
	for i in range(len(image_face_encoding)):
		for face_encoding in face_encodings:
			if (len(image_face_encoding) == 2 and len(image_face_encoding[0]) == 1):
				ret, encoding_data = image_face_encoding
				match = face_recognition.compare_faces([encoding_data], face_encoding)
			else:	
				ret, encoding_data = image_face_encoding[i]
				match = face_recognition.compare_faces([encoding_data], face_encoding)
			
			if match[0].all() == True:
				__id = ret
		if __id != 0:
			print(time.time()-s_time)
			break
	return __id
