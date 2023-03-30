import requests
import json

# Concur API credentials
concur_client_id = 'YOUR_CONCUR_CLIENT_ID'
concur_client_secret = 'YOUR_CONCUR_CLIENT_SECRET'
concur_access_token_url = 'https://us.api.concursolutions.com/oauth2/v0/token'
concur_api_url = 'https://us.api.concursolutions.com/api/v3.0/'

# Epicor REST API credentials
epicor_base_url = 'https://YOUR_EPICOR_SERVER/api/v1/'

# Get an access token from the Concur API
def get_concur_access_token():
    response = requests.post(concur_access_token_url, data={
        'grant_type': 'client_credentials',
        'client_id': concur_client_id,
        'client_secret': concur_client_secret
    })

    return response.json()['access_token']

# Get a list of expense reports from the Concur API
def get_concur_expense_reports(access_token):
    response = requests.get(concur_api_url + 'expense/expensereport/v1.1/report', headers={
        'Authorization': 'Bearer ' + access_token
    })

    return response.json()['Items']

# Map Concur expense data to Epicor format
def map_expense_to_epicor(expense_report):
    return {
        'expense_id': expense_report['ReportID'],
        'employee_name': expense_report['EmployeeName'],
        'expense_date': expense_report['ReportDate'],
        'total_amount': expense_report['ReportTotal']['Amount']
    }

# Create a new expense report in Epicor
def create_epicor_expense_report(expense_report):
    response = requests.post(epicor_base_url + 'expense_reports', headers={
        'Content-Type': 'application/json'
    }, data=json.dumps(expense_report))

    return response.json()

# Main program logic
def sync_concur_with_epicor():
    access_token = get_concur_access_token()
    expense_reports = get_concur_expense_reports(access_token)
    for expense_report in expense_reports:
        epicor_expense_report = map_expense_to_epicor(expense_report)
        create_epicor_expense_report(epicor_expense_report)

# Run the program
sync_concur_with_epicor()
