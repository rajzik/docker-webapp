import { Lokka } from 'lokka';
import { Transport } from 'lokka-transport-http';

const headers = {
    'Access-Control-Allow-Origin': '*',
};
const client = new Lokka({
    transport: new Transport('/graphql/', { headers }),
});

export default client;
