import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, whatsapp, packageType, participants, date, notes } = body;

    // Basic validation
    if (!name || !whatsapp) {
      return NextResponse.json({ error: 'Nama dan WhatsApp wajib diisi' }, { status: 400 });
    }

    const emailSubject = `Konsultasi Reuni Baru: ${name}`;
    
    let emailHtml = '';
    try {
      const filePath = path.join(process.cwd(), 'src/templates/email/consultation.html');
      const htmlTemplate = await fs.readFile(filePath, 'utf8');
      
      const cleanWhatsapp = whatsapp.replace(/\D/g, '');
      const waClean = cleanWhatsapp.startsWith('0') ? '62' + cleanWhatsapp.substring(1) : cleanWhatsapp;

      emailHtml = htmlTemplate
        .replace('{{NAME}}', name)
        .replace('{{EMAIL}}', email || '-')
        .replace('{{WHATSAPP}}', whatsapp)
        .replace('{{PACKAGE}}', packageType || 'Umum / Kustom')
        .replace('{{PARTICIPANTS}}', participants || '-')
        .replace('{{DATE}}', date || '-')
        .replace('{{NOTES}}', notes ? notes.replace(/\n/g, '<br>') : '-')
        .replace('{{WHATSAPP_CLEAN}}', waClean);
    } catch (readError) {
      console.error('Failed to read HTML template file, falling back to Neobrutalist inline HTML:', readError);
      
      const cleanWhatsapp = whatsapp.replace(/\D/g, '');
      const waClean = cleanWhatsapp.startsWith('0') ? '62' + cleanWhatsapp.substring(1) : cleanWhatsapp;

      emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Konsultasi Reuni Baru</title>
  <style>
    body {
      font-family: 'Courier New', Courier, monospace, Arial, sans-serif;
      background-color: #FEFCFF;
      margin: 0;
      padding: 40px 20px;
      color: #0F2D4A;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #FEFCFF;
      padding-bottom: 40px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #FEFCFF;
      border: 4px solid #0F2D4A;
      box-shadow: 8px 8px 0px 0px #0F2D4A;
      padding: 0;
    }
    .header-banner {
      background-color: #E7AF36;
      border-bottom: 4px solid #0F2D4A;
      padding: 30px;
      text-align: center;
    }
    .header-banner h1 {
      margin: 0;
      font-size: 32px;
      font-weight: 950;
      text-transform: uppercase;
      letter-spacing: -1px;
      color: #0F2D4A;
      font-family: Arial, Helvetica, sans-serif;
    }
    .header-banner .badge {
      display: inline-block;
      background-color: #FEFCFF;
      border: 2px solid #0F2D4A;
      padding: 4px 12px;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-top: 10px;
      box-shadow: 2px 2px 0px 0px #0F2D4A;
    }
    .content-body {
      padding: 30px;
    }
    .section-title {
      font-size: 18px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 20px;
      border-bottom: 4px dashed #0F2D4A;
      padding-bottom: 8px;
    }
    .data-row {
      margin-bottom: 15px;
      border: 3px solid #0F2D4A;
      background-color: #FEFCFF;
      box-shadow: 4px 4px 0px 0px #0F2D4A;
    }
    .data-label {
      background-color: #E7AF36;
      border-right: 3px solid #0F2D4A;
      padding: 12px;
      font-weight: 900;
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 1px;
      width: 150px;
      color: #0F2D4A;
      vertical-align: middle;
    }
    .data-value {
      padding: 12px;
      font-size: 14px;
      font-weight: bold;
      color: #0F2D4A;
      background-color: #FEFCFF;
      vertical-align: middle;
    }
    .notes-header {
      font-size: 13px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 25px;
      margin-bottom: 10px;
    }
    .notes-box {
      border: 3px solid #0F2D4A;
      background-color: #FEFCFF;
      padding: 20px;
      font-size: 14px;
      line-height: 1.6;
      font-weight: bold;
      box-shadow: 4px 4px 0px 0px #0F2D4A;
      margin-bottom: 30px;
    }
    .action-container {
      text-align: center;
      margin: 30px 0;
    }
    .wa-button {
      display: inline-block;
      background-color: #FEFCFF;
      color: #0F2D4A !important;
      text-decoration: none;
      padding: 16px 32px;
      font-size: 16px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      border: 3px solid #0F2D4A;
      box-shadow: 4px 4px 0px 0px #0F2D4A;
    }
    .footer {
      background-color: #0F2D4A;
      color: #F9F6EE;
      padding: 24px;
      text-align: center;
      font-size: 11px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
  </style>
</head>
<body>
  <table class="wrapper" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">
        <div class="container">
          <div class="header-banner">
            <h1>JUMPA LAGI</h1>
            <div class="badge">KONSULTASI MASUK</div>
          </div>
          <div class="content-body">
            <div class="section-title">Detail Calon Pelanggan</div>
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 25px;">
              <tr>
                <td>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" class="data-row" style="margin-bottom: 12px;">
                    <tr><td class="data-label">Nama</td><td class="data-value">${name}</td></tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" class="data-row" style="margin-bottom: 12px;">
                    <tr><td class="data-label">Email</td><td class="data-value">${email || '-'}</td></tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" class="data-row" style="margin-bottom: 12px;">
                    <tr><td class="data-label">WhatsApp</td><td class="data-value">${whatsapp}</td></tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" class="data-row" style="margin-bottom: 12px;">
                    <tr><td class="data-label">Tipe Reuni</td><td class="data-value">${packageType || 'Umum / Kustom'}</td></tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" class="data-row" style="margin-bottom: 12px;">
                    <tr><td class="data-label">Peserta</td><td class="data-value">${participants || '-'} Orang</td></tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" class="data-row" style="margin-bottom: 12px;">
                    <tr><td class="data-label">Tanggal</td><td class="data-value">${date || '-'}</td></tr>
                  </table>
                </td>
              </tr>
            </table>
            <div class="notes-header">Catatan Tambahan & Keinginan Khusus</div>
            <div class="notes-box">${notes ? notes.replace(/\n/g, '<br>') : '-'}</div>
            <div class="action-container">
              <a href="https://wa.me/${waClean}" target="_blank" class="wa-button">Hubungi Calon Client</a>
            </div>
          </div>
          <div class="footer">
            SISTEM NOTIFIKASI OTOMATIS &copy; 2026 JUMPALAGI.COM
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
      `;
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.TO_EMAIL || 'kikilegal54@gmail.com'; // Default fallback
    
    // Split comma-separated emails into an array for Resend API
    const toEmails = toEmail.includes(',')
      ? toEmail.split(',').map(email => email.trim()).filter(Boolean)
      : toEmail.trim();

    if (!apiKey) {
      console.warn('RESEND_API_KEY is not set in environment. Simulating email send:');
      console.log('Subject:', emailSubject);
      console.log('Body:', emailHtml);
      console.log('To:', toEmails);
      return NextResponse.json({ 
        success: true, 
        message: 'Email simulated successfully (RESEND_API_KEY not configured)' 
      });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'JumpaLagi Consultation <onboarding@resend.dev>',
        to: toEmails,
        subject: emailSubject,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend API error response:', errorText);
      let errorMessage = errorText;
      try {
        const errObj = JSON.parse(errorText);
        errorMessage = errObj.message || errorText;
      } catch (e) {}
      return NextResponse.json({ error: `Resend API Error: ${errorMessage}` }, { status: response.status });
    }

    const resData = await response.json();
    return NextResponse.json({ success: true, id: resData.id });
  } catch (error: any) {
    console.error('Error in consultation api route:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
