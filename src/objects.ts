/**
 * Returns the property of the object with a name.
 *
 * @param object the object to get property from.
 * @param propertyName the property name.
 *
 * @return the property object.
 *
 * @since  Quark 1.1
 * @author Anatoly Frolov | Анатолий Фролов | <a href="https://anafro.ru">My website</a>
 */
export function getProperty<T, K extends keyof T>(object: T, propertyName: K): T[K] {
    return object[propertyName];
}