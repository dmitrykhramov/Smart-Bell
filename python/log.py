from pymongo import MongoClient

def save(__id):
	mongo_db = MongoClient('localhost',27017)
	db = mongo_db.smartbell.entrance_log
