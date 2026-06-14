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
      console.error('Failed to read HTML template file, falling back to basic inline HTML:', readError);
      emailHtml = `
        <h2>Detail Konsultasi Reuni Baru</h2>
        <p><strong>Nama Lengkap:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email || '-'}</p>
        <p><strong>Nomor WhatsApp:</strong> ${whatsapp}</p>
        <p><strong>Tipe Reuni:</strong> ${packageType || 'Umum / Kustom'}</p>
        <p><strong>Estimasi Jumlah Peserta:</strong> ${participants || '-'}</p>
        <p><strong>Tanggal Reuni:</strong> ${date || '-'}</p>
        <p><strong>Catatan Tambahan:</strong></p>
        <p>${notes ? notes.replace(/\n/g, '<br>') : '-'}</p>
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
      return NextResponse.json({ error: 'Gagal mengirim email via Resend' }, { status: 500 });
    }

    const resData = await response.json();
    return NextResponse.json({ success: true, id: resData.id });
  } catch (error: any) {
    console.error('Error in consultation api route:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
