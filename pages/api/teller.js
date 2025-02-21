// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

export default async function handler(req,res) {
    try {
        const response = await axios.get('https://api.teller.io/accounts', {
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TELLER_API_KEY}`
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Teller data', details: error.message });
    }
}