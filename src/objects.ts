export function getProperty<T, K extends keyof T>(object: T, propertyName: K): T[K] {
    return object[propertyName];
}