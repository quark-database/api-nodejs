import {DEFAULT_QUARK_PORT} from "./constants";
import {TcpClient} from "./tcp";
import {QueryResult} from "./query-result";

/**
 * This is a client of Quark API. Use it to send
 * queries written in Quark QL to Quark servers.
 *
 * @since   Quark 1.1
 * @version Quark 1.1
 * @author  Anatoly Frolov | Анатолий Фролов | <a href="https://anafro.ru">My website</a>
 * @see constructor
 * @see query
 */
export class Client {
    readonly #token: string;
    readonly #host: string;
    readonly #port: number;
    readonly #tcp: TcpClient;

    /**
     * Creates a new Quark API client.
     *
     * @param token the access token.
     * @param host the host of the server.
     * @param port the port of the server.
     */
    public constructor(token: string, host: string = "localhost", port: number = DEFAULT_QUARK_PORT) {
        this.#token = token;
        this.#host = host;
        this.#port = port;
        this.#tcp = new TcpClient(host, port);
    }

    /**
     * Sends a query to the server.
     *
     * @param instruction the instruction written in Quark QL.
     * @return the query result wrapped inside promise.
     *
     * @since   Quark 1.1
     * @author  Anatoly Frolov | Анатолий Фролов | <a href="https://anafro.ru">My website</a>
     */
    public query(instruction: string): Promise<QueryResult> {
        return new Promise<QueryResult>((resolve, reject) => {
            const response = this.#tcp.sendMessage(JSON.stringify({
                token: this.#token,
                query: instruction,
            }));

            response
                .then(result => resolve(new QueryResult(result)))
                .catch(reject);
        });
    }
}