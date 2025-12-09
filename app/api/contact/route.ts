import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Log the payload to the server console as requested
        console.log('Contact Form Submission:', body);

        // In a real app, this would send an email or store in DB

        return NextResponse.json({ success: true, message: 'Inquiry received' });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
