import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText



def email(email_address, first_name, last_name, log_time):
	'''
	This function is to send an email to the visitor after the visitor visited.
	If the visitor didn't visit, they click the link to block the door.
	'''
	try:
		# gmail server login and connect
		gmail_user = 'faceit.metropolia@gmail.com'
		gmail_password = '@mUAS@FI'
		
		server = smtplib.SMTP('smtp.gmail.com', 587)
		server.starttls()
		server.login(gmail_user, gmail_password)
		
		# mail content
		msg = MIMEMultipart('alternative') 
		msg['Subject'] = "Entrance Log"
		msg['From']='no-reply@gmail.com'
		msg['To'] = email_address
		text=str(first_name) +' '+str(last_name)+' visits at '+str(log_time)+'.'
		link_part = """\
		<p>%s</p>
		If is is not you, <a href="http://localhost:8000/lock">Emergency lock</a>

		"""%(text)
		part=MIMEText(link_part, 'html')
		msg.attach(part)
		
		# send an email to the visitor
		server.sendmail(gmail_user, email_address, msg.as_string())
		print("Success to send")
		server.quit()
		
	except:  
		print('Something went wrong...')
