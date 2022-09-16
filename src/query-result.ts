import {InstructionResultFormatError} from "./instruction-result-format-error";
import {TableView} from "./table-view";
import {TableViewHeader} from "./table-view-header";
import {TableViewRow} from "./table-view-row";
import {QueryExecutionStatus} from "./query-execution-status";


/**
 * Represents the result after querying.
 *
 * @since   Quark 1.1
 * @version Quark 1.1
 * @author  Anatoly Frolov | Анатолий Фролов | <a href="https://anafro.ru">My website</a>
 */
export class QueryResult {

    /**
     * The execution status.
     * @since Quark 1.1
     */
    readonly executionStatus?: QueryExecutionStatus;

    /**
     * The exception message.
     * @since Quark 1.1
     */
    readonly exception?: string;

    /**
     * The message.
     * @since Quark 1.1
     */
    readonly message?: string;

    /**
     * Time spent to execute in milliseconds.
     * @since Quark 1.1
     */
    readonly time?: number;

    /**
     * The table result returned by the server.
     */
    readonly tableView?: TableView;

    /**
     * Creates a new query result from the JSON object
     * stored inside the string passed in.
     *
     * @param resultInJson the result in JSON string.
     *
     * @since Quark 1.1
     * @author  Anatoly Frolov | Анатолий Фролов | <a href="https://anafro.ru">My website</a>
     */
    public constructor(resultInJson: string) {
        let result = JSON.parse(resultInJson);

        if(!result.hasOwnProperty("status")) {
            throw new InstructionResultFormatError("Required 'status' field in instruction result is missed");
        }

        if(!result.hasOwnProperty("message")) {
            throw new InstructionResultFormatError("Required 'message' field in instruction result is missed");
        }

        if(result.hasOwnProperty("exception")) {
            this.exception = result.exception
        }

        if(result.hasOwnProperty("time")) {
            this.time = parseInt(result.time)
        }

        if(result.hasOwnProperty("table") && result.table.hasOwnProperty("records") && result.table.hasOwnProperty("header")) {
            this.tableView = new TableView(new TableViewHeader(result.table.header), ...result.table.records.map((record: string[]) => new TableViewRow(...record)));
        }

        this.message = result.message;
        this.executionStatus = result.status as QueryExecutionStatus;
    }

    /**
     * Returns true if table is present in this result.
     * Otherwise, false is returned.
     *
     * @return (See the description above)
     *
     * @since  Quark 1.1
     * @author Anatoly Frolov | Анатолий Фролов | <a href="https://anafro.ru">My website</a>
     */
    public hasTable(): boolean {
        return this.tableView !== undefined && this.tableView.rows.length !== 0;
    }

    /**
     * Returns true if result contains an exception message.
     * Otherwise, false is returned.
     *
     * @return (See the description above)
     *
     * @since  Quark 1.1
     * @author Anatoly Frolov | Анатолий Фролов | <a href="https://anafro.ru">My website</a>
     */
    public hasException(): boolean {
        return this.exception !== undefined;
    }
}