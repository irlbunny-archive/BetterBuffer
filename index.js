const BigIntBuffer = require('bigint-buffer');

function BetterBuffer() {
	this.buffer = Buffer.alloc(0);
	this.reset();
};

BetterBuffer.prototype.reset = function() {
	if (this.buffer.length != 0)
		this.buffer = Buffer.alloc(0);

	this.offset = 0;
	this.length = 0;
};

BetterBuffer.prototype.getBuffer = function() {
	return this.buffer;
};

BetterBuffer.prototype.getLength = function() {
	return this.length;
};

BetterBuffer.prototype.getOffset = function() {
	return this.offset;
};

BetterBuffer.prototype.setOffset = function(offset) {
	if (offset > this.length) throw new Error('Offset is above length!');
	this.offset = offset;
};

BetterBuffer.prototype.writeBuffer = function(buffer) {
	this.buffer = Buffer.concat([this.buffer, buffer], this.length + buffer.length);
	this.length += buffer.length;
};

BetterBuffer.prototype.readDouble = function(val) {
	this.offset += 8;
	return this.buffer.readDoubleLE(this.offset - 8);
};

BetterBuffer.prototype.writeDouble = function(val) {
	writeBuffer = Buffer.alloc(8);
	writeBuffer.writeDoubleLE(val, 0);

	this.buffer = Buffer.concat([this.buffer, writeBuffer], this.length + 8);
	this.length += 8;
};

BetterBuffer.prototype.readFloat = function(val) {
	this.offset += 4;
	return this.buffer.readFloatLE(this.offset - 4);
};

BetterBuffer.prototype.writeFloat = function(val) {
	writeBuffer = Buffer.alloc(4);
	writeBuffer.writeFloatLE(val, 0);

	this.buffer = Buffer.concat([this.buffer, writeBuffer], this.length + 4);
	this.length += 4;
};

BetterBuffer.prototype.readInt8 = function() {
	this.offset += 1;
	return this.buffer.readInt8(this.offset - 1);
};

BetterBuffer.prototype.writeInt8 = function(val) {
	writeBuffer = Buffer.alloc(1);
	writeBuffer.writeInt8(val, 0);

	this.buffer = Buffer.concat([this.buffer, writeBuffer], this.length + 1);
	this.length += 1;
};

BetterBuffer.prototype.readUInt8 = function() {
	this.offset += 1;
	return this.buffer.readUInt8(this.offset - 1);
};

BetterBuffer.prototype.writeUInt8 = function(val) {
	writeBuffer = Buffer.alloc(1);
	writeBuffer.writeUInt8(val, 0);

	this.buffer = Buffer.concat([this.buffer, writeBuffer], this.length + 1);
	this.length += 1;
};

BetterBuffer.prototype.readInt16 = function() {
	this.offset += 2;
	return this.buffer.readInt16LE(this.offset - 2);
};

BetterBuffer.prototype.writeInt16 = function(val) {
	writeBuffer = Buffer.alloc(2);
	writeBuffer.writeInt16LE(val, 0);

	this.buffer = Buffer.concat([this.buffer, writeBuffer], this.length + 2);
	this.length += 2;
};

BetterBuffer.prototype.readUInt16 = function() {
	this.offset += 2;
	return this.buffer.readUInt16LE(this.offset - 2);
};

BetterBuffer.prototype.writeUInt16 = function(val) {
	writeBuffer = Buffer.alloc(2);
	writeBuffer.writeUInt16LE(val, 0);

	this.buffer = Buffer.concat([this.buffer, writeBuffer], this.length + 2);
	this.length += 2;
};

BetterBuffer.prototype.readInt32 = function() {
	this.offset += 4;
	return this.buffer.readInt32LE(this.offset - 4);
};

BetterBuffer.prototype.writeInt32 = function(val) {
	writeBuffer = Buffer.alloc(4);
	writeBuffer.writeInt32LE(val, 0);

	this.buffer = Buffer.concat([this.buffer, writeBuffer], this.length + 4);
	this.length += 4;
};

BetterBuffer.prototype.readUInt32 = function() {
	this.offset += 4;
	return this.buffer.readUInt32LE(this.offset - 4);
};

BetterBuffer.prototype.writeUInt32 = function(val) {
	writeBuffer = Buffer.alloc(4);
	writeBuffer.writeUInt32LE(val, 0);

	this.buffer = Buffer.concat([this.buffer, writeBuffer], this.length + 4);
	this.length += 4;
};

BetterBuffer.prototype.readInt64 = function() {
	val = this.readUInt64();

	if (val > 9223372036854775807n)  throw new Error('Value is above signed 64-bit integer limit.');
	if (val < -9223372036854775808n) throw new Error('Value is below signed 64-bit integer limit.');

	return val;
};

BetterBuffer.prototype.writeInt64 = function(val) {
	if (val > 9223372036854775807n)  throw new Error('Value is above signed 64-bit integer limit.');
	if (val < -9223372036854775808n) throw new Error('Value is below signed 64-bit integer limit.');

	this.writeUInt64(val);
};

BetterBuffer.prototype.readUInt64 = function() {
	this.offset += 8;
	val = BigIntBuffer.toBigIntLE(this.buffer.slice(this.offset - 8, this.offset));

	if (val > 18446744073709551615n) throw new Error('Value is above unsigned 64-bit integer limit.');
	if (val < -9223372036854775808n) throw new Error('Value is below unsigned 64-bit integer limit.');

	return val;
};

BetterBuffer.prototype.writeUInt64 = function(val) {
	if (val > 18446744073709551615n) throw new Error('Value is above unsigned 64-bit integer limit.');
	if (val < -9223372036854775808n) throw new Error('Value is below unsigned 64-bit integer limit.');

	this.buffer = Buffer.concat([this.buffer, BigIntBuffer.toBufferLE(val, 8)], this.length + 8);
	this.length += 8;
};

module.exports = BetterBuffer;