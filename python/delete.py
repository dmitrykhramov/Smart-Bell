from bson.objectid import ObjectId
import pickle
import numpy as np

def delete_face(face_id):
	print("delete start")
	with open('faces_encodings.txt','r') as f:
		known_faces_encoding = pickle.load(f)
	
	file_length = len(known_faces_encoding)
	
	exist_id = False
	
	if file_length == 2 and len(known_faces_encoding[0]) == 1:
		__id, encodings = known_faces_encoding
		if __id == [ObjectId(face_id)]:
			exist_id = True
			print("Delete {}".format(__id))
			with open('faces_encodings.txt', 'w'):
				pass

	else:
		for i in range(file_length):
			__id, encodings = known_faces_encoding[i]
			if __id == [ObjectId(face_id)]:
				exist_id = True
				print("Delete {}".format(__id))
				known_faces_encoding = np.delete(known_faces_encoding, (i),0)
				print(known_faces_encoding)
				with open('faces_encodings.txt','w') as wf:
					pickle.dump(known_faces_encoding, wf)
	
	if exist_id == 0:
		print("Cannot find such id")
	
	return exist_id

			

