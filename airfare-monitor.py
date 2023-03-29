# Written by OpenAI
# Question: write a python code that monitors airfare changes
# Issues: import time, bs4, kayak blocked due to security check "I'm not a robot"

import requests
import smtplib
import time
from bs4 import BeautifulSoup

# Define the flight details
origin = 'SFO'  # departure airport code
destination = 'LAX'  # arrival airport code
outbound_date = '2023-05-01'  # departure date in YYYY-MM-DD format
inbound_date = '2023-05-08'  # return date in YYYY-MM-DD format

# Define the email details
sender_email = 'your_email@gmail.com'
sender_password = 'your_password'
receiver_email = 'recipient_email@gmail.com'

# Define the URL for the flight search
url = f'https://www.kayak.com/flights/{origin}-{destination}/{outbound_date}/{inbound_date}?sort=price_a'

# Define the headers for the HTTP request
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}

# Define the function to send email notification
def send_email(subject, body):
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(sender_email, sender_password)
        message = f'Subject: {subject}\n\n{body}'
        smtp.sendmail(sender_email, receiver_email, message)

# Define the function to check airfare prices
def check_prices():
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    price_element = soup.find('div', {'class': 'price-text'})
    price = int(price_element.text.replace('$', '').replace(',', ''))
    return price

# Define the initial price and threshold for price drop
initial_price = check_prices()
threshold_price = initial_price - 50

# Monitor the airfare prices every hour and send email notification if the price drops
while True:
    current_price = check_prices()
    if current_price < threshold_price:
        send_email('Airfare price drop', f'The airfare price has dropped to ${current_price}')
        break
    else:
        print(f'Current price: ${current_price}')
    time.sleep(3600)  # wait for 1 hour before checking again

