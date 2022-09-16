/**
 * This error should be thrown when the result
 * is the query is malformed (e.g. a field is missing in JSON).
 *
 * @since   Quark 1.1
 * @version Quark 1.1
 * @author  Anatoly Frolov | Анатолий Фролов | <a href="https://anafro.ru">My website</a>
 */
export class InstructionResultFormatError extends Error {

    /**
     * Creates a new error instance.
     * @param message the message of this error.
     *
     * @since  Quark 1.1
     * @author Anatoly Frolov | Анатолий Фролов | <a href="https://anafro.ru">My website</a>
     */
    public constructor(message: string) {
        super(message);
    }
}