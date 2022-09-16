/**
 * Converts the 32-bit integer into
 * a 4 bytes long big-endian buffer.
 *
 * @param int the number to convert.
 * @return the byte buffer.
 *
 * @since   Quark 1.1
 * @author  Anatoly Frolov | Анатолий Фролов | <a href="https://anafro.ru">My website</a>
 */
export function int32ToBytes(int: number): Buffer {
    const buffer = Buffer.allocUnsafe(4);
    buffer.writeInt32BE(int);

    return buffer;
}