def delete_face(visitor_id):
	
	with open('faces_encodings.txt','r') as f:
		known_faces_encoding = pickle.load(f)
		
	file_length = len(known_faces_encoding)
	
	delete_flag = False
	
	if (file_length == 2 and len(known_faces_encoding[0]) == 1) and (file_length == 1):
		__id, encodings = known_faces_encoding
		if __id == [ObjectId(visitor_id)]:
			delete_flag = True
			print("Delete {}".format(__id))
			with open('faces_encodings.txt', 'w'):
				pass
				
	else:
		for i in range(file_length):
			__id, encodings = known_faces_encoding[i]
			if __id == [ObjectId(visitor_id)]: 
				delete_flag = True
				print("Delete {}".format(__id))
				known_faces_encoding = np.delete(known_faces_encoding, (i),0)
				with open('faces_encodings.txt','w') as wf:
					pickle.dump(known_faces_encoding, wf)
				break
	
	return delete_flag

			

