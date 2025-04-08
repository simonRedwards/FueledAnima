import { google } from 'googleapis';

// Initialize the Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY
      ?.replace(/\\n/g, '\n')  // Replace escaped newlines with actual newlines
      .replace(/"/g, '')       // Remove any double quotes
      .trim()                  // Remove any leading/trailing whitespace
      .replace(/^-----BEGIN PRIVATE KEY-----/, '')  // Remove header if present
      .replace(/-----END PRIVATE KEY-----$/, '')    // Remove footer if present
      .trim()                  // Remove any new whitespace
      .replace(/\n/g, '')      // Remove any remaining newlines
      .replace(/\r/g, '')      // Remove any carriage returns
      .replace(/\s+/g, '')     // Remove any other whitespace
      .replace(/(.{64})/g, '$1\n')  // Add newlines every 64 characters
      .trim(),                 // Final trim
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function appendEmailToSheet(email: string) {
  try {
    if (!process.env.GOOGLE_SHEET_ID) {
      throw new Error('GOOGLE_SHEET_ID is not defined');
    }

    // Debug logging
    console.log('Service Account Email:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
    console.log('Private Key Length:', process.env.GOOGLE_PRIVATE_KEY?.length);
    console.log('Sheet ID:', process.env.GOOGLE_SHEET_ID);

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:B', // Assuming we want to store email and timestamp
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[email, new Date().toISOString()]],
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error appending to sheet:', error);
    return { success: false, error };
  }
} 