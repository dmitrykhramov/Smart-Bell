from bson.objectid import ObjectId
import pickle
import numpy as np

# Delete visitor

def delete_face(visitor_id):
	
	with open('faces_encodings.txt','r') as f:
		known_faces_encoding = pickle.load(f)
		
	file_length = len(known_faces_encoding)
	
	# This is to check if it deletes visitor
	delete_flag = False
	
	# If only one visitor is registered in 'faces_encodings.txt'
	if file_length == 2 and len(known_faces_encoding[0]) == 1:
		__id, encodings = known_faces_encoding
		if __id == [ObjectId(visitor_id)]:
			delete_flag = True
			print("Delete {}".format(__id))
			with open('faces_encodings.txt', 'w'):
				pass
	# If two or more visitors are registered in 'faces_encodings.txt' 
	else:
		for i in range(file_length):
			__id, encodings = known_faces_encoding[i]
			if __id == [ObjectId(visitor_id)]: 
				delete_flag = True
				print("Delete {}".format(__id))
				# Delete visitor's face encoding in 'faces_encodings.txt' and dump it
				known_faces_encoding = np.delete(known_faces_encoding, (i),0)
				with open('faces_encodings.txt','w') as wf:
					pickle.dump(known_faces_encoding, wf)
	
	if delete_flag == False:
		print("Cannot find such id")
	
	return delete_flag

			

