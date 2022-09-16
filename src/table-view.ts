import {TableViewHeader} from "./table-view-header";
import {TableViewRow} from "./table-view-row";

export class TableView {
    readonly header: TableViewHeader;
    readonly rows: TableViewRow[];

    public constructor(header: TableViewHeader, ...rows: TableViewRow[]) {
        this.header = header;
        this.rows = rows;
    }

    public static empty() {
        return new TableView(new TableViewHeader());
    }
}