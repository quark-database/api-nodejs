import {Socket} from 'net'
import {SOCKET_TIMEOUT_MILLISECONDS} from "./constants";
import {int32ToBytes} from './bytes';

export class TcpClient {
    readonly #host: string;
    readonly #port: number;

    constructor(host: string, port: number) {
        this.#host = host;
        this.#port = port;
    }

    sendMessage(textMessage: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const socket = new Socket();
            socket.setTimeout(SOCKET_TIMEOUT_MILLISECONDS);

            socket.connect(this.#port, this.#host, () => {
                const messageHeader = int32ToBytes(textMessage.length);
                const messageBody = Buffer.from(textMessage);

                const message = Buffer.concat([messageHeader, messageBody]);

                socket.write(message);
            });

            socket.on('data', function(response: Buffer) {
                // The response length is multiplied by two, because readInt32BE returns the length in characters.
                const responseLength: number = response.readInt32BE() * 2;
                const responseText: string = response.subarray(4, responseLength).toString();

                socket.destroy();
                resolve(responseText);
            });

            socket.on('error', function(error) {
                reject(error);
            });
        });
    }
}