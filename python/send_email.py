import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText



def email(email_address, first_name, last_name, log_time):
	try:
		gmail_user = 'faceit.metropolia@gmail.com'
		gmail_password = '@mUAS@FI'
		
		server = smtplib.SMTP('smtp.gmail.com', 587)
		server.starttls()
		server.login(gmail_user, gmail_password)
		
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
		
		server.sendmail(gmail_user, email_address, msg.as_string())
		print("Success to send")
		server.quit()
	except:  
		print 'Something went wrong...'
