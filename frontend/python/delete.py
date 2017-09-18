from bson.objectid import ObjectId
import pickle
import numpy as np

def delete_face(visitor_id):
	'''
	This function is to delete visitor.
	If you click delete button which is for deleting visitor, we would read 'faces_encodings.txt' which is registered data.
	And, check whether the visitor is deleted correctly.
	If not, we would returns delete_flag which is False.
	Or, we would find the data associated with the id and delete it at the registered data.
	Then, dump it and return delete_flag which is True.
	'''
	try:
		# Load registered data
		with open('faces_encodings.txt','r') as f:
			known_faces_encoding = pickle.load(f)
	except EOFError:
		print("Failed to load faces_encodings.txt")
		return 0
		
	file_length = len(known_faces_encoding)
	
	# Flag to delete visitor correctly
	delete_flag = False
	
	# If only one visitor is registered at 'faces_encodings.txt', check id and just delete all
	if (file_length == 2 and len(known_faces_encoding[0]) == 1):
		__id, encodings = known_faces_encoding
		if __id == [ObjectId(visitor_id)]:
			delete_flag = True
			print("Delete {}".format(__id))
			# Delete all
			with open('faces_encodings.txt', 'w'):
				pass
				
	# If two or more visitors are registered in 'faces_encodings.txt' 
	else:
		for i in range(file_length):
			# Compare the id with each ids of registered data
			__id, encodings = known_faces_encoding[i]
			if __id == [ObjectId(visitor_id)]: 
				delete_flag = True
				print("Delete {}".format(__id))
				# Delete all data which we want to delete from 'faces_encodings.txt'
				known_faces_encoding = np.delete(known_faces_encoding, (i),0)
				with open('faces_encodings.txt','w') as wf:
					pickle.dump(known_faces_encoding, wf)
				break
	
	return delete_flag

			

