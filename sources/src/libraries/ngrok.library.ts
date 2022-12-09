import axios from 'axios';

export class NgrokClient {
    private readonly axios = axios.create({
        baseURL: 'https://api.ngrok.com',
        headers: {
            Authorization: `Bearer ${process.env.NGROK_AUTHTOKEN}`,
            "Ngrok-Version": "2",
        }
    });

    async getTunnels(): Promise<Tunnel[]> {
        const {data} = await this.axios.get('/tunnels');
        return data.tunnels;
    }
}

export type Tunnel = {
    id: string,
    public_url: string,
    started_at: Date,
    proto: string,
    region: string,
    tunnel_session: {
        id: string,
        uri: string
    },
    endpoint: {
        id: string,
        uri: string
    },
    forwards_to: string
}