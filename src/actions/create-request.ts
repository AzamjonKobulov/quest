'use server';

interface SubmitFormProps {
    name: string,
    phone: string,
    comment?: string
}

export async function submitForm({name, phone, comment}: SubmitFormProps) {
    try {
        if (!process.env.GOOGLE_SHEET_REQUESTS) {
            throw new Error('GOOGLE_SHEET_CERTIFICATES environment variable is not set.');
        }
        const response = await fetch(process.env.GOOGLE_SHEET_REQUESTS, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                name: name,
                phone: phone,
                comment: comment
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to submit the form data: ${errorText}`);
        }

        return { success: true, message: 'Form data has been submitted successfully' };
    } catch (error) {
        console.error('Error submitting form:', error);
        return {
            success: false,
            message: `Failed to submit the form data`
        };
    }
}
