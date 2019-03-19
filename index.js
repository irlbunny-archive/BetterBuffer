// Int64
const INT64_MIN = -9223372036854775808n;
const INT64_MAX = 9223372036854775807n;

// UInt64
const UINT64_MIN = 0n;
const UINT64_MAX = 18446744073709551615n;

// https://github.com/no2chem/bigint-buffer/blob/master/src/index.ts
function toBigInt(buffer) {
	const reversed = Buffer.from(buffer);
	reversed.reverse();

	const hex = reversed.toString('hex');
	if (hex.length != 0) {
		return BigInt(`0x${hex}`);
	}

	return BigInt(0);
}

function toBuffer(value, width) {
	const hex    = value.toString(16);
	const buffer = Buffer.from(hex.padStart(width * 2, '0').slice(0, width * 2), 'hex');

	buffer.reverse();
	return buffer;
}

class BetterBuffer {
	// NOTE: I'd recommend not tampering with any of the variables used here, as shit could hit the floor quickly.
	constructor() {
		this.buffer = Buffer.alloc(0); // Init empty buffer.
		this.reset();
	}

	// Func to reset vars.
	reset() {
		// Check if buffer length is not 0, if it isn't, clear buffer...
		if (this.buffer.length != 0) {
			this.buffer = Buffer.alloc(0);
		}

		this.offset = 0;
		this.length = 0;
	}

	/*** Other ***/
	// Hopefully this actually makes sense. No?
	readBuffer() {
		return this.buffer;
	}

	writeBuffer(buffer) {
		this.length += buffer.length;
		this.buffer = Buffer.concat([this.buffer, buffer], this.length);
	}

	/*** 8-bit read/write ***/
	readInt8() {
		this.offset += 1;
		return this.buffer.readInt8(this.offset - 1);
	}

	writeInt8(value) {
		const writeBuffer = Buffer.alloc(1);
		writeBuffer.writeInt8(value, 0);

		this.length += 1;
		this.buffer = Buffer.concat([this.buffer, writeBuffer], this.length);
	}

	readUInt8() {
		this.offset += 1;
		return this.buffer.readUInt8(this.offset - 1);
	}

	writeUInt8(value) {
		const writeBuffer = Buffer.alloc(1);
		writeBuffer.writeUInt8(value, 0);

		this.length += 1;
		this.buffer = Buffer.concat([this.buffer, writeBuffer], this.length);
	}

	/*** 16-bit read/write ***/
	readInt16() {
		this.offset += 2;
		return this.buffer.readInt16(this.offset - 2);
	}

	writeInt16(value) {
		const writeBuffer = Buffer.alloc(2);
		writeBuffer.writeInt16(value, 0);

		this.length += 2;
		this.buffer = Buffer.concat([this.buffer, writeBuffer], this.length);
	}

	readUInt16() {
		this.offset += 2;
		return this.buffer.readUInt16(this.offset - 2);
	}

	writeUInt16(value) {
		const writeBuffer = Buffer.alloc(2);
		writeBuffer.writeUInt16(value, 0);

		this.length += 2;
		this.buffer = Buffer.concat([this.buffer, writeBuffer], this.length);
	}

	/*** 32-bit read/write ***/
	readFloat() {
		this.offset += 4;
		return this.buffer.readFloatLE(this.offset - 4);
	}

	writeFloat(value) {
		const writeBuffer = Buffer.alloc(4);
		writeBuffer.writeFloatLE(value, 0);

		this.length += 4;
		this.buffer = Buffer.concat([this.buffer, writeBuffer], this.length);
	}

	readInt32() {
		this.offset += 4;
		return this.buffer.readInt32(this.offset - 4);
	}

	writeInt32(value) {
		const writeBuffer = Buffer.alloc(4);
		writeBuffer.writeInt32(value, 0);

		this.length += 4;
		this.buffer = Buffer.concat([this.buffer, writeBuffer], this.length);
	}

	readUInt32() {
		this.offset += 4;
		return this.buffer.readUInt32(this.offset - 4);
	}

	writeUInt32(value) {
		const writeBuffer = Buffer.alloc(4);
		writeBuffer.writeUInt32(value, 0);

		this.length += 4;
		this.buffer = Buffer.concat([this.buffer, writeBuffer], this.length);
	}

	/*** 64-bit read/write ***/
	readDouble() {
		this.offset += 8;
		return this.buffer.readDoubleLE(this.offset - 8);
	}

	writeDouble(value) {
		const writeBuffer = Buffer.alloc(8);
		writeBuffer.writeDoubleLE(value, 0);

		this.length += 8;
		this.buffer = Buffer.concat([this.buffer, writeBuffer], this.length);
	}

	readInt64() {
		this.offset += 8;
		const value = toBigInt(this.buffer.slice(this.offset - 8, this.offset));

		if (value > INT64_MAX) throw new Error('Value is above signed 64-bit integer limit.');
		if (value < INT64_MIN) throw new Error('Value is below signed 64-bit integer limit.');

		return value;
	}

	writeInt64(value) {
		if (value > INT64_MAX) throw new Error('Value is above signed 64-bit integer limit.');
		if (value < INT64_MIN) throw new Error('Value is below signed 64-bit integer limit.');

		this.length += 8;
		this.buffer = Buffer.concat([this.buffer, toBuffer(value, 8)], this.length);
	}

	readUInt64() {
		this.offset += 8;
		const value = toBigInt(this.buffer.slice(this.offset - 8, this.offset));

		if (value > UINT64_MAX) throw new Error('Value is above unsigned 64-bit integer limit.');
		if (value < UINT64_MIN) throw new Error('Value is below unsigned 64-bit integer limit.');

		return value;
	}

	writeUInt64(value) {
		if (value > UINT64_MAX) throw new Error('Value is above unsigned 64-bit integer limit.');
		if (value < UINT64_MIN) throw new Error('Value is below unsigned 64-bit integer limit.');

		this.length += 8;
		this.buffer = Buffer.concat([this.buffer, toBuffer(value, 8)], this.length);
	}
}

module.exports = BetterBuffer;