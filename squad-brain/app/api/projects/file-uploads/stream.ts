const { createClient } = require("redis");

interface StreamConfig { streamName: string };
interface FileDetails {
    fileName: string;
    fileType: string;
    filePath: string
}
interface StreamMessage {
    id: string;
    files: FileDetails[];
};

export default async function publishToStream(config: StreamConfig, message: StreamMessage) {
    const redisClient = createClient({});
    redisClient.on('error', (err: Error) => console.log('Error Creating Redis Clinet', err));
    await redisClient.connect();
    console.log(config, message);
}