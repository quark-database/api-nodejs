import {TableViewRow} from "./table-view-row";
import {InstructionResultFormatError} from "./instruction-result-format-error";

export class TableViewHeader implements Iterable<string> {
    public readonly columnNames: string[];

    public constructor(...columnNames: string[]) {
        this.columnNames = columnNames;
    }

    public *[Symbol.iterator](): IterableIterator<string> {
        for(const columnName in this.columnNames) {
            yield columnName;
        }
    }

    public produceRow(...cells: string[]) {
        if(cells.length === this.columnNames.length) {
            return new TableViewRow(...cells);
        }

        throw new InstructionResultFormatError(`Cannot produce a new row with ${cells.length} values, because the table header 
                                                contains ${this.columnNames.length > cells.length ? 'more' : 'less'} columns, 
                                                exactly ${this.columnNames.length}`);
    }
}