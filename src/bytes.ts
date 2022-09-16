export function int32ToBytes(int: number): Buffer {
    const buffer = Buffer.allocUnsafe(4);
    buffer.writeInt32BE(int);

    return buffer;
}