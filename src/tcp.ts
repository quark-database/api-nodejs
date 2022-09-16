import {Socket} from 'net'
import {SOCKET_TIMEOUT_MILLISECONDS} from "./constants";
import {int32ToBytes} from './bytes';

/**
 * The TCP client that can send string messages to servers
 * with the following format:
 * `[4 bytes: length of the message]` + `[N bytes: the message]`.
 *
 * @see Client
 * @since   Quark 1.1
 * @version Quark 1.1
 * @author  Anatoly Frolov | Анатолий Фролов | <a href="https://anafro.ru">My website</a>
 */
export class TcpClient {

    /**
     * The host of the server.
     * @private
     * @since Quark 1.1
     */
    readonly #host: string;

    /**
     * The port of the server.
     * @private
     * @since Quark 1.1
     */
    readonly #port: number;

    /**
     * Creates a new TCP client with given host and port.
     *
     * @param host the host of the server this client is going to connect to.
     * @param port the port of the server this client is going to connect to.
     *
     * @since   Quark 1.1
     * @author  Anatoly Frolov | Анатолий Фролов | <a href="https://anafro.ru">My website</a>
     */
    constructor(host: string, port: number) {
        this.#host = host;
        this.#port = port;
    }

    /**
     * Sends a text message to the server.
     *
     * @param textMessage the text message to send.
     * @return the result wrapped into a promise.
     *
     * @since   Quark 1.1
     * @author  Anatoly Frolov | Анатолий Фролов | <a href="https://anafro.ru">My website</a>
     */
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