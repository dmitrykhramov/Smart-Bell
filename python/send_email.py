import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

gmail_user = 'faceit.metropolia@gmail.com'  
gmail_password = '@mUAS@FI'

def send_email(email_address, first_name, last_name, log_time):
	try:  
		server = smtplib.SMTP('smtp.gmail.com', 587)
		server.starttls()
		server.login(gmail_user, gmail_password)
		
		msg = MIMEMultipart('alternative') 
		msg['Subject'] = "Entrance Log"
		msg['From']='no-reply@gmail.com'
		msg['To'] = email_address
		
		text=first_name +' '+last_name+' visits at '+str(log_time)+'/n If it is not you,'
		link_part = """\
		<html>
			<head></head>
			<body>
				<a href="http://localhost:8000/lock">Emergency lock</a>
			</body>
		</html>
		"""
		content = MIMEText(text, 'plain')
		emergency=MIMEText(link_part, 'html')
		msg.attach(content)
		msg.attach(emergency)
		server.sendmail(gmail_user, email_address, msg)
		server.quit()
	except:  
		print 'Something went wrong...'

