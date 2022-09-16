class InstructionResultFormatError extends Error {
    constructor(message: string) {
        super(message);
    }
}

class TableViewRow implements Iterable<string> {
    readonly cells: string[];

    constructor(...cells: string[]) {
        this.cells = cells;
    }

    *[Symbol.iterator](): IterableIterator<string> {
        for(const cell in this.cells) {
            yield cell;
        }
    }
}

class TableViewHeader implements Iterable<string> {
    readonly columnNames: string[];

    constructor(...columnNames: string[]) {
        this.columnNames = columnNames;
    }

    *[Symbol.iterator](): IterableIterator<string> {
        for(const columnName in this.columnNames) {
            yield columnName;
        }
    }

    produceRow(...cells: string[]) {
        if(cells.length === this.columnNames.length) {
            return new TableViewRow(...cells);
        }

        throw new InstructionResultFormatError(`Cannot produce a new row with ${cells.length} values, because the table header 
                                                contains ${this.columnNames.length > cells.length ? 'more' : 'less'} columns, 
                                                exactly ${this.columnNames.length}`);
    }
}

class TableView {
    readonly header: TableViewHeader;
    readonly rows: TableViewRow[];

    constructor(header: TableViewHeader, ...rows: TableViewRow[]) {
        this.header = header;
        this.rows = rows;
    }

    static empty() {
        return new TableView(new TableViewHeader());
    }
}

export enum QueryExecutionStatus {
    OK,
    SYNTAX_ERROR,
    SERVER_ERROR,
    MIDDLEWARE_ERROR
}

export class QueryResult {
    readonly executionStatus?: QueryExecutionStatus;
    readonly exception?: string;
    readonly message?: string;
    readonly time?: number;
    readonly tableView?: TableView;

    constructor(resultInJson: string) {
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

    hasTable(): boolean {
        return this.tableView !== undefined && this.tableView.rows.length !== 0;
    }

    hasException(): boolean {
        return this.exception !== undefined;
    }
}