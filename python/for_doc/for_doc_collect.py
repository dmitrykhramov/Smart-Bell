def collect_picture(frame, folder_name, file_name, __id):
	
	small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
	face_locations = face_recognition.face_locations(small_frame)
	
	if len(face_locations) == 0:
		print("face detection fails")
		return False
	
	else:
		file_name_path = folder_name + file_name
		cv2.imwrite(file_name_path, frame)
		
		image = face_recognition.load_image_file('pics/'+str(__id)+'/img0.jpg')
		small_image = cv2.resize(image, (0, 0), fx=0.25, fy=0.25)
		image_face_encoding = face_recognition.face_encodings(small_image)[0]
		data = [[__id],image_face_encoding]
		
		if os.path.getsize('faces_encodings.txt') == 0:
			with open('faces_encodings.txt','wb') as f:
				pickle.dump(data,f)
		else:
			with open('faces_encodings.txt','rb') as f:
				known_faces_encoding_data = pickle.load(f)
			known_faces_encoding_data = np.vstack((known_faces_encoding_data,data))
			with open('faces_encodings.txt','wb') as f:
				pickle.dump(known_faces_encoding_data, f)

		print("face detection successes")
		return True
