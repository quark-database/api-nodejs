/**
 * Represents the execution status of a query.
 *
 * @since   Quark 1.1
 * @version Quark 1.1
 * @author  Anatoly Frolov | Анатолий Фролов | <a href="https://anafro.ru">My website</a>
 */
export enum QueryExecutionStatus {
    OK,
    SYNTAX_ERROR,
    SERVER_ERROR,
    MIDDLEWARE_ERROR
}