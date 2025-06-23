import 'dotenv/config';

export default {
    expo: {
        name: "client",
        slug: "client",
        extra: {
            API_BASE_URL: process.env.API_BASE_URL,
        },
    },
};