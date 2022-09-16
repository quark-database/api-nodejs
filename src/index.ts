import {DEFAULT_QUARK_PORT} from "./constants";
import {TcpClient} from "./tcp";
import {QueryResult} from "./entities";


export class Client {
    readonly #token: string;
    readonly #host: string;
    readonly #port: number;
    readonly #tcp: TcpClient;

    constructor(token: string, host: string = "localhost", port: number = DEFAULT_QUARK_PORT) {
        this.#token = token;
        this.#host = host;
        this.#port = port;
        this.#tcp = new TcpClient(host, port);
    }

    query(instruction: string): Promise<QueryResult> {
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