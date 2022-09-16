/**
 * Represents a single line of the table.
 * To get values in this row, access the `cells` field.
 *
 * @see     cells
 * @see     TableView
 * @since   Quark 1.1
 * @version Quark 1.1
 * @author  Anatoly Frolov | Анатолий Фролов | <a href="https://anafro.ru">My website</a>
 */
export class TableViewRow implements Iterable<string> {

    /**
     * The cells of the row.
     * @since Quark 1.1
     */
    public readonly cells: string[];

    /**
     * Creates a new row.
     *
     * @param cells the cells of the creating row.
     * @since   Quark 1.1
     * @version Quark 1.1
     * @author  Anatoly Frolov | Анатолий Фролов | <a href="https://anafro.ru">My website</a>
     */
    public constructor(...cells: string[]) {
        this.cells = cells;
    }

    /**
     * The iterator of the table row, which iterates though
     * all the cells inside this row.
     *
     * @since   Quark 1.1
     * @version Quark 1.1
     * @author  Anatoly Frolov | Анатолий Фролов | <a href="https://anafro.ru">My website</a>
     */
    public *[Symbol.iterator](): IterableIterator<string> {
        for(const cell in this.cells) {
            yield cell;
        }
    }
}