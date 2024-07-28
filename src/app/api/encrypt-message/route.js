import { AES } from 'crypto-js';

const encryptData = (message) => {
    const KEY = process.env.KEY;
    if (!KEY) {
        throw new Error('Environment variable KEY is not defined');
    }
    const encrypted = AES.encrypt(JSON.stringify(message), KEY);
    return encrypted.toString();
};

export async function POST(request) {
    try {
        const { message } = await request.json();
        if (!message) {
            return new Response(JSON.stringify({ message: 'Message is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const encryptedMessage = encryptData(message);
        return new Response(JSON.stringify({ encrypted: encryptedMessage }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
