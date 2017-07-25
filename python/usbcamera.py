from tornado import websocket, web, ioloop
import base64
import cv2
import time
from videostream import Stream

stream_thread = None
#makephoto_thread = None

class SocketHandler(websocket.WebSocketHandler):
	def check_origin(self, origin):
		return True
        
	def open(self):
		global stream_thread
		print("client connected")
		stream_thread = Stream(self)
		stream_thread.start()
	
	def on_message(self, message):
		print(message)

	def on_close(self):
		print("client disconnected")
		global stream_thread
		stream_thread.stop()
		
	
def main():
	
	app = web.Application([
		(r'/ws',SocketHandler)
	])
	app.listen(8000)
	ioloop.IOLoop.instance().start()

		
if __name__ == '__main__':
	main()
