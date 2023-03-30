const axios = require('axios'); // Import Axios for HTTP requests
const oracledb = require('oracledb'); // Import Oracle Database Connector

// Concur API credentials
const concurClientId = 'YOUR_CONCUR_CLIENT_ID';
const concurClientSecret = 'YOUR_CONCUR_CLIENT_SECRET';
const concurAccessTokenUrl = 'https://us.api.concursolutions.com/oauth2/v0/token';
const concurApiUrl = 'https://us.api.concursolutions.com/api/v3.0/';

// Oracle Database credentials
const oracleDbConfig = {
  user: 'YOUR_ORACLE_USERNAME',
  password: 'YOUR_ORACLE_PASSWORD',
  connectString: 'YOUR_ORACLE_CONNECT_STRING'
};

// Get an access token from the Concur API
async function getConcurAccessToken() {
  const response = await axios.post(concurAccessTokenUrl, {
    grant_type: 'client_credentials',
    client_id: concurClientId,
    client_secret: concurClientSecret
  });

  return response.data.access_token;
}

// Get a list of expense reports from the Concur API
async function getConcurExpenseReports(accessToken) {
  const response = await axios.get(concurApiUrl + 'expense/expensereport/v1.1/report', {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });

  return response.data.Items;
}

// Insert expense report data into the Oracle Database
async function insertExpenseReportsIntoOracle(expenseReports) {
  let conn;

  try {
    conn = await oracledb.getConnection(oracleDbConfig);

    for (const expenseReport of expenseReports) {
      const query = `
        INSERT INTO expense_reports (
          report_id,
          employee_name,
          report_date,
          total_amount
        ) VALUES (
          :report_id,
          :employee_name,
          :report_date,
          :total_amount
        )
      `;

      const params = {
        report_id: expenseReport.ReportID,
        employee_name: expenseReport.EmployeeName,
        report_date: new Date(expenseReport.ReportDate),
        total_amount: expenseReport.ReportTotal.Amount
      };

      await conn.execute(query, params);
    }
  } catch (err) {
    console.error(err);
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

// Main program logic
async function syncConcurWithOracle() {
  const accessToken = await getConcurAccessToken();
  const expenseReports = await getConcurExpenseReports(accessToken);
  await insertExpenseReportsIntoOracle(expenseReports);
}

// Run the program
syncConcurWithOracle();
