/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ts-exif-parser/index.js":
/*!**********************************************!*\
  !*** ./node_modules/ts-exif-parser/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThumbnailTypes = exports.ExifData = exports.OrientationTypes = exports.ExifParserFactory = void 0;
var ExifParserFactory_1 = __webpack_require__(/*! ./lib/ExifParserFactory */ "./node_modules/ts-exif-parser/lib/ExifParserFactory.js");
Object.defineProperty(exports, "ExifParserFactory", ({ enumerable: true, get: function () { return ExifParserFactory_1.ExifParserFactory; } }));
var ExifData_1 = __webpack_require__(/*! ./lib/ExifData */ "./node_modules/ts-exif-parser/lib/ExifData.js");
Object.defineProperty(exports, "OrientationTypes", ({ enumerable: true, get: function () { return ExifData_1.OrientationTypes; } }));
Object.defineProperty(exports, "ExifData", ({ enumerable: true, get: function () { return ExifData_1.ExifData; } }));
Object.defineProperty(exports, "ThumbnailTypes", ({ enumerable: true, get: function () { return ExifData_1.ThumbnailTypes; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ts-exif-parser/lib/BufferStream.js":
/*!*********************************************************!*\
  !*** ./node_modules/ts-exif-parser/lib/BufferStream.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BufferStream = void 0;
var BufferStream = /** @class */ (function () {
    function BufferStream(buffer, offset, length, bigEndian) {
        if (offset === void 0) { offset = 0; }
        if (length === void 0) { length = buffer.length; }
        this.buffer = buffer;
        this.offset = offset;
        this.length = length;
        this.bigEndian = bigEndian;
        this.endPosition = this.offset + length;
        this.setBigEndian(bigEndian);
    }
    BufferStream.prototype.setBigEndian = function (bigEndian) {
        this.bigEndian = !!bigEndian;
    };
    BufferStream.prototype.nextUInt8 = function () {
        var value = this.buffer.readUInt8(this.offset);
        this.offset += 1;
        return value;
    };
    BufferStream.prototype.nextInt8 = function () {
        var value = this.buffer.readInt8(this.offset);
        this.offset += 1;
        return value;
    };
    BufferStream.prototype.nextUInt16 = function () {
        var value = this.bigEndian ? this.buffer.readUInt16BE(this.offset) : this.buffer.readUInt16LE(this.offset);
        this.offset += 2;
        return value;
    };
    BufferStream.prototype.nextUInt32 = function () {
        var value = this.bigEndian ? this.buffer.readUInt32BE(this.offset) : this.buffer.readUInt32LE(this.offset);
        this.offset += 4;
        return value;
    };
    BufferStream.prototype.nextInt16 = function () {
        var value = this.bigEndian ? this.buffer.readInt16BE(this.offset) : this.buffer.readInt16LE(this.offset);
        this.offset += 2;
        return value;
    };
    BufferStream.prototype.nextInt32 = function () {
        var value = this.bigEndian ? this.buffer.readInt32BE(this.offset) : this.buffer.readInt32LE(this.offset);
        this.offset += 4;
        return value;
    };
    BufferStream.prototype.nextFloat = function () {
        var value = this.bigEndian ? this.buffer.readFloatBE(this.offset) : this.buffer.readFloatLE(this.offset);
        this.offset += 4;
        return value;
    };
    BufferStream.prototype.nextDouble = function () {
        var value = this.bigEndian ? this.buffer.readDoubleBE(this.offset) : this.buffer.readDoubleLE(this.offset);
        this.offset += 8;
        return value;
    };
    BufferStream.prototype.nextBuffer = function (length) {
        var value = this.buffer.slice(this.offset, this.offset + length);
        this.offset += length;
        return value;
    };
    BufferStream.prototype.remainingLength = function () {
        return this.endPosition - this.offset;
    };
    BufferStream.prototype.nextString = function (length) {
        var value = this.buffer.toString('utf8', this.offset, this.offset + length);
        this.offset += length;
        return value;
    };
    BufferStream.prototype.mark = function () {
        var self = this;
        return {
            openWithOffset: function (offset) {
                offset = (offset || 0) + this.offset;
                return new BufferStream(self.buffer, offset, self.endPosition - offset, self.bigEndian);
            },
            offset: this.offset
        };
    };
    BufferStream.prototype.offsetFrom = function (marker) {
        return this.offset - marker.offset;
    };
    BufferStream.prototype.skip = function (amount) {
        this.offset += amount;
    };
    BufferStream.prototype.branch = function (offset, length) {
        length = typeof length === 'number' ? length : this.endPosition - (this.offset + offset);
        return new BufferStream(this.buffer, this.offset + offset, length, this.bigEndian);
    };
    return BufferStream;
}());
exports.BufferStream = BufferStream;
//# sourceMappingURL=BufferStream.js.map

/***/ }),

/***/ "./node_modules/ts-exif-parser/lib/DOMBufferStream.js":
/*!************************************************************!*\
  !*** ./node_modules/ts-exif-parser/lib/DOMBufferStream.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {


/*jslint browser: true, devel: true, bitwise: false, debug: true, eqeq: false, es5: true, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: false, unparam: false, sloppy: true, stupid: false, sub: false, todo: true, lets: true, white: true */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DOMBufferStream = void 0;
var DOMBufferStream = /** @class */ (function () {
    function DOMBufferStream(arrayBuffer, offset, length, bigEndian, global, parentOffset) {
        this.arrayBuffer = arrayBuffer;
        this.offset = offset;
        this.length = length;
        this.bigEndian = bigEndian;
        this.global = global;
        this.parentOffset = parentOffset;
        this.global = global;
        offset = offset || 0;
        length = length || (arrayBuffer.byteLength - offset);
        this.arrayBuffer = arrayBuffer.slice(offset, offset + length);
        this.view = new global.DataView(this.arrayBuffer, 0, this.arrayBuffer.byteLength);
        this.setBigEndian(bigEndian);
        this.offset = 0;
        this.parentOffset = (parentOffset || 0) + offset;
    }
    DOMBufferStream.prototype.setBigEndian = function (bigEndian) {
        this.littleEndian = !bigEndian;
    };
    DOMBufferStream.prototype.nextUInt8 = function () {
        var value = this.view.getUint8(this.offset);
        this.offset += 1;
        return value;
    };
    DOMBufferStream.prototype.nextInt8 = function () {
        var value = this.view.getInt8(this.offset);
        this.offset += 1;
        return value;
    };
    DOMBufferStream.prototype.nextUInt16 = function () {
        var value = this.view.getUint16(this.offset, this.littleEndian);
        this.offset += 2;
        return value;
    };
    DOMBufferStream.prototype.nextUInt32 = function () {
        var value = this.view.getUint32(this.offset, this.littleEndian);
        this.offset += 4;
        return value;
    };
    DOMBufferStream.prototype.nextInt16 = function () {
        var value = this.view.getInt16(this.offset, this.littleEndian);
        this.offset += 2;
        return value;
    };
    DOMBufferStream.prototype.nextInt32 = function () {
        var value = this.view.getInt32(this.offset, this.littleEndian);
        this.offset += 4;
        return value;
    };
    DOMBufferStream.prototype.nextFloat = function () {
        var value = this.view.getFloat32(this.offset, this.littleEndian);
        this.offset += 4;
        return value;
    };
    DOMBufferStream.prototype.nextDouble = function () {
        var value = this.view.getFloat64(this.offset, this.littleEndian);
        this.offset += 8;
        return value;
    };
    DOMBufferStream.prototype.nextBuffer = function (length) {
        //this won't work in IE10
        var value = this.arrayBuffer.slice(this.offset, this.offset + length);
        this.offset += length;
        return value;
    };
    DOMBufferStream.prototype.remainingLength = function () {
        return this.arrayBuffer.byteLength - this.offset;
    };
    DOMBufferStream.prototype.nextString = function (length) {
        var value = this.arrayBuffer.slice(this.offset, this.offset + length);
        value = String.fromCharCode.apply(null, new this.global.Uint8Array(value));
        this.offset += length;
        return value;
    };
    DOMBufferStream.prototype.mark = function () {
        var self = this;
        return {
            openWithOffset: function (offset) {
                offset = (offset || 0) + this.offset;
                return new DOMBufferStream(self.arrayBuffer, offset, self.arrayBuffer.byteLength - offset, !self.littleEndian, self.global, self.parentOffset);
            },
            offset: this.offset,
            getParentOffset: function () {
                return self.parentOffset;
            }
        };
    };
    DOMBufferStream.prototype.offsetFrom = function (marker) {
        return this.parentOffset + this.offset - (marker.offset + marker.getParentOffset());
    };
    DOMBufferStream.prototype.skip = function (amount) {
        this.offset += amount;
    };
    DOMBufferStream.prototype.branch = function (offset, length) {
        length = typeof length === 'number' ? length : this.arrayBuffer.byteLength - (this.offset + offset);
        return new DOMBufferStream(this.arrayBuffer, this.offset + offset, length, !this.littleEndian, this.global, this.parentOffset);
    };
    return DOMBufferStream;
}());
exports.DOMBufferStream = DOMBufferStream;
//# sourceMappingURL=DOMBufferStream.js.map

/***/ }),

/***/ "./node_modules/ts-exif-parser/lib/DateUtil.js":
/*!*****************************************************!*\
  !*** ./node_modules/ts-exif-parser/lib/DateUtil.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DateUtil = void 0;
var DateUtil = /** @class */ (function () {
    function DateUtil() {
    }
    DateUtil.parseNumber = function (s) {
        return parseInt(s, 10);
    };
    /**
     * take date (year, month, day) and time (hour, minutes, seconds) digits in UTC
     * and return a timestamp in seconds
     * @param dateParts
     * @param timeParts
     * @returns {number}
     */
    DateUtil.parseDateTimeParts = function (dateParts, timeParts) {
        dateParts = dateParts.map(DateUtil.parseNumber);
        timeParts = timeParts.map(DateUtil.parseNumber);
        var year = dateParts[0];
        var month = dateParts[1] - 1;
        var day = dateParts[2];
        var hours = timeParts[0];
        var minutes = timeParts[1];
        var seconds = timeParts[2];
        var date = Date.UTC(year, month, day, hours, minutes, seconds, 0);
        var timestamp = date / 1000;
        return timestamp;
    };
    /**
     * parse date with "2004-09-04T23:39:06-08:00" format,
     * one of the formats supported by ISO 8601, and
     * convert to utc timestamp in seconds
     * @param dateTimeStr
     * @returns {number}
     */
    DateUtil.parseDateWithTimezoneFormat = function (dateTimeStr) {
        var dateParts = dateTimeStr.substr(0, 10).split('-');
        var timeParts = dateTimeStr.substr(11, 8).split(':');
        var timezoneStr = dateTimeStr.substr(19, 6);
        var timezoneParts = timezoneStr.split(':').map(DateUtil.parseNumber);
        var timezoneOffset = (timezoneParts[0] * DateUtil.hours) +
            (timezoneParts[1] * DateUtil.minutes);
        var timestamp = DateUtil.parseDateTimeParts(dateParts, timeParts);
        //minus because the timezoneOffset describes
        //how much the described time is ahead of UTC
        timestamp -= timezoneOffset;
        if (typeof timestamp === 'number' && !isNaN(timestamp)) {
            return timestamp;
        }
    };
    /**
     * parse date with "YYYY:MM:DD hh:mm:ss" format, convert to utc timestamp in seconds
     * @param dateTimeStr
     * @returns {number}
     */
    DateUtil.parseDateWithSpecFormat = function (dateTimeStr) {
        var parts = dateTimeStr.split(' '), dateParts = parts[0].split(':'), timeParts = parts[1].split(':');
        var timestamp = DateUtil.parseDateTimeParts(dateParts, timeParts);
        if (typeof timestamp === 'number' && !isNaN(timestamp)) {
            return timestamp;
        }
    };
    DateUtil.parseExifDate = function (dateTimeStr) {
        //some easy checks to determine two common date formats
        //is the date in the standard "YYYY:MM:DD hh:mm:ss" format?
        var isSpecFormat = dateTimeStr.length === 19 &&
            dateTimeStr.charAt(4) === ':';
        //is the date in the non-standard format,
        //"2004-09-04T23:39:06-08:00" to include a timezone?
        var isTimezoneFormat = dateTimeStr.length === 25 &&
            dateTimeStr.charAt(10) === 'T';
        var timestamp;
        if (isTimezoneFormat) {
            return DateUtil.parseDateWithTimezoneFormat(dateTimeStr);
        }
        else if (isSpecFormat) {
            return DateUtil.parseDateWithSpecFormat(dateTimeStr);
        }
    };
    //in seconds
    DateUtil.hours = 3600;
    DateUtil.minutes = 60;
    return DateUtil;
}());
exports.DateUtil = DateUtil;
//# sourceMappingURL=DateUtil.js.map

/***/ }),

/***/ "./node_modules/ts-exif-parser/lib/ExifData.js":
/*!*****************************************************!*\
  !*** ./node_modules/ts-exif-parser/lib/ExifData.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExifData = exports.ThumbnailTypes = exports.OrientationTypes = void 0;
var JpegParser_1 = __webpack_require__(/*! ./JpegParser */ "./node_modules/ts-exif-parser/lib/JpegParser.js");
var OrientationTypes;
(function (OrientationTypes) {
    OrientationTypes[OrientationTypes["TOP_LEFT"] = 1] = "TOP_LEFT";
    OrientationTypes[OrientationTypes["TOP_RIGHT"] = 2] = "TOP_RIGHT";
    OrientationTypes[OrientationTypes["BOTTOM_RIGHT"] = 3] = "BOTTOM_RIGHT";
    OrientationTypes[OrientationTypes["BOTTOM_LEFT"] = 4] = "BOTTOM_LEFT";
    OrientationTypes[OrientationTypes["LEFT_TOP"] = 5] = "LEFT_TOP";
    OrientationTypes[OrientationTypes["RIGHT_TOP"] = 6] = "RIGHT_TOP";
    OrientationTypes[OrientationTypes["RIGHT_BOTTOM"] = 7] = "RIGHT_BOTTOM";
    OrientationTypes[OrientationTypes["LEFT_BOTTOM"] = 8] = "LEFT_BOTTOM";
})(OrientationTypes = exports.OrientationTypes || (exports.OrientationTypes = {}));
var ThumbnailTypes;
(function (ThumbnailTypes) {
    ThumbnailTypes[ThumbnailTypes["jpeg"] = 6] = "jpeg";
    ThumbnailTypes[ThumbnailTypes["tiff"] = 1] = "tiff";
})(ThumbnailTypes = exports.ThumbnailTypes || (exports.ThumbnailTypes = {}));
var ExifData = /** @class */ (function () {
    function ExifData(startMarker, tags, imageSize, thumbnailOffset, thumbnailLength, thumbnailType, app1Offset) {
        this.startMarker = startMarker;
        this.tags = tags;
        this.imageSize = imageSize;
        this.thumbnailOffset = thumbnailOffset;
        this.thumbnailLength = thumbnailLength;
        this.thumbnailType = thumbnailType;
        this.app1Offset = app1Offset;
    }
    ExifData.prototype.hasThumbnail = function (mime) {
        if (!this.thumbnailOffset || !this.thumbnailLength) {
            return false;
        }
        if (typeof mime !== 'string') {
            return true;
        }
        if (mime.toLowerCase().trim() === 'image/jpeg') {
            return this.thumbnailType === ThumbnailTypes.jpeg;
        }
        if (mime.toLowerCase().trim() === 'image/tiff') {
            return this.thumbnailType === ThumbnailTypes.tiff;
        }
        return false;
    };
    ExifData.prototype.getThumbnailOffset = function () {
        return this.app1Offset + 6 + this.thumbnailOffset;
    };
    ExifData.prototype.getThumbnailLength = function () {
        return this.thumbnailLength;
    };
    ExifData.prototype.getThumbnailBuffer = function () {
        return this.getThumbnailStream().nextBuffer(this.thumbnailLength);
    };
    ExifData.prototype.getThumbnailStream = function () {
        return this.startMarker.openWithOffset(this.getThumbnailOffset());
    };
    ExifData.prototype.getImageSize = function () {
        return this.imageSize;
    };
    ExifData.prototype.getThumbnailSize = function () {
        var stream = this.getThumbnailStream(), size;
        JpegParser_1.JpegParser.parseSections(stream, function (sectionType, sectionStream) {
            if (JpegParser_1.JpegParser.getSectionName(sectionType).name === 'SOF') {
                size = JpegParser_1.JpegParser.getSizeFromSOFSection(sectionStream);
            }
        });
        return size;
    };
    return ExifData;
}());
exports.ExifData = ExifData;
//# sourceMappingURL=ExifData.js.map

/***/ }),

/***/ "./node_modules/ts-exif-parser/lib/ExifParser.js":
/*!*******************************************************!*\
  !*** ./node_modules/ts-exif-parser/lib/ExifParser.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExifParser = void 0;
/*jslint browser: true, devel: true, bitwise: false, debug: true, eqeq: false, es5: true, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: false, unparam: false, sloppy: true, stupid: false, sub: false, todo: true, lets: true, white: true */
var simplify_1 = __webpack_require__(/*! ./simplify */ "./node_modules/ts-exif-parser/lib/simplify.js");
var JpegParser_1 = __webpack_require__(/*! ./JpegParser */ "./node_modules/ts-exif-parser/lib/JpegParser.js");
var ExifSectionParser_1 = __webpack_require__(/*! ./ExifSectionParser */ "./node_modules/ts-exif-parser/lib/ExifSectionParser.js");
var exif_tags_1 = __webpack_require__(/*! ./exif-tags */ "./node_modules/ts-exif-parser/lib/exif-tags.js");
var ExifData_1 = __webpack_require__(/*! ./ExifData */ "./node_modules/ts-exif-parser/lib/ExifData.js");
var ExifParser = /** @class */ (function () {
    function ExifParser(stream) {
        this.stream = stream;
        this.flags = {
            readBinaryTags: false,
            resolveTagNames: true,
            simplifyValues: true,
            imageSize: true,
            hidePointers: true,
            returnTags: true
        };
    }
    ExifParser.prototype.enableBinaryFields = function (enable) {
        this.flags.readBinaryTags = enable;
        return this;
    };
    ExifParser.prototype.enablePointers = function (enable) {
        this.flags.hidePointers = !enable;
        return this;
    };
    ExifParser.prototype.enableTagNames = function (enable) {
        this.flags.resolveTagNames = enable;
        return this;
    };
    ExifParser.prototype.enableImageSize = function (enable) {
        this.flags.imageSize = enable;
        return this;
    };
    ExifParser.prototype.enableReturnTags = function (enable) {
        this.flags.returnTags = enable;
        return this;
    };
    ExifParser.prototype.enableSimpleValues = function (enable) {
        this.flags.simplifyValues = enable;
        return this;
    };
    ExifParser.prototype.parse = function () {
        var start = this.stream.mark(), stream = start.openWithOffset(0), flags = this.flags, tags, imageSize, thumbnailOffset, thumbnailLength, thumbnailType, app1Offset, getTagValue, setTagValue;
        if (flags.resolveTagNames) {
            tags = {};
            getTagValue = function (t) {
                return tags[t.name];
            };
            setTagValue = function (t, value) {
                tags[t.name] = value;
            };
        }
        else {
            tags = [];
            getTagValue = function (t) {
                var i;
                for (i = 0; i < tags.length; ++i) {
                    if (tags[i].type === t.type && tags[i].section === t.section) {
                        return tags.value;
                    }
                }
            };
            setTagValue = function (t, value) {
                var i;
                for (i = 0; i < tags.length; ++i) {
                    if (tags[i].type === t.type && tags[i].section === t.section) {
                        tags.value = value;
                        return;
                    }
                }
            };
        }
        JpegParser_1.JpegParser.parseSections(stream, function (sectionType, sectionStream) {
            var validExifHeaders, sectionOffset = sectionStream.offsetFrom(start);
            if (sectionType === 0xE1) {
                validExifHeaders = ExifSectionParser_1.ExifSectionParser.parseTags(sectionStream, function (ifdSection, tagType, value, format) {
                    //ignore binary fields if disabled
                    if (!flags.readBinaryTags && format === 7) {
                        return;
                    }
                    if (tagType === 0x0201) {
                        thumbnailOffset = value[0];
                        if (flags.hidePointers) {
                            return;
                        }
                    }
                    else if (tagType === 0x0202) {
                        thumbnailLength = value[0];
                        if (flags.hidePointers) {
                            return;
                        }
                    }
                    else if (tagType === 0x0103) {
                        thumbnailType = value[0];
                        if (flags.hidePointers) {
                            return;
                        }
                    }
                    //if flag is set to not store tags, return here after storing pointers
                    if (!flags.returnTags) {
                        return;
                    }
                    if (flags.simplifyValues) {
                        value = simplify_1.simplify.simplifyValue(value, format);
                    }
                    if (flags.resolveTagNames) {
                        var sectionTagNames = ifdSection === ExifSectionParser_1.ExifSections.GPSIFD ? exif_tags_1.Tags.GPS : exif_tags_1.Tags.Exif;
                        var name_1 = sectionTagNames[tagType];
                        if (!name_1) {
                            name_1 = exif_tags_1.Tags.Exif[tagType];
                        }
                        if (!tags.hasOwnProperty(name_1)) {
                            tags[name_1] = value;
                        }
                    }
                    else {
                        tags.push({
                            section: ifdSection,
                            type: tagType,
                            value: value
                        });
                    }
                });
                if (validExifHeaders) {
                    app1Offset = sectionOffset;
                }
            }
            else if (flags.imageSize && JpegParser_1.JpegParser.getSectionName(sectionType).name === 'SOF') {
                imageSize = JpegParser_1.JpegParser.getSizeFromSOFSection(sectionStream);
            }
        });
        if (flags.simplifyValues) {
            simplify_1.simplify.castDegreeValues(getTagValue, setTagValue);
            simplify_1.simplify.castDateValues(getTagValue, setTagValue);
        }
        return new ExifData_1.ExifData(start, tags, imageSize, thumbnailOffset, thumbnailLength, thumbnailType, app1Offset);
    };
    return ExifParser;
}());
exports.ExifParser = ExifParser;
//# sourceMappingURL=ExifParser.js.map

/***/ }),

/***/ "./node_modules/ts-exif-parser/lib/ExifParserFactory.js":
/*!**************************************************************!*\
  !*** ./node_modules/ts-exif-parser/lib/ExifParserFactory.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExifParserFactory = void 0;
var ExifParser_1 = __webpack_require__(/*! ./ExifParser */ "./node_modules/ts-exif-parser/lib/ExifParser.js");
function getGlobal() {
    return (1, eval)('this');
}
var ExifParserFactory = /** @class */ (function () {
    function ExifParserFactory() {
    }
    ExifParserFactory.create = function (buffer, global) {
        global = global || getGlobal();
        if (buffer instanceof global.ArrayBuffer) {
            var DOMBufferStream = (__webpack_require__(/*! ./DOMBufferStream */ "./node_modules/ts-exif-parser/lib/DOMBufferStream.js").DOMBufferStream);
            return new ExifParser_1.ExifParser(new DOMBufferStream(buffer, 0, buffer.byteLength, true, global));
        }
        else {
            var NodeBufferStream = (__webpack_require__(/*! ./BufferStream */ "./node_modules/ts-exif-parser/lib/BufferStream.js").BufferStream);
            return new ExifParser_1.ExifParser(new NodeBufferStream(buffer, 0, buffer.length, true));
        }
    };
    return ExifParserFactory;
}());
exports.ExifParserFactory = ExifParserFactory;
//# sourceMappingURL=ExifParserFactory.js.map

/***/ }),

/***/ "./node_modules/ts-exif-parser/lib/ExifSectionParser.js":
/*!**************************************************************!*\
  !*** ./node_modules/ts-exif-parser/lib/ExifSectionParser.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {


/*jslint browser: true, devel: true, bitwise: false, debug: true, eqeq: false, es5: true, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: false, unparam: false, sloppy: true, stupid: false, sub: false, todo: true, lets: true, white: true */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExifSectionParser = exports.ExifSections = void 0;
var ExifSections;
(function (ExifSections) {
    ExifSections[ExifSections["IFD0"] = 1] = "IFD0";
    ExifSections[ExifSections["IFD1"] = 2] = "IFD1";
    ExifSections[ExifSections["GPSIFD"] = 3] = "GPSIFD";
    ExifSections[ExifSections["SubIFD"] = 4] = "SubIFD";
    ExifSections[ExifSections["InteropIFD"] = 5] = "InteropIFD";
})(ExifSections = exports.ExifSections || (exports.ExifSections = {}));
var ExifSectionParser = /** @class */ (function () {
    function ExifSectionParser() {
    }
    ExifSectionParser.parseTags = function (stream, iterator) {
        var tiffMarker;
        try {
            tiffMarker = ExifSectionParser.readHeader(stream);
        }
        catch (e) {
            return false; //ignore APP1 sections with invalid headers
        }
        var subIfdOffset, gpsOffset, interopOffset;
        var ifd0Stream = tiffMarker.openWithOffset(stream.nextUInt32()), IFD0 = ExifSections.IFD0;
        ExifSectionParser.readIFDSection(tiffMarker, ifd0Stream, function (tagType, value, format) {
            switch (tagType) {
                case 0x8825:
                    gpsOffset = value[0];
                    break;
                case 0x8769:
                    subIfdOffset = value[0];
                    break;
                default:
                    iterator(IFD0, tagType, value, format);
                    break;
            }
        });
        var ifd1Offset = ifd0Stream.nextUInt32();
        if (ifd1Offset !== 0) {
            var ifd1Stream = tiffMarker.openWithOffset(ifd1Offset);
            ExifSectionParser.readIFDSection(tiffMarker, ifd1Stream, iterator.bind(null, ExifSections.IFD1));
        }
        if (gpsOffset) {
            var gpsStream = tiffMarker.openWithOffset(gpsOffset);
            ExifSectionParser.readIFDSection(tiffMarker, gpsStream, iterator.bind(null, ExifSections.GPSIFD));
        }
        if (subIfdOffset) {
            var subIfdStream = tiffMarker.openWithOffset(subIfdOffset), InteropIFD_1 = ExifSections.InteropIFD;
            ExifSectionParser.readIFDSection(tiffMarker, subIfdStream, function (tagType, value, format) {
                if (tagType === 0xA005) {
                    interopOffset = value[0];
                }
                else {
                    iterator(InteropIFD_1, tagType, value, format);
                }
            });
        }
        if (interopOffset) {
            var interopStream = tiffMarker.openWithOffset(interopOffset);
            ExifSectionParser.readIFDSection(tiffMarker, interopStream, iterator.bind(null, ExifSections.InteropIFD));
        }
        return true;
    };
    ExifSectionParser.readExifValue = function (format, stream) {
        switch (format) {
            case 1:
                return stream.nextUInt8();
            case 3:
                return stream.nextUInt16();
            case 4:
                return stream.nextUInt32();
            case 5:
                return [stream.nextUInt32(), stream.nextUInt32()];
            case 6:
                return stream.nextInt8();
            case 8:
                return stream.nextUInt16();
            case 9:
                return stream.nextUInt32();
            case 10:
                return [stream.nextInt32(), stream.nextInt32()];
            case 11:
                return stream.nextFloat();
            case 12:
                return stream.nextDouble();
            default:
                throw new Error('Invalid format while decoding: ' + format);
        }
    };
    ExifSectionParser.getBytesPerComponent = function (format) {
        switch (format) {
            case 1:
            case 2:
            case 6:
            case 7:
                return 1;
            case 3:
            case 8:
                return 2;
            case 4:
            case 9:
            case 11:
                return 4;
            case 5:
            case 10:
            case 12:
                return 8;
            default:
                return 0;
        }
    };
    ExifSectionParser.readExifTag = function (tiffMarker, stream) {
        var tagType = stream.nextUInt16(), format = stream.nextUInt16(), bytesPerComponent = ExifSectionParser.getBytesPerComponent(format), components = stream.nextUInt32(), valueBytes = bytesPerComponent * components, values, value, c;
        /* if the value is bigger then 4 bytes, the value is in the data section of the IFD
        and the value present in the tag is the offset starting from the tiff header. So we replace the stream
        with a stream that is located at the given offset in the data section. s*/
        if (valueBytes > 4) {
            stream = tiffMarker.openWithOffset(stream.nextUInt32());
        }
        //we don't want to read strings as arrays
        if (format === 2) {
            values = stream.nextString(components);
            //cut off \0 characters
            var lastNull = values.indexOf('\0');
            if (lastNull !== -1) {
                values = values.substr(0, lastNull);
            }
        }
        else if (format === 7) {
            values = stream.nextBuffer(components);
        }
        else if (format !== 0) {
            values = [];
            for (c = 0; c < components; ++c) {
                values.push(ExifSectionParser.readExifValue(format, stream));
            }
        }
        //since our stream is a stateful object, we need to skip remaining bytes
        //so our offset stays correct
        if (valueBytes < 4) {
            stream.skip(4 - valueBytes);
        }
        return [tagType, values, format];
    };
    ExifSectionParser.readIFDSection = function (tiffMarker, stream, iterator) {
        // make sure we can read nextUint16 byte
        if (stream.remainingLength() < 2) {
            return;
        }
        var numberOfEntries = stream.nextUInt16(), tag, i;
        for (i = 0; i < numberOfEntries; ++i) {
            tag = ExifSectionParser.readExifTag(tiffMarker, stream);
            iterator(tag[0], tag[1], tag[2]);
        }
    };
    ExifSectionParser.readHeader = function (stream) {
        var exifHeader = stream.nextString(6);
        if (exifHeader !== 'Exif\0\0') {
            throw new Error('Invalid EXIF header');
        }
        var tiffMarker = stream.mark();
        var tiffHeader = stream.nextUInt16();
        if (tiffHeader === 0x4949) {
            stream.setBigEndian(false);
        }
        else if (tiffHeader === 0x4D4D) {
            stream.setBigEndian(true);
        }
        else {
            throw new Error('Invalid TIFF header');
        }
        if (stream.nextUInt16() !== 0x002A) {
            throw new Error('Invalid TIFF data');
        }
        return tiffMarker;
    };
    return ExifSectionParser;
}());
exports.ExifSectionParser = ExifSectionParser;
//# sourceMappingURL=ExifSectionParser.js.map

/***/ }),

/***/ "./node_modules/ts-exif-parser/lib/JpegParser.js":
/*!*******************************************************!*\
  !*** ./node_modules/ts-exif-parser/lib/JpegParser.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {


/*jslint browser: true, devel: true, bitwise: false, debug: true, eqeq: false, es5: true, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: false, unparam: false, sloppy: true, stupid: false, sub: false, todo: true, vars: true, white: true */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JpegParser = void 0;
var JpegParser = /** @class */ (function () {
    function JpegParser() {
    }
    JpegParser.parseSections = function (stream, iterator) {
        var len, markerType;
        stream.setBigEndian(true);
        //stop reading the stream at the SOS (Start of Stream) marker,
        //because its length is not stored in the header so we can't
        //know where to jump to. The only marker after that is just EOI (End Of Image) anyway
        while (stream.remainingLength() > 0 && markerType !== 0xDA) {
            if (stream.nextUInt8() !== 0xFF) {
                return;
            }
            markerType = stream.nextUInt8();
            //don't read size from markers that have no datas
            if ((markerType >= 0xD0 && markerType <= 0xD9) || markerType === 0xDA) {
                len = 0;
            }
            else {
                len = stream.nextUInt16() - 2;
            }
            iterator(markerType, stream.branch(0, len));
            stream.skip(len);
        }
    };
    //stream should be located after SOF section size and in big endian mode, like passed to parseSections iterator
    JpegParser.getSizeFromSOFSection = function (stream) {
        stream.skip(1);
        return {
            height: stream.nextUInt16(),
            width: stream.nextUInt16()
        };
    };
    JpegParser.getSectionName = function (markerType) {
        var name, index;
        switch (markerType) {
            case 0xD8:
                name = 'SOI';
                break;
            case 0xC4:
                name = 'DHT';
                break;
            case 0xDB:
                name = 'DQT';
                break;
            case 0xDD:
                name = 'DRI';
                break;
            case 0xDA:
                name = 'SOS';
                break;
            case 0xFE:
                name = 'COM';
                break;
            case 0xD9:
                name = 'EOI';
                break;
            default:
                if (markerType >= 0xE0 && markerType <= 0xEF) {
                    name = 'APP';
                    index = markerType - 0xE0;
                }
                else if (markerType >= 0xC0 && markerType <= 0xCF && markerType !== 0xC4 && markerType !== 0xC8 && markerType !== 0xCC) {
                    name = 'SOF';
                    index = markerType - 0xC0;
                }
                else if (markerType >= 0xD0 && markerType <= 0xD7) {
                    name = 'RST';
                    index = markerType - 0xD0;
                }
                break;
        }
        var nameStruct = {
            name: name
        };
        if (typeof index === 'number') {
            nameStruct.index = index;
        }
        return nameStruct;
    };
    return JpegParser;
}());
exports.JpegParser = JpegParser;
//# sourceMappingURL=JpegParser.js.map

/***/ }),

/***/ "./node_modules/ts-exif-parser/lib/exif-tags.js":
/*!******************************************************!*\
  !*** ./node_modules/ts-exif-parser/lib/exif-tags.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tags = void 0;
var Tags;
(function (Tags) {
    Tags.Exif = {
        0x0001: "InteropIndex",
        0x0002: "InteropVersion",
        0x000B: "ProcessingSoftware",
        0x00FE: "SubfileType",
        0x00FF: "OldSubfileType",
        0x0100: "ImageWidth",
        0x0101: "ImageHeight",
        0x0102: "BitsPerSample",
        0x0103: "Compression",
        0x0106: "PhotometricInterpretation",
        0x0107: "Thresholding",
        0x0108: "CellWidth",
        0x0109: "CellLength",
        0x010A: "FillOrder",
        0x010D: "DocumentName",
        0x010E: "ImageDescription",
        0x010F: "Make",
        0x0110: "Model",
        0x0111: "StripOffsets",
        0x0112: "Orientation",
        0x0115: "SamplesPerPixel",
        0x0116: "RowsPerStrip",
        0x0117: "StripByteCounts",
        0x0118: "MinSampleValue",
        0x0119: "MaxSampleValue",
        0x011A: "XResolution",
        0x011B: "YResolution",
        0x011C: "PlanarConfiguration",
        0x011D: "PageName",
        0x011E: "XPosition",
        0x011F: "YPosition",
        0x0120: "FreeOffsets",
        0x0121: "FreeByteCounts",
        0x0122: "GrayResponseUnit",
        0x0123: "GrayResponseCurve",
        0x0124: "T4Options",
        0x0125: "T6Options",
        0x0128: "ResolutionUnit",
        0x0129: "PageNumber",
        0x012C: "ColorResponseUnit",
        0x012D: "TransferFunction",
        0x0131: "Software",
        0x0132: "ModifyDate",
        0x013B: "Artist",
        0x013C: "HostComputer",
        0x013D: "Predictor",
        0x013E: "WhitePoint",
        0x013F: "PrimaryChromaticities",
        0x0140: "ColorMap",
        0x0141: "HalftoneHints",
        0x0142: "TileWidth",
        0x0143: "TileLength",
        0x0144: "TileOffsets",
        0x0145: "TileByteCounts",
        0x0146: "BadFaxLines",
        0x0147: "CleanFaxData",
        0x0148: "ConsecutiveBadFaxLines",
        0x014A: "SubIFD",
        0x014C: "InkSet",
        0x014D: "InkNames",
        0x014E: "NumberofInks",
        0x0150: "DotRange",
        0x0151: "TargetPrinter",
        0x0152: "ExtraSamples",
        0x0153: "SampleFormat",
        0x0154: "SMinSampleValue",
        0x0155: "SMaxSampleValue",
        0x0156: "TransferRange",
        0x0157: "ClipPath",
        0x0158: "XClipPathUnits",
        0x0159: "YClipPathUnits",
        0x015A: "Indexed",
        0x015B: "JPEGTables",
        0x015F: "OPIProxy",
        0x0190: "GlobalParametersIFD",
        0x0191: "ProfileType",
        0x0192: "FaxProfile",
        0x0193: "CodingMethods",
        0x0194: "VersionYear",
        0x0195: "ModeNumber",
        0x01B1: "Decode",
        0x01B2: "DefaultImageColor",
        0x01B3: "T82Options",
        0x01B5: "JPEGTables",
        0x0200: "JPEGProc",
        0x0201: "ThumbnailOffset",
        0x0202: "ThumbnailLength",
        0x0203: "JPEGRestartInterval",
        0x0205: "JPEGLosslessPredictors",
        0x0206: "JPEGPointTransforms",
        0x0207: "JPEGQTables",
        0x0208: "JPEGDCTables",
        0x0209: "JPEGACTables",
        0x0211: "YCbCrCoefficients",
        0x0212: "YCbCrSubSampling",
        0x0213: "YCbCrPositioning",
        0x0214: "ReferenceBlackWhite",
        0x022F: "StripRowCounts",
        0x02BC: "ApplicationNotes",
        0x03E7: "USPTOMiscellaneous",
        0x1000: "RelatedImageFileFormat",
        0x1001: "RelatedImageWidth",
        0x1002: "RelatedImageHeight",
        0x4746: "Rating",
        0x4747: "XP_DIP_XML",
        0x4748: "StitchInfo",
        0x4749: "RatingPercent",
        0x800D: "ImageID",
        0x80A3: "WangTag1",
        0x80A4: "WangAnnotation",
        0x80A5: "WangTag3",
        0x80A6: "WangTag4",
        0x80E3: "Matteing",
        0x80E4: "DataType",
        0x80E5: "ImageDepth",
        0x80E6: "TileDepth",
        0x827D: "Model2",
        0x828D: "CFARepeatPatternDim",
        0x828E: "CFAPattern2",
        0x828F: "BatteryLevel",
        0x8290: "KodakIFD",
        0x8298: "Copyright",
        0x829A: "ExposureTime",
        0x829D: "FNumber",
        0x82A5: "MDFileTag",
        0x82A6: "MDScalePixel",
        0x82A7: "MDColorTable",
        0x82A8: "MDLabName",
        0x82A9: "MDSampleInfo",
        0x82AA: "MDPrepDate",
        0x82AB: "MDPrepTime",
        0x82AC: "MDFileUnits",
        0x830E: "PixelScale",
        0x8335: "AdventScale",
        0x8336: "AdventRevision",
        0x835C: "UIC1Tag",
        0x835D: "UIC2Tag",
        0x835E: "UIC3Tag",
        0x835F: "UIC4Tag",
        0x83BB: "IPTC-NAA",
        0x847E: "IntergraphPacketData",
        0x847F: "IntergraphFlagRegisters",
        0x8480: "IntergraphMatrix",
        0x8481: "INGRReserved",
        0x8482: "ModelTiePoint",
        0x84E0: "Site",
        0x84E1: "ColorSequence",
        0x84E2: "IT8Header",
        0x84E3: "RasterPadding",
        0x84E4: "BitsPerRunLength",
        0x84E5: "BitsPerExtendedRunLength",
        0x84E6: "ColorTable",
        0x84E7: "ImageColorIndicator",
        0x84E8: "BackgroundColorIndicator",
        0x84E9: "ImageColorValue",
        0x84EA: "BackgroundColorValue",
        0x84EB: "PixelIntensityRange",
        0x84EC: "TransparencyIndicator",
        0x84ED: "ColorCharacterization",
        0x84EE: "HCUsage",
        0x84EF: "TrapIndicator",
        0x84F0: "CMYKEquivalent",
        0x8546: "SEMInfo",
        0x8568: "AFCP_IPTC",
        0x85B8: "PixelMagicJBIGOptions",
        0x85D8: "ModelTransform",
        0x8602: "WB_GRGBLevels",
        0x8606: "LeafData",
        0x8649: "PhotoshopSettings",
        0x8769: "ExifOffset",
        0x8773: "ICC_Profile",
        0x877F: "TIFF_FXExtensions",
        0x8780: "MultiProfiles",
        0x8781: "SharedData",
        0x8782: "T88Options",
        0x87AC: "ImageLayer",
        0x87AF: "GeoTiffDirectory",
        0x87B0: "GeoTiffDoubleParams",
        0x87B1: "GeoTiffAsciiParams",
        0x8822: "ExposureProgram",
        0x8824: "SpectralSensitivity",
        0x8825: "GPSInfo",
        0x8827: "ISO",
        0x8828: "Opto-ElectricConvFactor",
        0x8829: "Interlace",
        0x882A: "TimeZoneOffset",
        0x882B: "SelfTimerMode",
        0x8830: "SensitivityType",
        0x8831: "StandardOutputSensitivity",
        0x8832: "RecommendedExposureIndex",
        0x8833: "ISOSpeed",
        0x8834: "ISOSpeedLatitudeyyy",
        0x8835: "ISOSpeedLatitudezzz",
        0x885C: "FaxRecvParams",
        0x885D: "FaxSubAddress",
        0x885E: "FaxRecvTime",
        0x888A: "LeafSubIFD",
        0x9000: "ExifVersion",
        0x9003: "DateTimeOriginal",
        0x9004: "CreateDate",
        0x9101: "ComponentsConfiguration",
        0x9102: "CompressedBitsPerPixel",
        0x9201: "ShutterSpeedValue",
        0x9202: "ApertureValue",
        0x9203: "BrightnessValue",
        0x9204: "ExposureCompensation",
        0x9205: "MaxApertureValue",
        0x9206: "SubjectDistance",
        0x9207: "MeteringMode",
        0x9208: "LightSource",
        0x9209: "Flash",
        0x920A: "FocalLength",
        0x920B: "FlashEnergy",
        0x920C: "SpatialFrequencyResponse",
        0x920D: "Noise",
        0x920E: "FocalPlaneXResolution",
        0x920F: "FocalPlaneYResolution",
        0x9210: "FocalPlaneResolutionUnit",
        0x9211: "ImageNumber",
        0x9212: "SecurityClassification",
        0x9213: "ImageHistory",
        0x9214: "SubjectArea",
        0x9215: "ExposureIndex",
        0x9216: "TIFF-EPStandardID",
        0x9217: "SensingMethod",
        0x923A: "CIP3DataFile",
        0x923B: "CIP3Sheet",
        0x923C: "CIP3Side",
        0x923F: "StoNits",
        0x927C: "MakerNote",
        0x9286: "UserComment",
        0x9290: "SubSecTime",
        0x9291: "SubSecTimeOriginal",
        0x9292: "SubSecTimeDigitized",
        0x932F: "MSDocumentText",
        0x9330: "MSPropertySetStorage",
        0x9331: "MSDocumentTextPosition",
        0x935C: "ImageSourceData",
        0x9C9B: "XPTitle",
        0x9C9C: "XPComment",
        0x9C9D: "XPAuthor",
        0x9C9E: "XPKeywords",
        0x9C9F: "XPSubject",
        0xA000: "FlashpixVersion",
        0xA001: "ColorSpace",
        0xA002: "ExifImageWidth",
        0xA003: "ExifImageHeight",
        0xA004: "RelatedSoundFile",
        0xA005: "InteropOffset",
        0xA20B: "FlashEnergy",
        0xA20C: "SpatialFrequencyResponse",
        0xA20D: "Noise",
        0xA20E: "FocalPlaneXResolution",
        0xA20F: "FocalPlaneYResolution",
        0xA210: "FocalPlaneResolutionUnit",
        0xA211: "ImageNumber",
        0xA212: "SecurityClassification",
        0xA213: "ImageHistory",
        0xA214: "SubjectLocation",
        0xA215: "ExposureIndex",
        0xA216: "TIFF-EPStandardID",
        0xA217: "SensingMethod",
        0xA300: "FileSource",
        0xA301: "SceneType",
        0xA302: "CFAPattern",
        0xA401: "CustomRendered",
        0xA402: "ExposureMode",
        0xA403: "WhiteBalance",
        0xA404: "DigitalZoomRatio",
        0xA405: "FocalLengthIn35mmFormat",
        0xA406: "SceneCaptureType",
        0xA407: "GainControl",
        0xA408: "Contrast",
        0xA409: "Saturation",
        0xA40A: "Sharpness",
        0xA40B: "DeviceSettingDescription",
        0xA40C: "SubjectDistanceRange",
        0xA420: "ImageUniqueID",
        0xA430: "OwnerName",
        0xA431: "SerialNumber",
        0xA432: "LensInfo",
        0xA433: "LensMake",
        0xA434: "LensModel",
        0xA435: "LensSerialNumber",
        0xA480: "GDALMetadata",
        0xA481: "GDALNoData",
        0xA500: "Gamma",
        0xAFC0: "ExpandSoftware",
        0xAFC1: "ExpandLens",
        0xAFC2: "ExpandFilm",
        0xAFC3: "ExpandFilterLens",
        0xAFC4: "ExpandScanner",
        0xAFC5: "ExpandFlashLamp",
        0xBC01: "PixelFormat",
        0xBC02: "Transformation",
        0xBC03: "Uncompressed",
        0xBC04: "ImageType",
        0xBC80: "ImageWidth",
        0xBC81: "ImageHeight",
        0xBC82: "WidthResolution",
        0xBC83: "HeightResolution",
        0xBCC0: "ImageOffset",
        0xBCC1: "ImageByteCount",
        0xBCC2: "AlphaOffset",
        0xBCC3: "AlphaByteCount",
        0xBCC4: "ImageDataDiscard",
        0xBCC5: "AlphaDataDiscard",
        0xC427: "OceScanjobDesc",
        0xC428: "OceApplicationSelector",
        0xC429: "OceIDNumber",
        0xC42A: "OceImageLogic",
        0xC44F: "Annotations",
        0xC4A5: "PrintIM",
        0xC580: "USPTOOriginalContentType",
        0xC612: "DNGVersion",
        0xC613: "DNGBackwardVersion",
        0xC614: "UniqueCameraModel",
        0xC615: "LocalizedCameraModel",
        0xC616: "CFAPlaneColor",
        0xC617: "CFALayout",
        0xC618: "LinearizationTable",
        0xC619: "BlackLevelRepeatDim",
        0xC61A: "BlackLevel",
        0xC61B: "BlackLevelDeltaH",
        0xC61C: "BlackLevelDeltaV",
        0xC61D: "WhiteLevel",
        0xC61E: "DefaultScale",
        0xC61F: "DefaultCropOrigin",
        0xC620: "DefaultCropSize",
        0xC621: "ColorMatrix1",
        0xC622: "ColorMatrix2",
        0xC623: "CameraCalibration1",
        0xC624: "CameraCalibration2",
        0xC625: "ReductionMatrix1",
        0xC626: "ReductionMatrix2",
        0xC627: "AnalogBalance",
        0xC628: "AsShotNeutral",
        0xC629: "AsShotWhiteXY",
        0xC62A: "BaselineExposure",
        0xC62B: "BaselineNoise",
        0xC62C: "BaselineSharpness",
        0xC62D: "BayerGreenSplit",
        0xC62E: "LinearResponseLimit",
        0xC62F: "CameraSerialNumber",
        0xC630: "DNGLensInfo",
        0xC631: "ChromaBlurRadius",
        0xC632: "AntiAliasStrength",
        0xC633: "ShadowScale",
        0xC634: "DNGPrivateData",
        0xC635: "MakerNoteSafety",
        0xC640: "RawImageSegmentation",
        0xC65A: "CalibrationIlluminant1",
        0xC65B: "CalibrationIlluminant2",
        0xC65C: "BestQualityScale",
        0xC65D: "RawDataUniqueID",
        0xC660: "AliasLayerMetadata",
        0xC68B: "OriginalRawFileName",
        0xC68C: "OriginalRawFileData",
        0xC68D: "ActiveArea",
        0xC68E: "MaskedAreas",
        0xC68F: "AsShotICCProfile",
        0xC690: "AsShotPreProfileMatrix",
        0xC691: "CurrentICCProfile",
        0xC692: "CurrentPreProfileMatrix",
        0xC6BF: "ColorimetricReference",
        0xC6D2: "PanasonicTitle",
        0xC6D3: "PanasonicTitle2",
        0xC6F3: "CameraCalibrationSig",
        0xC6F4: "ProfileCalibrationSig",
        0xC6F5: "ProfileIFD",
        0xC6F6: "AsShotProfileName",
        0xC6F7: "NoiseReductionApplied",
        0xC6F8: "ProfileName",
        0xC6F9: "ProfileHueSatMapDims",
        0xC6FA: "ProfileHueSatMapData1",
        0xC6FB: "ProfileHueSatMapData2",
        0xC6FC: "ProfileToneCurve",
        0xC6FD: "ProfileEmbedPolicy",
        0xC6FE: "ProfileCopyright",
        0xC714: "ForwardMatrix1",
        0xC715: "ForwardMatrix2",
        0xC716: "PreviewApplicationName",
        0xC717: "PreviewApplicationVersion",
        0xC718: "PreviewSettingsName",
        0xC719: "PreviewSettingsDigest",
        0xC71A: "PreviewColorSpace",
        0xC71B: "PreviewDateTime",
        0xC71C: "RawImageDigest",
        0xC71D: "OriginalRawFileDigest",
        0xC71E: "SubTileBlockSize",
        0xC71F: "RowInterleaveFactor",
        0xC725: "ProfileLookTableDims",
        0xC726: "ProfileLookTableData",
        0xC740: "OpcodeList1",
        0xC741: "OpcodeList2",
        0xC74E: "OpcodeList3",
        0xC761: "NoiseProfile",
        0xC763: "TimeCodes",
        0xC764: "FrameRate",
        0xC772: "TStop",
        0xC789: "ReelName",
        0xC791: "OriginalDefaultFinalSize",
        0xC792: "OriginalBestQualitySize",
        0xC793: "OriginalDefaultCropSize",
        0xC7A1: "CameraLabel",
        0xC7A3: "ProfileHueSatMapEncoding",
        0xC7A4: "ProfileLookTableEncoding",
        0xC7A5: "BaselineExposureOffset",
        0xC7A6: "DefaultBlackRender",
        0xC7A7: "NewRawImageDigest",
        0xC7A8: "RawToPreviewGain",
        0xC7B5: "DefaultUserCrop",
        0xEA1C: "Padding",
        0xEA1D: "OffsetSchema",
        0xFDE8: "OwnerName",
        0xFDE9: "SerialNumber",
        0xFDEA: "Lens",
        0xFE00: "KDC_IFD",
        0xFE4C: "RawFile",
        0xFE4D: "Converter",
        0xFE4E: "WhiteBalance",
        0xFE51: "Exposure",
        0xFE52: "Shadows",
        0xFE53: "Brightness",
        0xFE54: "Contrast",
        0xFE55: "Saturation",
        0xFE56: "Sharpness",
        0xFE57: "Smoothness",
        0xFE58: "MoireFilter"
    };
    Tags.GPS = {
        0x0000: 'GPSVersionID',
        0x0001: 'GPSLatitudeRef',
        0x0002: 'GPSLatitude',
        0x0003: 'GPSLongitudeRef',
        0x0004: 'GPSLongitude',
        0x0005: 'GPSAltitudeRef',
        0x0006: 'GPSAltitude',
        0x0007: 'GPSTimeStamp',
        0x0008: 'GPSSatellites',
        0x0009: 'GPSStatus',
        0x000A: 'GPSMeasureMode',
        0x000B: 'GPSDOP',
        0x000C: 'GPSSpeedRef',
        0x000D: 'GPSSpeed',
        0x000E: 'GPSTrackRef',
        0x000F: 'GPSTrack',
        0x0010: 'GPSImgDirectionRef',
        0x0011: 'GPSImgDirection',
        0x0012: 'GPSMapDatum',
        0x0013: 'GPSDestLatitudeRef',
        0x0014: 'GPSDestLatitude',
        0x0015: 'GPSDestLongitudeRef',
        0x0016: 'GPSDestLongitude',
        0x0017: 'GPSDestBearingRef',
        0x0018: 'GPSDestBearing',
        0x0019: 'GPSDestDistanceRef',
        0x001A: 'GPSDestDistance',
        0x001B: 'GPSProcessingMethod',
        0x001C: 'GPSAreaInformation',
        0x001D: 'GPSDateStamp',
        0x001E: 'GPSDifferential',
        0x001F: 'GPSHPositioningError'
    };
})(Tags = exports.Tags || (exports.Tags = {}));
//# sourceMappingURL=exif-tags.js.map

/***/ }),

/***/ "./node_modules/ts-exif-parser/lib/simplify.js":
/*!*****************************************************!*\
  !*** ./node_modules/ts-exif-parser/lib/simplify.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.simplify = void 0;
var ExifSectionParser_1 = __webpack_require__(/*! ./ExifSectionParser */ "./node_modules/ts-exif-parser/lib/ExifSectionParser.js");
var DateUtil_1 = __webpack_require__(/*! ./DateUtil */ "./node_modules/ts-exif-parser/lib/DateUtil.js");
var simplify;
(function (simplify) {
    var degreeTags = [{
            section: ExifSectionParser_1.ExifSections.GPSIFD,
            type: 0x0002,
            name: 'GPSLatitude',
            refType: 0x0001,
            refName: 'GPSLatitudeRef',
            posVal: 'N'
        },
        {
            section: ExifSectionParser_1.ExifSections.GPSIFD,
            type: 0x0004,
            name: 'GPSLongitude',
            refType: 0x0003,
            refName: 'GPSLongitudeRef',
            posVal: 'E'
        }];
    var dateTags = [{
            section: ExifSectionParser_1.ExifSections.SubIFD,
            type: 0x0132,
            name: 'ModifyDate'
        },
        {
            section: ExifSectionParser_1.ExifSections.SubIFD,
            type: 0x9003,
            name: 'DateTimeOriginal'
        },
        {
            section: ExifSectionParser_1.ExifSections.SubIFD,
            type: 0x9004,
            name: 'CreateDate'
        },
        {
            section: ExifSectionParser_1.ExifSections.SubIFD,
            type: 0x0132,
            name: 'ModifyDate',
        }];
    function castDegreeValues(getTagValue, setTagValue) {
        degreeTags.forEach(function (t) {
            var degreeVal = getTagValue(t);
            if (degreeVal) {
                var degreeRef = getTagValue({ section: t.section, type: t.refType, name: t.refName });
                var degreeNumRef = degreeRef === t.posVal ? 1 : -1;
                var degree = (degreeVal[0] + (degreeVal[1] / 60) + (degreeVal[2] / 3600)) * degreeNumRef;
                setTagValue(t, degree);
            }
        });
    }
    simplify.castDegreeValues = castDegreeValues;
    function castDateValues(getTagValue, setTagValue) {
        dateTags.forEach(function (t) {
            var dateStrVal = getTagValue(t);
            if (dateStrVal) {
                //some easy checks to determine two common date formats
                var timestamp = DateUtil_1.DateUtil.parseExifDate(dateStrVal);
                if (typeof timestamp !== 'undefined') {
                    setTagValue(t, timestamp);
                }
            }
        });
    }
    simplify.castDateValues = castDateValues;
    function simplifyValue(values, format) {
        if (Array.isArray(values)) {
            values = values.map(function (value) {
                if (format === 10 || format === 5) {
                    return value[0] / value[1];
                }
                return value;
            });
            if (values.length === 1) {
                values = values[0];
            }
        }
        return values;
    }
    simplify.simplifyValue = simplifyValue;
})(simplify = exports.simplify || (exports.simplify = {}));
//# sourceMappingURL=simplify.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./static/ts/index.ts ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ts_exif_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-exif-parser */ "./node_modules/ts-exif-parser/index.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

function handleFileSelect(evt) {
    return __awaiter(this, void 0, void 0, function () {
        var files, _i, files_1, file, buffer, parser, output;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    files = evt.target.files;
                    _i = 0, files_1 = files;
                    _a.label = 1;
                case 1:
                    if (!(_i < files_1.length)) return [3 /*break*/, 4];
                    file = files_1[_i];
                    return [4 /*yield*/, file.arrayBuffer()];
                case 2:
                    buffer = _a.sent();
                    parser = ts_exif_parser__WEBPACK_IMPORTED_MODULE_0__.ExifParserFactory.create(buffer);
                    output = parser.parse();
                    console.log(document.getElementById("list"));
                    document.getElementById("list").innerHTML = JSON.stringify(output.tags);
                    console.log(output.tags);
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
document.onreadystatechange = function () {
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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U3pCO0FBRUQsUUFBUSxDQUFDLGtCQUFrQixHQUFHO0lBQzFCLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3pGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pYW5fd2VicGFjay8uL25vZGVfbW9kdWxlcy90cy1leGlmLXBhcnNlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9pYW5fd2VicGFjay8uL25vZGVfbW9kdWxlcy90cy1leGlmLXBhcnNlci9saWIvQnVmZmVyU3RyZWFtLmpzIiwid2VicGFjazovL2lhbl93ZWJwYWNrLy4vbm9kZV9tb2R1bGVzL3RzLWV4aWYtcGFyc2VyL2xpYi9ET01CdWZmZXJTdHJlYW0uanMiLCJ3ZWJwYWNrOi8vaWFuX3dlYnBhY2svLi9ub2RlX21vZHVsZXMvdHMtZXhpZi1wYXJzZXIvbGliL0RhdGVVdGlsLmpzIiwid2VicGFjazovL2lhbl93ZWJwYWNrLy4vbm9kZV9tb2R1bGVzL3RzLWV4aWYtcGFyc2VyL2xpYi9FeGlmRGF0YS5qcyIsIndlYnBhY2s6Ly9pYW5fd2VicGFjay8uL25vZGVfbW9kdWxlcy90cy1leGlmLXBhcnNlci9saWIvRXhpZlBhcnNlci5qcyIsIndlYnBhY2s6Ly9pYW5fd2VicGFjay8uL25vZGVfbW9kdWxlcy90cy1leGlmLXBhcnNlci9saWIvRXhpZlBhcnNlckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vaWFuX3dlYnBhY2svLi9ub2RlX21vZHVsZXMvdHMtZXhpZi1wYXJzZXIvbGliL0V4aWZTZWN0aW9uUGFyc2VyLmpzIiwid2VicGFjazovL2lhbl93ZWJwYWNrLy4vbm9kZV9tb2R1bGVzL3RzLWV4aWYtcGFyc2VyL2xpYi9KcGVnUGFyc2VyLmpzIiwid2VicGFjazovL2lhbl93ZWJwYWNrLy4vbm9kZV9tb2R1bGVzL3RzLWV4aWYtcGFyc2VyL2xpYi9leGlmLXRhZ3MuanMiLCJ3ZWJwYWNrOi8vaWFuX3dlYnBhY2svLi9ub2RlX21vZHVsZXMvdHMtZXhpZi1wYXJzZXIvbGliL3NpbXBsaWZ5LmpzIiwid2VicGFjazovL2lhbl93ZWJwYWNrL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2lhbl93ZWJwYWNrL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaWFuX3dlYnBhY2svLi9zdGF0aWMvdHMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5UaHVtYm5haWxUeXBlcyA9IGV4cG9ydHMuRXhpZkRhdGEgPSBleHBvcnRzLk9yaWVudGF0aW9uVHlwZXMgPSBleHBvcnRzLkV4aWZQYXJzZXJGYWN0b3J5ID0gdm9pZCAwO1xyXG52YXIgRXhpZlBhcnNlckZhY3RvcnlfMSA9IHJlcXVpcmUoXCIuL2xpYi9FeGlmUGFyc2VyRmFjdG9yeVwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiRXhpZlBhcnNlckZhY3RvcnlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIEV4aWZQYXJzZXJGYWN0b3J5XzEuRXhpZlBhcnNlckZhY3Rvcnk7IH0gfSk7XHJcbnZhciBFeGlmRGF0YV8xID0gcmVxdWlyZShcIi4vbGliL0V4aWZEYXRhXCIpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJPcmllbnRhdGlvblR5cGVzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBFeGlmRGF0YV8xLk9yaWVudGF0aW9uVHlwZXM7IH0gfSk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkV4aWZEYXRhXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBFeGlmRGF0YV8xLkV4aWZEYXRhOyB9IH0pO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJUaHVtYm5haWxUeXBlc1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gRXhpZkRhdGFfMS5UaHVtYm5haWxUeXBlczsgfSB9KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5CdWZmZXJTdHJlYW0gPSB2b2lkIDA7XHJcbnZhciBCdWZmZXJTdHJlYW0gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBCdWZmZXJTdHJlYW0oYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCwgYmlnRW5kaWFuKSB7XHJcbiAgICAgICAgaWYgKG9mZnNldCA9PT0gdm9pZCAwKSB7IG9mZnNldCA9IDA7IH1cclxuICAgICAgICBpZiAobGVuZ3RoID09PSB2b2lkIDApIHsgbGVuZ3RoID0gYnVmZmVyLmxlbmd0aDsgfVxyXG4gICAgICAgIHRoaXMuYnVmZmVyID0gYnVmZmVyO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuYmlnRW5kaWFuID0gYmlnRW5kaWFuO1xyXG4gICAgICAgIHRoaXMuZW5kUG9zaXRpb24gPSB0aGlzLm9mZnNldCArIGxlbmd0aDtcclxuICAgICAgICB0aGlzLnNldEJpZ0VuZGlhbihiaWdFbmRpYW4pO1xyXG4gICAgfVxyXG4gICAgQnVmZmVyU3RyZWFtLnByb3RvdHlwZS5zZXRCaWdFbmRpYW4gPSBmdW5jdGlvbiAoYmlnRW5kaWFuKSB7XHJcbiAgICAgICAgdGhpcy5iaWdFbmRpYW4gPSAhIWJpZ0VuZGlhbjtcclxuICAgIH07XHJcbiAgICBCdWZmZXJTdHJlYW0ucHJvdG90eXBlLm5leHRVSW50OCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmJ1ZmZlci5yZWFkVUludDgodGhpcy5vZmZzZXQpO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IDE7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfTtcclxuICAgIEJ1ZmZlclN0cmVhbS5wcm90b3R5cGUubmV4dEludDggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5idWZmZXIucmVhZEludDgodGhpcy5vZmZzZXQpO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IDE7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfTtcclxuICAgIEJ1ZmZlclN0cmVhbS5wcm90b3R5cGUubmV4dFVJbnQxNiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmJpZ0VuZGlhbiA/IHRoaXMuYnVmZmVyLnJlYWRVSW50MTZCRSh0aGlzLm9mZnNldCkgOiB0aGlzLmJ1ZmZlci5yZWFkVUludDE2TEUodGhpcy5vZmZzZXQpO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IDI7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfTtcclxuICAgIEJ1ZmZlclN0cmVhbS5wcm90b3R5cGUubmV4dFVJbnQzMiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmJpZ0VuZGlhbiA/IHRoaXMuYnVmZmVyLnJlYWRVSW50MzJCRSh0aGlzLm9mZnNldCkgOiB0aGlzLmJ1ZmZlci5yZWFkVUludDMyTEUodGhpcy5vZmZzZXQpO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IDQ7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfTtcclxuICAgIEJ1ZmZlclN0cmVhbS5wcm90b3R5cGUubmV4dEludDE2ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuYmlnRW5kaWFuID8gdGhpcy5idWZmZXIucmVhZEludDE2QkUodGhpcy5vZmZzZXQpIDogdGhpcy5idWZmZXIucmVhZEludDE2TEUodGhpcy5vZmZzZXQpO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IDI7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfTtcclxuICAgIEJ1ZmZlclN0cmVhbS5wcm90b3R5cGUubmV4dEludDMyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuYmlnRW5kaWFuID8gdGhpcy5idWZmZXIucmVhZEludDMyQkUodGhpcy5vZmZzZXQpIDogdGhpcy5idWZmZXIucmVhZEludDMyTEUodGhpcy5vZmZzZXQpO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IDQ7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfTtcclxuICAgIEJ1ZmZlclN0cmVhbS5wcm90b3R5cGUubmV4dEZsb2F0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuYmlnRW5kaWFuID8gdGhpcy5idWZmZXIucmVhZEZsb2F0QkUodGhpcy5vZmZzZXQpIDogdGhpcy5idWZmZXIucmVhZEZsb2F0TEUodGhpcy5vZmZzZXQpO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IDQ7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfTtcclxuICAgIEJ1ZmZlclN0cmVhbS5wcm90b3R5cGUubmV4dERvdWJsZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmJpZ0VuZGlhbiA/IHRoaXMuYnVmZmVyLnJlYWREb3VibGVCRSh0aGlzLm9mZnNldCkgOiB0aGlzLmJ1ZmZlci5yZWFkRG91YmxlTEUodGhpcy5vZmZzZXQpO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IDg7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfTtcclxuICAgIEJ1ZmZlclN0cmVhbS5wcm90b3R5cGUubmV4dEJ1ZmZlciA9IGZ1bmN0aW9uIChsZW5ndGgpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmJ1ZmZlci5zbGljZSh0aGlzLm9mZnNldCwgdGhpcy5vZmZzZXQgKyBsZW5ndGgpO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IGxlbmd0aDtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9O1xyXG4gICAgQnVmZmVyU3RyZWFtLnByb3RvdHlwZS5yZW1haW5pbmdMZW5ndGggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5kUG9zaXRpb24gLSB0aGlzLm9mZnNldDtcclxuICAgIH07XHJcbiAgICBCdWZmZXJTdHJlYW0ucHJvdG90eXBlLm5leHRTdHJpbmcgPSBmdW5jdGlvbiAobGVuZ3RoKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5idWZmZXIudG9TdHJpbmcoJ3V0ZjgnLCB0aGlzLm9mZnNldCwgdGhpcy5vZmZzZXQgKyBsZW5ndGgpO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IGxlbmd0aDtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9O1xyXG4gICAgQnVmZmVyU3RyZWFtLnByb3RvdHlwZS5tYXJrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBvcGVuV2l0aE9mZnNldDogZnVuY3Rpb24gKG9mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gKG9mZnNldCB8fCAwKSArIHRoaXMub2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCdWZmZXJTdHJlYW0oc2VsZi5idWZmZXIsIG9mZnNldCwgc2VsZi5lbmRQb3NpdGlvbiAtIG9mZnNldCwgc2VsZi5iaWdFbmRpYW4pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvZmZzZXQ6IHRoaXMub2Zmc2V0XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICBCdWZmZXJTdHJlYW0ucHJvdG90eXBlLm9mZnNldEZyb20gPSBmdW5jdGlvbiAobWFya2VyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2Zmc2V0IC0gbWFya2VyLm9mZnNldDtcclxuICAgIH07XHJcbiAgICBCdWZmZXJTdHJlYW0ucHJvdG90eXBlLnNraXAgPSBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAgICAgdGhpcy5vZmZzZXQgKz0gYW1vdW50O1xyXG4gICAgfTtcclxuICAgIEJ1ZmZlclN0cmVhbS5wcm90b3R5cGUuYnJhbmNoID0gZnVuY3Rpb24gKG9mZnNldCwgbGVuZ3RoKSB7XHJcbiAgICAgICAgbGVuZ3RoID0gdHlwZW9mIGxlbmd0aCA9PT0gJ251bWJlcicgPyBsZW5ndGggOiB0aGlzLmVuZFBvc2l0aW9uIC0gKHRoaXMub2Zmc2V0ICsgb2Zmc2V0KTtcclxuICAgICAgICByZXR1cm4gbmV3IEJ1ZmZlclN0cmVhbSh0aGlzLmJ1ZmZlciwgdGhpcy5vZmZzZXQgKyBvZmZzZXQsIGxlbmd0aCwgdGhpcy5iaWdFbmRpYW4pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBCdWZmZXJTdHJlYW07XHJcbn0oKSk7XHJcbmV4cG9ydHMuQnVmZmVyU3RyZWFtID0gQnVmZmVyU3RyZWFtO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1CdWZmZXJTdHJlYW0uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8qanNsaW50IGJyb3dzZXI6IHRydWUsIGRldmVsOiB0cnVlLCBiaXR3aXNlOiBmYWxzZSwgZGVidWc6IHRydWUsIGVxZXE6IGZhbHNlLCBlczU6IHRydWUsIGV2aWw6IGZhbHNlLCBmb3JpbjogZmFsc2UsIG5ld2NhcDogZmFsc2UsIG5vbWVuOiB0cnVlLCBwbHVzcGx1czogdHJ1ZSwgcmVnZXhwOiBmYWxzZSwgdW5wYXJhbTogZmFsc2UsIHNsb3BweTogdHJ1ZSwgc3R1cGlkOiBmYWxzZSwgc3ViOiBmYWxzZSwgdG9kbzogdHJ1ZSwgbGV0czogdHJ1ZSwgd2hpdGU6IHRydWUgKi9cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkRPTUJ1ZmZlclN0cmVhbSA9IHZvaWQgMDtcclxudmFyIERPTUJ1ZmZlclN0cmVhbSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIERPTUJ1ZmZlclN0cmVhbShhcnJheUJ1ZmZlciwgb2Zmc2V0LCBsZW5ndGgsIGJpZ0VuZGlhbiwgZ2xvYmFsLCBwYXJlbnRPZmZzZXQpIHtcclxuICAgICAgICB0aGlzLmFycmF5QnVmZmVyID0gYXJyYXlCdWZmZXI7XHJcbiAgICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICAgICAgdGhpcy5iaWdFbmRpYW4gPSBiaWdFbmRpYW47XHJcbiAgICAgICAgdGhpcy5nbG9iYWwgPSBnbG9iYWw7XHJcbiAgICAgICAgdGhpcy5wYXJlbnRPZmZzZXQgPSBwYXJlbnRPZmZzZXQ7XHJcbiAgICAgICAgdGhpcy5nbG9iYWwgPSBnbG9iYWw7XHJcbiAgICAgICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XHJcbiAgICAgICAgbGVuZ3RoID0gbGVuZ3RoIHx8IChhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoIC0gb2Zmc2V0KTtcclxuICAgICAgICB0aGlzLmFycmF5QnVmZmVyID0gYXJyYXlCdWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBsZW5ndGgpO1xyXG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBnbG9iYWwuRGF0YVZpZXcodGhpcy5hcnJheUJ1ZmZlciwgMCwgdGhpcy5hcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKTtcclxuICAgICAgICB0aGlzLnNldEJpZ0VuZGlhbihiaWdFbmRpYW4pO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gMDtcclxuICAgICAgICB0aGlzLnBhcmVudE9mZnNldCA9IChwYXJlbnRPZmZzZXQgfHwgMCkgKyBvZmZzZXQ7XHJcbiAgICB9XHJcbiAgICBET01CdWZmZXJTdHJlYW0ucHJvdG90eXBlLnNldEJpZ0VuZGlhbiA9IGZ1bmN0aW9uIChiaWdFbmRpYW4pIHtcclxuICAgICAgICB0aGlzLmxpdHRsZUVuZGlhbiA9ICFiaWdFbmRpYW47XHJcbiAgICB9O1xyXG4gICAgRE9NQnVmZmVyU3RyZWFtLnByb3RvdHlwZS5uZXh0VUludDggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy52aWV3LmdldFVpbnQ4KHRoaXMub2Zmc2V0KTtcclxuICAgICAgICB0aGlzLm9mZnNldCArPSAxO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH07XHJcbiAgICBET01CdWZmZXJTdHJlYW0ucHJvdG90eXBlLm5leHRJbnQ4ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMudmlldy5nZXRJbnQ4KHRoaXMub2Zmc2V0KTtcclxuICAgICAgICB0aGlzLm9mZnNldCArPSAxO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH07XHJcbiAgICBET01CdWZmZXJTdHJlYW0ucHJvdG90eXBlLm5leHRVSW50MTYgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy52aWV3LmdldFVpbnQxNih0aGlzLm9mZnNldCwgdGhpcy5saXR0bGVFbmRpYW4pO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IDI7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfTtcclxuICAgIERPTUJ1ZmZlclN0cmVhbS5wcm90b3R5cGUubmV4dFVJbnQzMiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnZpZXcuZ2V0VWludDMyKHRoaXMub2Zmc2V0LCB0aGlzLmxpdHRsZUVuZGlhbik7XHJcbiAgICAgICAgdGhpcy5vZmZzZXQgKz0gNDtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9O1xyXG4gICAgRE9NQnVmZmVyU3RyZWFtLnByb3RvdHlwZS5uZXh0SW50MTYgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy52aWV3LmdldEludDE2KHRoaXMub2Zmc2V0LCB0aGlzLmxpdHRsZUVuZGlhbik7XHJcbiAgICAgICAgdGhpcy5vZmZzZXQgKz0gMjtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9O1xyXG4gICAgRE9NQnVmZmVyU3RyZWFtLnByb3RvdHlwZS5uZXh0SW50MzIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy52aWV3LmdldEludDMyKHRoaXMub2Zmc2V0LCB0aGlzLmxpdHRsZUVuZGlhbik7XHJcbiAgICAgICAgdGhpcy5vZmZzZXQgKz0gNDtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9O1xyXG4gICAgRE9NQnVmZmVyU3RyZWFtLnByb3RvdHlwZS5uZXh0RmxvYXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy52aWV3LmdldEZsb2F0MzIodGhpcy5vZmZzZXQsIHRoaXMubGl0dGxlRW5kaWFuKTtcclxuICAgICAgICB0aGlzLm9mZnNldCArPSA0O1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH07XHJcbiAgICBET01CdWZmZXJTdHJlYW0ucHJvdG90eXBlLm5leHREb3VibGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy52aWV3LmdldEZsb2F0NjQodGhpcy5vZmZzZXQsIHRoaXMubGl0dGxlRW5kaWFuKTtcclxuICAgICAgICB0aGlzLm9mZnNldCArPSA4O1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH07XHJcbiAgICBET01CdWZmZXJTdHJlYW0ucHJvdG90eXBlLm5leHRCdWZmZXIgPSBmdW5jdGlvbiAobGVuZ3RoKSB7XHJcbiAgICAgICAgLy90aGlzIHdvbid0IHdvcmsgaW4gSUUxMFxyXG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuYXJyYXlCdWZmZXIuc2xpY2UodGhpcy5vZmZzZXQsIHRoaXMub2Zmc2V0ICsgbGVuZ3RoKTtcclxuICAgICAgICB0aGlzLm9mZnNldCArPSBsZW5ndGg7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfTtcclxuICAgIERPTUJ1ZmZlclN0cmVhbS5wcm90b3R5cGUucmVtYWluaW5nTGVuZ3RoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFycmF5QnVmZmVyLmJ5dGVMZW5ndGggLSB0aGlzLm9mZnNldDtcclxuICAgIH07XHJcbiAgICBET01CdWZmZXJTdHJlYW0ucHJvdG90eXBlLm5leHRTdHJpbmcgPSBmdW5jdGlvbiAobGVuZ3RoKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5hcnJheUJ1ZmZlci5zbGljZSh0aGlzLm9mZnNldCwgdGhpcy5vZmZzZXQgKyBsZW5ndGgpO1xyXG4gICAgICAgIHZhbHVlID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBuZXcgdGhpcy5nbG9iYWwuVWludDhBcnJheSh2YWx1ZSkpO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IGxlbmd0aDtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9O1xyXG4gICAgRE9NQnVmZmVyU3RyZWFtLnByb3RvdHlwZS5tYXJrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBvcGVuV2l0aE9mZnNldDogZnVuY3Rpb24gKG9mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gKG9mZnNldCB8fCAwKSArIHRoaXMub2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBET01CdWZmZXJTdHJlYW0oc2VsZi5hcnJheUJ1ZmZlciwgb2Zmc2V0LCBzZWxmLmFycmF5QnVmZmVyLmJ5dGVMZW5ndGggLSBvZmZzZXQsICFzZWxmLmxpdHRsZUVuZGlhbiwgc2VsZi5nbG9iYWwsIHNlbGYucGFyZW50T2Zmc2V0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb2Zmc2V0OiB0aGlzLm9mZnNldCxcclxuICAgICAgICAgICAgZ2V0UGFyZW50T2Zmc2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5wYXJlbnRPZmZzZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIERPTUJ1ZmZlclN0cmVhbS5wcm90b3R5cGUub2Zmc2V0RnJvbSA9IGZ1bmN0aW9uIChtYXJrZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRPZmZzZXQgKyB0aGlzLm9mZnNldCAtIChtYXJrZXIub2Zmc2V0ICsgbWFya2VyLmdldFBhcmVudE9mZnNldCgpKTtcclxuICAgIH07XHJcbiAgICBET01CdWZmZXJTdHJlYW0ucHJvdG90eXBlLnNraXAgPSBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAgICAgdGhpcy5vZmZzZXQgKz0gYW1vdW50O1xyXG4gICAgfTtcclxuICAgIERPTUJ1ZmZlclN0cmVhbS5wcm90b3R5cGUuYnJhbmNoID0gZnVuY3Rpb24gKG9mZnNldCwgbGVuZ3RoKSB7XHJcbiAgICAgICAgbGVuZ3RoID0gdHlwZW9mIGxlbmd0aCA9PT0gJ251bWJlcicgPyBsZW5ndGggOiB0aGlzLmFycmF5QnVmZmVyLmJ5dGVMZW5ndGggLSAodGhpcy5vZmZzZXQgKyBvZmZzZXQpO1xyXG4gICAgICAgIHJldHVybiBuZXcgRE9NQnVmZmVyU3RyZWFtKHRoaXMuYXJyYXlCdWZmZXIsIHRoaXMub2Zmc2V0ICsgb2Zmc2V0LCBsZW5ndGgsICF0aGlzLmxpdHRsZUVuZGlhbiwgdGhpcy5nbG9iYWwsIHRoaXMucGFyZW50T2Zmc2V0KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gRE9NQnVmZmVyU3RyZWFtO1xyXG59KCkpO1xyXG5leHBvcnRzLkRPTUJ1ZmZlclN0cmVhbSA9IERPTUJ1ZmZlclN0cmVhbTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RE9NQnVmZmVyU3RyZWFtLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuRGF0ZVV0aWwgPSB2b2lkIDA7XHJcbnZhciBEYXRlVXRpbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIERhdGVVdGlsKCkge1xyXG4gICAgfVxyXG4gICAgRGF0ZVV0aWwucGFyc2VOdW1iZXIgPSBmdW5jdGlvbiAocykge1xyXG4gICAgICAgIHJldHVybiBwYXJzZUludChzLCAxMCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiB0YWtlIGRhdGUgKHllYXIsIG1vbnRoLCBkYXkpIGFuZCB0aW1lIChob3VyLCBtaW51dGVzLCBzZWNvbmRzKSBkaWdpdHMgaW4gVVRDXHJcbiAgICAgKiBhbmQgcmV0dXJuIGEgdGltZXN0YW1wIGluIHNlY29uZHNcclxuICAgICAqIEBwYXJhbSBkYXRlUGFydHNcclxuICAgICAqIEBwYXJhbSB0aW1lUGFydHNcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIERhdGVVdGlsLnBhcnNlRGF0ZVRpbWVQYXJ0cyA9IGZ1bmN0aW9uIChkYXRlUGFydHMsIHRpbWVQYXJ0cykge1xyXG4gICAgICAgIGRhdGVQYXJ0cyA9IGRhdGVQYXJ0cy5tYXAoRGF0ZVV0aWwucGFyc2VOdW1iZXIpO1xyXG4gICAgICAgIHRpbWVQYXJ0cyA9IHRpbWVQYXJ0cy5tYXAoRGF0ZVV0aWwucGFyc2VOdW1iZXIpO1xyXG4gICAgICAgIHZhciB5ZWFyID0gZGF0ZVBhcnRzWzBdO1xyXG4gICAgICAgIHZhciBtb250aCA9IGRhdGVQYXJ0c1sxXSAtIDE7XHJcbiAgICAgICAgdmFyIGRheSA9IGRhdGVQYXJ0c1syXTtcclxuICAgICAgICB2YXIgaG91cnMgPSB0aW1lUGFydHNbMF07XHJcbiAgICAgICAgdmFyIG1pbnV0ZXMgPSB0aW1lUGFydHNbMV07XHJcbiAgICAgICAgdmFyIHNlY29uZHMgPSB0aW1lUGFydHNbMl07XHJcbiAgICAgICAgdmFyIGRhdGUgPSBEYXRlLlVUQyh5ZWFyLCBtb250aCwgZGF5LCBob3VycywgbWludXRlcywgc2Vjb25kcywgMCk7XHJcbiAgICAgICAgdmFyIHRpbWVzdGFtcCA9IGRhdGUgLyAxMDAwO1xyXG4gICAgICAgIHJldHVybiB0aW1lc3RhbXA7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBwYXJzZSBkYXRlIHdpdGggXCIyMDA0LTA5LTA0VDIzOjM5OjA2LTA4OjAwXCIgZm9ybWF0LFxyXG4gICAgICogb25lIG9mIHRoZSBmb3JtYXRzIHN1cHBvcnRlZCBieSBJU08gODYwMSwgYW5kXHJcbiAgICAgKiBjb252ZXJ0IHRvIHV0YyB0aW1lc3RhbXAgaW4gc2Vjb25kc1xyXG4gICAgICogQHBhcmFtIGRhdGVUaW1lU3RyXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBEYXRlVXRpbC5wYXJzZURhdGVXaXRoVGltZXpvbmVGb3JtYXQgPSBmdW5jdGlvbiAoZGF0ZVRpbWVTdHIpIHtcclxuICAgICAgICB2YXIgZGF0ZVBhcnRzID0gZGF0ZVRpbWVTdHIuc3Vic3RyKDAsIDEwKS5zcGxpdCgnLScpO1xyXG4gICAgICAgIHZhciB0aW1lUGFydHMgPSBkYXRlVGltZVN0ci5zdWJzdHIoMTEsIDgpLnNwbGl0KCc6Jyk7XHJcbiAgICAgICAgdmFyIHRpbWV6b25lU3RyID0gZGF0ZVRpbWVTdHIuc3Vic3RyKDE5LCA2KTtcclxuICAgICAgICB2YXIgdGltZXpvbmVQYXJ0cyA9IHRpbWV6b25lU3RyLnNwbGl0KCc6JykubWFwKERhdGVVdGlsLnBhcnNlTnVtYmVyKTtcclxuICAgICAgICB2YXIgdGltZXpvbmVPZmZzZXQgPSAodGltZXpvbmVQYXJ0c1swXSAqIERhdGVVdGlsLmhvdXJzKSArXHJcbiAgICAgICAgICAgICh0aW1lem9uZVBhcnRzWzFdICogRGF0ZVV0aWwubWludXRlcyk7XHJcbiAgICAgICAgdmFyIHRpbWVzdGFtcCA9IERhdGVVdGlsLnBhcnNlRGF0ZVRpbWVQYXJ0cyhkYXRlUGFydHMsIHRpbWVQYXJ0cyk7XHJcbiAgICAgICAgLy9taW51cyBiZWNhdXNlIHRoZSB0aW1lem9uZU9mZnNldCBkZXNjcmliZXNcclxuICAgICAgICAvL2hvdyBtdWNoIHRoZSBkZXNjcmliZWQgdGltZSBpcyBhaGVhZCBvZiBVVENcclxuICAgICAgICB0aW1lc3RhbXAgLT0gdGltZXpvbmVPZmZzZXQ7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aW1lc3RhbXAgPT09ICdudW1iZXInICYmICFpc05hTih0aW1lc3RhbXApKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aW1lc3RhbXA7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogcGFyc2UgZGF0ZSB3aXRoIFwiWVlZWTpNTTpERCBoaDptbTpzc1wiIGZvcm1hdCwgY29udmVydCB0byB1dGMgdGltZXN0YW1wIGluIHNlY29uZHNcclxuICAgICAqIEBwYXJhbSBkYXRlVGltZVN0clxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgRGF0ZVV0aWwucGFyc2VEYXRlV2l0aFNwZWNGb3JtYXQgPSBmdW5jdGlvbiAoZGF0ZVRpbWVTdHIpIHtcclxuICAgICAgICB2YXIgcGFydHMgPSBkYXRlVGltZVN0ci5zcGxpdCgnICcpLCBkYXRlUGFydHMgPSBwYXJ0c1swXS5zcGxpdCgnOicpLCB0aW1lUGFydHMgPSBwYXJ0c1sxXS5zcGxpdCgnOicpO1xyXG4gICAgICAgIHZhciB0aW1lc3RhbXAgPSBEYXRlVXRpbC5wYXJzZURhdGVUaW1lUGFydHMoZGF0ZVBhcnRzLCB0aW1lUGFydHMpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGltZXN0YW1wID09PSAnbnVtYmVyJyAmJiAhaXNOYU4odGltZXN0YW1wKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGltZXN0YW1wO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBEYXRlVXRpbC5wYXJzZUV4aWZEYXRlID0gZnVuY3Rpb24gKGRhdGVUaW1lU3RyKSB7XHJcbiAgICAgICAgLy9zb21lIGVhc3kgY2hlY2tzIHRvIGRldGVybWluZSB0d28gY29tbW9uIGRhdGUgZm9ybWF0c1xyXG4gICAgICAgIC8vaXMgdGhlIGRhdGUgaW4gdGhlIHN0YW5kYXJkIFwiWVlZWTpNTTpERCBoaDptbTpzc1wiIGZvcm1hdD9cclxuICAgICAgICB2YXIgaXNTcGVjRm9ybWF0ID0gZGF0ZVRpbWVTdHIubGVuZ3RoID09PSAxOSAmJlxyXG4gICAgICAgICAgICBkYXRlVGltZVN0ci5jaGFyQXQoNCkgPT09ICc6JztcclxuICAgICAgICAvL2lzIHRoZSBkYXRlIGluIHRoZSBub24tc3RhbmRhcmQgZm9ybWF0LFxyXG4gICAgICAgIC8vXCIyMDA0LTA5LTA0VDIzOjM5OjA2LTA4OjAwXCIgdG8gaW5jbHVkZSBhIHRpbWV6b25lP1xyXG4gICAgICAgIHZhciBpc1RpbWV6b25lRm9ybWF0ID0gZGF0ZVRpbWVTdHIubGVuZ3RoID09PSAyNSAmJlxyXG4gICAgICAgICAgICBkYXRlVGltZVN0ci5jaGFyQXQoMTApID09PSAnVCc7XHJcbiAgICAgICAgdmFyIHRpbWVzdGFtcDtcclxuICAgICAgICBpZiAoaXNUaW1lem9uZUZvcm1hdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gRGF0ZVV0aWwucGFyc2VEYXRlV2l0aFRpbWV6b25lRm9ybWF0KGRhdGVUaW1lU3RyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaXNTcGVjRm9ybWF0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRlVXRpbC5wYXJzZURhdGVXaXRoU3BlY0Zvcm1hdChkYXRlVGltZVN0cik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vaW4gc2Vjb25kc1xyXG4gICAgRGF0ZVV0aWwuaG91cnMgPSAzNjAwO1xyXG4gICAgRGF0ZVV0aWwubWludXRlcyA9IDYwO1xyXG4gICAgcmV0dXJuIERhdGVVdGlsO1xyXG59KCkpO1xyXG5leHBvcnRzLkRhdGVVdGlsID0gRGF0ZVV0aWw7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURhdGVVdGlsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuRXhpZkRhdGEgPSBleHBvcnRzLlRodW1ibmFpbFR5cGVzID0gZXhwb3J0cy5PcmllbnRhdGlvblR5cGVzID0gdm9pZCAwO1xyXG52YXIgSnBlZ1BhcnNlcl8xID0gcmVxdWlyZShcIi4vSnBlZ1BhcnNlclwiKTtcclxudmFyIE9yaWVudGF0aW9uVHlwZXM7XHJcbihmdW5jdGlvbiAoT3JpZW50YXRpb25UeXBlcykge1xyXG4gICAgT3JpZW50YXRpb25UeXBlc1tPcmllbnRhdGlvblR5cGVzW1wiVE9QX0xFRlRcIl0gPSAxXSA9IFwiVE9QX0xFRlRcIjtcclxuICAgIE9yaWVudGF0aW9uVHlwZXNbT3JpZW50YXRpb25UeXBlc1tcIlRPUF9SSUdIVFwiXSA9IDJdID0gXCJUT1BfUklHSFRcIjtcclxuICAgIE9yaWVudGF0aW9uVHlwZXNbT3JpZW50YXRpb25UeXBlc1tcIkJPVFRPTV9SSUdIVFwiXSA9IDNdID0gXCJCT1RUT01fUklHSFRcIjtcclxuICAgIE9yaWVudGF0aW9uVHlwZXNbT3JpZW50YXRpb25UeXBlc1tcIkJPVFRPTV9MRUZUXCJdID0gNF0gPSBcIkJPVFRPTV9MRUZUXCI7XHJcbiAgICBPcmllbnRhdGlvblR5cGVzW09yaWVudGF0aW9uVHlwZXNbXCJMRUZUX1RPUFwiXSA9IDVdID0gXCJMRUZUX1RPUFwiO1xyXG4gICAgT3JpZW50YXRpb25UeXBlc1tPcmllbnRhdGlvblR5cGVzW1wiUklHSFRfVE9QXCJdID0gNl0gPSBcIlJJR0hUX1RPUFwiO1xyXG4gICAgT3JpZW50YXRpb25UeXBlc1tPcmllbnRhdGlvblR5cGVzW1wiUklHSFRfQk9UVE9NXCJdID0gN10gPSBcIlJJR0hUX0JPVFRPTVwiO1xyXG4gICAgT3JpZW50YXRpb25UeXBlc1tPcmllbnRhdGlvblR5cGVzW1wiTEVGVF9CT1RUT01cIl0gPSA4XSA9IFwiTEVGVF9CT1RUT01cIjtcclxufSkoT3JpZW50YXRpb25UeXBlcyA9IGV4cG9ydHMuT3JpZW50YXRpb25UeXBlcyB8fCAoZXhwb3J0cy5PcmllbnRhdGlvblR5cGVzID0ge30pKTtcclxudmFyIFRodW1ibmFpbFR5cGVzO1xyXG4oZnVuY3Rpb24gKFRodW1ibmFpbFR5cGVzKSB7XHJcbiAgICBUaHVtYm5haWxUeXBlc1tUaHVtYm5haWxUeXBlc1tcImpwZWdcIl0gPSA2XSA9IFwianBlZ1wiO1xyXG4gICAgVGh1bWJuYWlsVHlwZXNbVGh1bWJuYWlsVHlwZXNbXCJ0aWZmXCJdID0gMV0gPSBcInRpZmZcIjtcclxufSkoVGh1bWJuYWlsVHlwZXMgPSBleHBvcnRzLlRodW1ibmFpbFR5cGVzIHx8IChleHBvcnRzLlRodW1ibmFpbFR5cGVzID0ge30pKTtcclxudmFyIEV4aWZEYXRhID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRXhpZkRhdGEoc3RhcnRNYXJrZXIsIHRhZ3MsIGltYWdlU2l6ZSwgdGh1bWJuYWlsT2Zmc2V0LCB0aHVtYm5haWxMZW5ndGgsIHRodW1ibmFpbFR5cGUsIGFwcDFPZmZzZXQpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0TWFya2VyID0gc3RhcnRNYXJrZXI7XHJcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcclxuICAgICAgICB0aGlzLmltYWdlU2l6ZSA9IGltYWdlU2l6ZTtcclxuICAgICAgICB0aGlzLnRodW1ibmFpbE9mZnNldCA9IHRodW1ibmFpbE9mZnNldDtcclxuICAgICAgICB0aGlzLnRodW1ibmFpbExlbmd0aCA9IHRodW1ibmFpbExlbmd0aDtcclxuICAgICAgICB0aGlzLnRodW1ibmFpbFR5cGUgPSB0aHVtYm5haWxUeXBlO1xyXG4gICAgICAgIHRoaXMuYXBwMU9mZnNldCA9IGFwcDFPZmZzZXQ7XHJcbiAgICB9XHJcbiAgICBFeGlmRGF0YS5wcm90b3R5cGUuaGFzVGh1bWJuYWlsID0gZnVuY3Rpb24gKG1pbWUpIHtcclxuICAgICAgICBpZiAoIXRoaXMudGh1bWJuYWlsT2Zmc2V0IHx8ICF0aGlzLnRodW1ibmFpbExlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgbWltZSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtaW1lLnRvTG93ZXJDYXNlKCkudHJpbSgpID09PSAnaW1hZ2UvanBlZycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGh1bWJuYWlsVHlwZSA9PT0gVGh1bWJuYWlsVHlwZXMuanBlZztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1pbWUudG9Mb3dlckNhc2UoKS50cmltKCkgPT09ICdpbWFnZS90aWZmJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50aHVtYm5haWxUeXBlID09PSBUaHVtYm5haWxUeXBlcy50aWZmO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgRXhpZkRhdGEucHJvdG90eXBlLmdldFRodW1ibmFpbE9mZnNldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hcHAxT2Zmc2V0ICsgNiArIHRoaXMudGh1bWJuYWlsT2Zmc2V0O1xyXG4gICAgfTtcclxuICAgIEV4aWZEYXRhLnByb3RvdHlwZS5nZXRUaHVtYm5haWxMZW5ndGggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGh1bWJuYWlsTGVuZ3RoO1xyXG4gICAgfTtcclxuICAgIEV4aWZEYXRhLnByb3RvdHlwZS5nZXRUaHVtYm5haWxCdWZmZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGh1bWJuYWlsU3RyZWFtKCkubmV4dEJ1ZmZlcih0aGlzLnRodW1ibmFpbExlbmd0aCk7XHJcbiAgICB9O1xyXG4gICAgRXhpZkRhdGEucHJvdG90eXBlLmdldFRodW1ibmFpbFN0cmVhbSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydE1hcmtlci5vcGVuV2l0aE9mZnNldCh0aGlzLmdldFRodW1ibmFpbE9mZnNldCgpKTtcclxuICAgIH07XHJcbiAgICBFeGlmRGF0YS5wcm90b3R5cGUuZ2V0SW1hZ2VTaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlU2l6ZTtcclxuICAgIH07XHJcbiAgICBFeGlmRGF0YS5wcm90b3R5cGUuZ2V0VGh1bWJuYWlsU2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc3RyZWFtID0gdGhpcy5nZXRUaHVtYm5haWxTdHJlYW0oKSwgc2l6ZTtcclxuICAgICAgICBKcGVnUGFyc2VyXzEuSnBlZ1BhcnNlci5wYXJzZVNlY3Rpb25zKHN0cmVhbSwgZnVuY3Rpb24gKHNlY3Rpb25UeXBlLCBzZWN0aW9uU3RyZWFtKSB7XHJcbiAgICAgICAgICAgIGlmIChKcGVnUGFyc2VyXzEuSnBlZ1BhcnNlci5nZXRTZWN0aW9uTmFtZShzZWN0aW9uVHlwZSkubmFtZSA9PT0gJ1NPRicpIHtcclxuICAgICAgICAgICAgICAgIHNpemUgPSBKcGVnUGFyc2VyXzEuSnBlZ1BhcnNlci5nZXRTaXplRnJvbVNPRlNlY3Rpb24oc2VjdGlvblN0cmVhbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc2l6ZTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gRXhpZkRhdGE7XHJcbn0oKSk7XHJcbmV4cG9ydHMuRXhpZkRhdGEgPSBFeGlmRGF0YTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RXhpZkRhdGEuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5FeGlmUGFyc2VyID0gdm9pZCAwO1xyXG4vKmpzbGludCBicm93c2VyOiB0cnVlLCBkZXZlbDogdHJ1ZSwgYml0d2lzZTogZmFsc2UsIGRlYnVnOiB0cnVlLCBlcWVxOiBmYWxzZSwgZXM1OiB0cnVlLCBldmlsOiBmYWxzZSwgZm9yaW46IGZhbHNlLCBuZXdjYXA6IGZhbHNlLCBub21lbjogdHJ1ZSwgcGx1c3BsdXM6IHRydWUsIHJlZ2V4cDogZmFsc2UsIHVucGFyYW06IGZhbHNlLCBzbG9wcHk6IHRydWUsIHN0dXBpZDogZmFsc2UsIHN1YjogZmFsc2UsIHRvZG86IHRydWUsIGxldHM6IHRydWUsIHdoaXRlOiB0cnVlICovXHJcbnZhciBzaW1wbGlmeV8xID0gcmVxdWlyZShcIi4vc2ltcGxpZnlcIik7XHJcbnZhciBKcGVnUGFyc2VyXzEgPSByZXF1aXJlKFwiLi9KcGVnUGFyc2VyXCIpO1xyXG52YXIgRXhpZlNlY3Rpb25QYXJzZXJfMSA9IHJlcXVpcmUoXCIuL0V4aWZTZWN0aW9uUGFyc2VyXCIpO1xyXG52YXIgZXhpZl90YWdzXzEgPSByZXF1aXJlKFwiLi9leGlmLXRhZ3NcIik7XHJcbnZhciBFeGlmRGF0YV8xID0gcmVxdWlyZShcIi4vRXhpZkRhdGFcIik7XHJcbnZhciBFeGlmUGFyc2VyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRXhpZlBhcnNlcihzdHJlYW0pIHtcclxuICAgICAgICB0aGlzLnN0cmVhbSA9IHN0cmVhbTtcclxuICAgICAgICB0aGlzLmZsYWdzID0ge1xyXG4gICAgICAgICAgICByZWFkQmluYXJ5VGFnczogZmFsc2UsXHJcbiAgICAgICAgICAgIHJlc29sdmVUYWdOYW1lczogdHJ1ZSxcclxuICAgICAgICAgICAgc2ltcGxpZnlWYWx1ZXM6IHRydWUsXHJcbiAgICAgICAgICAgIGltYWdlU2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgaGlkZVBvaW50ZXJzOiB0cnVlLFxyXG4gICAgICAgICAgICByZXR1cm5UYWdzOiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIEV4aWZQYXJzZXIucHJvdG90eXBlLmVuYWJsZUJpbmFyeUZpZWxkcyA9IGZ1bmN0aW9uIChlbmFibGUpIHtcclxuICAgICAgICB0aGlzLmZsYWdzLnJlYWRCaW5hcnlUYWdzID0gZW5hYmxlO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIEV4aWZQYXJzZXIucHJvdG90eXBlLmVuYWJsZVBvaW50ZXJzID0gZnVuY3Rpb24gKGVuYWJsZSkge1xyXG4gICAgICAgIHRoaXMuZmxhZ3MuaGlkZVBvaW50ZXJzID0gIWVuYWJsZTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBFeGlmUGFyc2VyLnByb3RvdHlwZS5lbmFibGVUYWdOYW1lcyA9IGZ1bmN0aW9uIChlbmFibGUpIHtcclxuICAgICAgICB0aGlzLmZsYWdzLnJlc29sdmVUYWdOYW1lcyA9IGVuYWJsZTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBFeGlmUGFyc2VyLnByb3RvdHlwZS5lbmFibGVJbWFnZVNpemUgPSBmdW5jdGlvbiAoZW5hYmxlKSB7XHJcbiAgICAgICAgdGhpcy5mbGFncy5pbWFnZVNpemUgPSBlbmFibGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgRXhpZlBhcnNlci5wcm90b3R5cGUuZW5hYmxlUmV0dXJuVGFncyA9IGZ1bmN0aW9uIChlbmFibGUpIHtcclxuICAgICAgICB0aGlzLmZsYWdzLnJldHVyblRhZ3MgPSBlbmFibGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgRXhpZlBhcnNlci5wcm90b3R5cGUuZW5hYmxlU2ltcGxlVmFsdWVzID0gZnVuY3Rpb24gKGVuYWJsZSkge1xyXG4gICAgICAgIHRoaXMuZmxhZ3Muc2ltcGxpZnlWYWx1ZXMgPSBlbmFibGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgRXhpZlBhcnNlci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5zdHJlYW0ubWFyaygpLCBzdHJlYW0gPSBzdGFydC5vcGVuV2l0aE9mZnNldCgwKSwgZmxhZ3MgPSB0aGlzLmZsYWdzLCB0YWdzLCBpbWFnZVNpemUsIHRodW1ibmFpbE9mZnNldCwgdGh1bWJuYWlsTGVuZ3RoLCB0aHVtYm5haWxUeXBlLCBhcHAxT2Zmc2V0LCBnZXRUYWdWYWx1ZSwgc2V0VGFnVmFsdWU7XHJcbiAgICAgICAgaWYgKGZsYWdzLnJlc29sdmVUYWdOYW1lcykge1xyXG4gICAgICAgICAgICB0YWdzID0ge307XHJcbiAgICAgICAgICAgIGdldFRhZ1ZhbHVlID0gZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0YWdzW3QubmFtZV07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHNldFRhZ1ZhbHVlID0gZnVuY3Rpb24gKHQsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0YWdzW3QubmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRhZ3MgPSBbXTtcclxuICAgICAgICAgICAgZ2V0VGFnVmFsdWUgPSBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGFncy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWdzW2ldLnR5cGUgPT09IHQudHlwZSAmJiB0YWdzW2ldLnNlY3Rpb24gPT09IHQuc2VjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFncy52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHNldFRhZ1ZhbHVlID0gZnVuY3Rpb24gKHQsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaTtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0YWdzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhZ3NbaV0udHlwZSA9PT0gdC50eXBlICYmIHRhZ3NbaV0uc2VjdGlvbiA9PT0gdC5zZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZ3MudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgSnBlZ1BhcnNlcl8xLkpwZWdQYXJzZXIucGFyc2VTZWN0aW9ucyhzdHJlYW0sIGZ1bmN0aW9uIChzZWN0aW9uVHlwZSwgc2VjdGlvblN0cmVhbSkge1xyXG4gICAgICAgICAgICB2YXIgdmFsaWRFeGlmSGVhZGVycywgc2VjdGlvbk9mZnNldCA9IHNlY3Rpb25TdHJlYW0ub2Zmc2V0RnJvbShzdGFydCk7XHJcbiAgICAgICAgICAgIGlmIChzZWN0aW9uVHlwZSA9PT0gMHhFMSkge1xyXG4gICAgICAgICAgICAgICAgdmFsaWRFeGlmSGVhZGVycyA9IEV4aWZTZWN0aW9uUGFyc2VyXzEuRXhpZlNlY3Rpb25QYXJzZXIucGFyc2VUYWdzKHNlY3Rpb25TdHJlYW0sIGZ1bmN0aW9uIChpZmRTZWN0aW9uLCB0YWdUeXBlLCB2YWx1ZSwgZm9ybWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZ25vcmUgYmluYXJ5IGZpZWxkcyBpZiBkaXNhYmxlZFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZmxhZ3MucmVhZEJpbmFyeVRhZ3MgJiYgZm9ybWF0ID09PSA3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhZ1R5cGUgPT09IDB4MDIwMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxPZmZzZXQgPSB2YWx1ZVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZsYWdzLmhpZGVQb2ludGVycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRhZ1R5cGUgPT09IDB4MDIwMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxMZW5ndGggPSB2YWx1ZVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZsYWdzLmhpZGVQb2ludGVycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRhZ1R5cGUgPT09IDB4MDEwMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxUeXBlID0gdmFsdWVbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmbGFncy5oaWRlUG9pbnRlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2lmIGZsYWcgaXMgc2V0IHRvIG5vdCBzdG9yZSB0YWdzLCByZXR1cm4gaGVyZSBhZnRlciBzdG9yaW5nIHBvaW50ZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmbGFncy5yZXR1cm5UYWdzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZsYWdzLnNpbXBsaWZ5VmFsdWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gc2ltcGxpZnlfMS5zaW1wbGlmeS5zaW1wbGlmeVZhbHVlKHZhbHVlLCBmb3JtYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmxhZ3MucmVzb2x2ZVRhZ05hbWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWN0aW9uVGFnTmFtZXMgPSBpZmRTZWN0aW9uID09PSBFeGlmU2VjdGlvblBhcnNlcl8xLkV4aWZTZWN0aW9ucy5HUFNJRkQgPyBleGlmX3RhZ3NfMS5UYWdzLkdQUyA6IGV4aWZfdGFnc18xLlRhZ3MuRXhpZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWVfMSA9IHNlY3Rpb25UYWdOYW1lc1t0YWdUeXBlXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFuYW1lXzEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVfMSA9IGV4aWZfdGFnc18xLlRhZ3MuRXhpZlt0YWdUeXBlXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRhZ3MuaGFzT3duUHJvcGVydHkobmFtZV8xKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnc1tuYW1lXzFdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZ3MucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uOiBpZmRTZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdGFnVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWxpZEV4aWZIZWFkZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwMU9mZnNldCA9IHNlY3Rpb25PZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZmxhZ3MuaW1hZ2VTaXplICYmIEpwZWdQYXJzZXJfMS5KcGVnUGFyc2VyLmdldFNlY3Rpb25OYW1lKHNlY3Rpb25UeXBlKS5uYW1lID09PSAnU09GJykge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VTaXplID0gSnBlZ1BhcnNlcl8xLkpwZWdQYXJzZXIuZ2V0U2l6ZUZyb21TT0ZTZWN0aW9uKHNlY3Rpb25TdHJlYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGZsYWdzLnNpbXBsaWZ5VmFsdWVzKSB7XHJcbiAgICAgICAgICAgIHNpbXBsaWZ5XzEuc2ltcGxpZnkuY2FzdERlZ3JlZVZhbHVlcyhnZXRUYWdWYWx1ZSwgc2V0VGFnVmFsdWUpO1xyXG4gICAgICAgICAgICBzaW1wbGlmeV8xLnNpbXBsaWZ5LmNhc3REYXRlVmFsdWVzKGdldFRhZ1ZhbHVlLCBzZXRUYWdWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgRXhpZkRhdGFfMS5FeGlmRGF0YShzdGFydCwgdGFncywgaW1hZ2VTaXplLCB0aHVtYm5haWxPZmZzZXQsIHRodW1ibmFpbExlbmd0aCwgdGh1bWJuYWlsVHlwZSwgYXBwMU9mZnNldCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEV4aWZQYXJzZXI7XHJcbn0oKSk7XHJcbmV4cG9ydHMuRXhpZlBhcnNlciA9IEV4aWZQYXJzZXI7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUV4aWZQYXJzZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5FeGlmUGFyc2VyRmFjdG9yeSA9IHZvaWQgMDtcclxudmFyIEV4aWZQYXJzZXJfMSA9IHJlcXVpcmUoXCIuL0V4aWZQYXJzZXJcIik7XHJcbmZ1bmN0aW9uIGdldEdsb2JhbCgpIHtcclxuICAgIHJldHVybiAoMSwgZXZhbCkoJ3RoaXMnKTtcclxufVxyXG52YXIgRXhpZlBhcnNlckZhY3RvcnkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBFeGlmUGFyc2VyRmFjdG9yeSgpIHtcclxuICAgIH1cclxuICAgIEV4aWZQYXJzZXJGYWN0b3J5LmNyZWF0ZSA9IGZ1bmN0aW9uIChidWZmZXIsIGdsb2JhbCkge1xyXG4gICAgICAgIGdsb2JhbCA9IGdsb2JhbCB8fCBnZXRHbG9iYWwoKTtcclxuICAgICAgICBpZiAoYnVmZmVyIGluc3RhbmNlb2YgZ2xvYmFsLkFycmF5QnVmZmVyKSB7XHJcbiAgICAgICAgICAgIHZhciBET01CdWZmZXJTdHJlYW0gPSByZXF1aXJlKCcuL0RPTUJ1ZmZlclN0cmVhbScpLkRPTUJ1ZmZlclN0cmVhbTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBFeGlmUGFyc2VyXzEuRXhpZlBhcnNlcihuZXcgRE9NQnVmZmVyU3RyZWFtKGJ1ZmZlciwgMCwgYnVmZmVyLmJ5dGVMZW5ndGgsIHRydWUsIGdsb2JhbCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIE5vZGVCdWZmZXJTdHJlYW0gPSByZXF1aXJlKCcuL0J1ZmZlclN0cmVhbScpLkJ1ZmZlclN0cmVhbTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBFeGlmUGFyc2VyXzEuRXhpZlBhcnNlcihuZXcgTm9kZUJ1ZmZlclN0cmVhbShidWZmZXIsIDAsIGJ1ZmZlci5sZW5ndGgsIHRydWUpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEV4aWZQYXJzZXJGYWN0b3J5O1xyXG59KCkpO1xyXG5leHBvcnRzLkV4aWZQYXJzZXJGYWN0b3J5ID0gRXhpZlBhcnNlckZhY3Rvcnk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUV4aWZQYXJzZXJGYWN0b3J5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG4vKmpzbGludCBicm93c2VyOiB0cnVlLCBkZXZlbDogdHJ1ZSwgYml0d2lzZTogZmFsc2UsIGRlYnVnOiB0cnVlLCBlcWVxOiBmYWxzZSwgZXM1OiB0cnVlLCBldmlsOiBmYWxzZSwgZm9yaW46IGZhbHNlLCBuZXdjYXA6IGZhbHNlLCBub21lbjogdHJ1ZSwgcGx1c3BsdXM6IHRydWUsIHJlZ2V4cDogZmFsc2UsIHVucGFyYW06IGZhbHNlLCBzbG9wcHk6IHRydWUsIHN0dXBpZDogZmFsc2UsIHN1YjogZmFsc2UsIHRvZG86IHRydWUsIGxldHM6IHRydWUsIHdoaXRlOiB0cnVlICovXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5FeGlmU2VjdGlvblBhcnNlciA9IGV4cG9ydHMuRXhpZlNlY3Rpb25zID0gdm9pZCAwO1xyXG52YXIgRXhpZlNlY3Rpb25zO1xyXG4oZnVuY3Rpb24gKEV4aWZTZWN0aW9ucykge1xyXG4gICAgRXhpZlNlY3Rpb25zW0V4aWZTZWN0aW9uc1tcIklGRDBcIl0gPSAxXSA9IFwiSUZEMFwiO1xyXG4gICAgRXhpZlNlY3Rpb25zW0V4aWZTZWN0aW9uc1tcIklGRDFcIl0gPSAyXSA9IFwiSUZEMVwiO1xyXG4gICAgRXhpZlNlY3Rpb25zW0V4aWZTZWN0aW9uc1tcIkdQU0lGRFwiXSA9IDNdID0gXCJHUFNJRkRcIjtcclxuICAgIEV4aWZTZWN0aW9uc1tFeGlmU2VjdGlvbnNbXCJTdWJJRkRcIl0gPSA0XSA9IFwiU3ViSUZEXCI7XHJcbiAgICBFeGlmU2VjdGlvbnNbRXhpZlNlY3Rpb25zW1wiSW50ZXJvcElGRFwiXSA9IDVdID0gXCJJbnRlcm9wSUZEXCI7XHJcbn0pKEV4aWZTZWN0aW9ucyA9IGV4cG9ydHMuRXhpZlNlY3Rpb25zIHx8IChleHBvcnRzLkV4aWZTZWN0aW9ucyA9IHt9KSk7XHJcbnZhciBFeGlmU2VjdGlvblBhcnNlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEV4aWZTZWN0aW9uUGFyc2VyKCkge1xyXG4gICAgfVxyXG4gICAgRXhpZlNlY3Rpb25QYXJzZXIucGFyc2VUYWdzID0gZnVuY3Rpb24gKHN0cmVhbSwgaXRlcmF0b3IpIHtcclxuICAgICAgICB2YXIgdGlmZk1hcmtlcjtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aWZmTWFya2VyID0gRXhpZlNlY3Rpb25QYXJzZXIucmVhZEhlYWRlcihzdHJlYW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vaWdub3JlIEFQUDEgc2VjdGlvbnMgd2l0aCBpbnZhbGlkIGhlYWRlcnNcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHN1YklmZE9mZnNldCwgZ3BzT2Zmc2V0LCBpbnRlcm9wT2Zmc2V0O1xyXG4gICAgICAgIHZhciBpZmQwU3RyZWFtID0gdGlmZk1hcmtlci5vcGVuV2l0aE9mZnNldChzdHJlYW0ubmV4dFVJbnQzMigpKSwgSUZEMCA9IEV4aWZTZWN0aW9ucy5JRkQwO1xyXG4gICAgICAgIEV4aWZTZWN0aW9uUGFyc2VyLnJlYWRJRkRTZWN0aW9uKHRpZmZNYXJrZXIsIGlmZDBTdHJlYW0sIGZ1bmN0aW9uICh0YWdUeXBlLCB2YWx1ZSwgZm9ybWF0KSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGFnVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAweDg4MjU6XHJcbiAgICAgICAgICAgICAgICAgICAgZ3BzT2Zmc2V0ID0gdmFsdWVbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDB4ODc2OTpcclxuICAgICAgICAgICAgICAgICAgICBzdWJJZmRPZmZzZXQgPSB2YWx1ZVswXTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlcmF0b3IoSUZEMCwgdGFnVHlwZSwgdmFsdWUsIGZvcm1hdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgaWZkMU9mZnNldCA9IGlmZDBTdHJlYW0ubmV4dFVJbnQzMigpO1xyXG4gICAgICAgIGlmIChpZmQxT2Zmc2V0ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHZhciBpZmQxU3RyZWFtID0gdGlmZk1hcmtlci5vcGVuV2l0aE9mZnNldChpZmQxT2Zmc2V0KTtcclxuICAgICAgICAgICAgRXhpZlNlY3Rpb25QYXJzZXIucmVhZElGRFNlY3Rpb24odGlmZk1hcmtlciwgaWZkMVN0cmVhbSwgaXRlcmF0b3IuYmluZChudWxsLCBFeGlmU2VjdGlvbnMuSUZEMSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZ3BzT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgIHZhciBncHNTdHJlYW0gPSB0aWZmTWFya2VyLm9wZW5XaXRoT2Zmc2V0KGdwc09mZnNldCk7XHJcbiAgICAgICAgICAgIEV4aWZTZWN0aW9uUGFyc2VyLnJlYWRJRkRTZWN0aW9uKHRpZmZNYXJrZXIsIGdwc1N0cmVhbSwgaXRlcmF0b3IuYmluZChudWxsLCBFeGlmU2VjdGlvbnMuR1BTSUZEKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdWJJZmRPZmZzZXQpIHtcclxuICAgICAgICAgICAgdmFyIHN1YklmZFN0cmVhbSA9IHRpZmZNYXJrZXIub3BlbldpdGhPZmZzZXQoc3ViSWZkT2Zmc2V0KSwgSW50ZXJvcElGRF8xID0gRXhpZlNlY3Rpb25zLkludGVyb3BJRkQ7XHJcbiAgICAgICAgICAgIEV4aWZTZWN0aW9uUGFyc2VyLnJlYWRJRkRTZWN0aW9uKHRpZmZNYXJrZXIsIHN1YklmZFN0cmVhbSwgZnVuY3Rpb24gKHRhZ1R5cGUsIHZhbHVlLCBmb3JtYXQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0YWdUeXBlID09PSAweEEwMDUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnRlcm9wT2Zmc2V0ID0gdmFsdWVbMF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVyYXRvcihJbnRlcm9wSUZEXzEsIHRhZ1R5cGUsIHZhbHVlLCBmb3JtYXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGludGVyb3BPZmZzZXQpIHtcclxuICAgICAgICAgICAgdmFyIGludGVyb3BTdHJlYW0gPSB0aWZmTWFya2VyLm9wZW5XaXRoT2Zmc2V0KGludGVyb3BPZmZzZXQpO1xyXG4gICAgICAgICAgICBFeGlmU2VjdGlvblBhcnNlci5yZWFkSUZEU2VjdGlvbih0aWZmTWFya2VyLCBpbnRlcm9wU3RyZWFtLCBpdGVyYXRvci5iaW5kKG51bGwsIEV4aWZTZWN0aW9ucy5JbnRlcm9wSUZEKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxuICAgIEV4aWZTZWN0aW9uUGFyc2VyLnJlYWRFeGlmVmFsdWUgPSBmdW5jdGlvbiAoZm9ybWF0LCBzdHJlYW0pIHtcclxuICAgICAgICBzd2l0Y2ggKGZvcm1hdCkge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyZWFtLm5leHRVSW50OCgpO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyZWFtLm5leHRVSW50MTYoKTtcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0cmVhbS5uZXh0VUludDMyKCk7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBbc3RyZWFtLm5leHRVSW50MzIoKSwgc3RyZWFtLm5leHRVSW50MzIoKV07XHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdHJlYW0ubmV4dEludDgoKTtcclxuICAgICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0cmVhbS5uZXh0VUludDE2KCk7XHJcbiAgICAgICAgICAgIGNhc2UgOTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdHJlYW0ubmV4dFVJbnQzMigpO1xyXG4gICAgICAgICAgICBjYXNlIDEwOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtzdHJlYW0ubmV4dEludDMyKCksIHN0cmVhbS5uZXh0SW50MzIoKV07XHJcbiAgICAgICAgICAgIGNhc2UgMTE6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyZWFtLm5leHRGbG9hdCgpO1xyXG4gICAgICAgICAgICBjYXNlIDEyOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0cmVhbS5uZXh0RG91YmxlKCk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZm9ybWF0IHdoaWxlIGRlY29kaW5nOiAnICsgZm9ybWF0KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgRXhpZlNlY3Rpb25QYXJzZXIuZ2V0Qnl0ZXNQZXJDb21wb25lbnQgPSBmdW5jdGlvbiAoZm9ybWF0KSB7XHJcbiAgICAgICAgc3dpdGNoIChmb3JtYXQpIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDI7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgY2FzZSA5OlxyXG4gICAgICAgICAgICBjYXNlIDExOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDQ7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgY2FzZSAxMDpcclxuICAgICAgICAgICAgY2FzZSAxMjpcclxuICAgICAgICAgICAgICAgIHJldHVybiA4O1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEV4aWZTZWN0aW9uUGFyc2VyLnJlYWRFeGlmVGFnID0gZnVuY3Rpb24gKHRpZmZNYXJrZXIsIHN0cmVhbSkge1xyXG4gICAgICAgIHZhciB0YWdUeXBlID0gc3RyZWFtLm5leHRVSW50MTYoKSwgZm9ybWF0ID0gc3RyZWFtLm5leHRVSW50MTYoKSwgYnl0ZXNQZXJDb21wb25lbnQgPSBFeGlmU2VjdGlvblBhcnNlci5nZXRCeXRlc1BlckNvbXBvbmVudChmb3JtYXQpLCBjb21wb25lbnRzID0gc3RyZWFtLm5leHRVSW50MzIoKSwgdmFsdWVCeXRlcyA9IGJ5dGVzUGVyQ29tcG9uZW50ICogY29tcG9uZW50cywgdmFsdWVzLCB2YWx1ZSwgYztcclxuICAgICAgICAvKiBpZiB0aGUgdmFsdWUgaXMgYmlnZ2VyIHRoZW4gNCBieXRlcywgdGhlIHZhbHVlIGlzIGluIHRoZSBkYXRhIHNlY3Rpb24gb2YgdGhlIElGRFxyXG4gICAgICAgIGFuZCB0aGUgdmFsdWUgcHJlc2VudCBpbiB0aGUgdGFnIGlzIHRoZSBvZmZzZXQgc3RhcnRpbmcgZnJvbSB0aGUgdGlmZiBoZWFkZXIuIFNvIHdlIHJlcGxhY2UgdGhlIHN0cmVhbVxyXG4gICAgICAgIHdpdGggYSBzdHJlYW0gdGhhdCBpcyBsb2NhdGVkIGF0IHRoZSBnaXZlbiBvZmZzZXQgaW4gdGhlIGRhdGEgc2VjdGlvbi4gcyovXHJcbiAgICAgICAgaWYgKHZhbHVlQnl0ZXMgPiA0KSB7XHJcbiAgICAgICAgICAgIHN0cmVhbSA9IHRpZmZNYXJrZXIub3BlbldpdGhPZmZzZXQoc3RyZWFtLm5leHRVSW50MzIoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vd2UgZG9uJ3Qgd2FudCB0byByZWFkIHN0cmluZ3MgYXMgYXJyYXlzXHJcbiAgICAgICAgaWYgKGZvcm1hdCA9PT0gMikge1xyXG4gICAgICAgICAgICB2YWx1ZXMgPSBzdHJlYW0ubmV4dFN0cmluZyhjb21wb25lbnRzKTtcclxuICAgICAgICAgICAgLy9jdXQgb2ZmIFxcMCBjaGFyYWN0ZXJzXHJcbiAgICAgICAgICAgIHZhciBsYXN0TnVsbCA9IHZhbHVlcy5pbmRleE9mKCdcXDAnKTtcclxuICAgICAgICAgICAgaWYgKGxhc3ROdWxsICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzLnN1YnN0cigwLCBsYXN0TnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZm9ybWF0ID09PSA3KSB7XHJcbiAgICAgICAgICAgIHZhbHVlcyA9IHN0cmVhbS5uZXh0QnVmZmVyKGNvbXBvbmVudHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChmb3JtYXQgIT09IDApIHtcclxuICAgICAgICAgICAgdmFsdWVzID0gW107XHJcbiAgICAgICAgICAgIGZvciAoYyA9IDA7IGMgPCBjb21wb25lbnRzOyArK2MpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKEV4aWZTZWN0aW9uUGFyc2VyLnJlYWRFeGlmVmFsdWUoZm9ybWF0LCBzdHJlYW0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL3NpbmNlIG91ciBzdHJlYW0gaXMgYSBzdGF0ZWZ1bCBvYmplY3QsIHdlIG5lZWQgdG8gc2tpcCByZW1haW5pbmcgYnl0ZXNcclxuICAgICAgICAvL3NvIG91ciBvZmZzZXQgc3RheXMgY29ycmVjdFxyXG4gICAgICAgIGlmICh2YWx1ZUJ5dGVzIDwgNCkge1xyXG4gICAgICAgICAgICBzdHJlYW0uc2tpcCg0IC0gdmFsdWVCeXRlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbdGFnVHlwZSwgdmFsdWVzLCBmb3JtYXRdO1xyXG4gICAgfTtcclxuICAgIEV4aWZTZWN0aW9uUGFyc2VyLnJlYWRJRkRTZWN0aW9uID0gZnVuY3Rpb24gKHRpZmZNYXJrZXIsIHN0cmVhbSwgaXRlcmF0b3IpIHtcclxuICAgICAgICAvLyBtYWtlIHN1cmUgd2UgY2FuIHJlYWQgbmV4dFVpbnQxNiBieXRlXHJcbiAgICAgICAgaWYgKHN0cmVhbS5yZW1haW5pbmdMZW5ndGgoKSA8IDIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbnVtYmVyT2ZFbnRyaWVzID0gc3RyZWFtLm5leHRVSW50MTYoKSwgdGFnLCBpO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBudW1iZXJPZkVudHJpZXM7ICsraSkge1xyXG4gICAgICAgICAgICB0YWcgPSBFeGlmU2VjdGlvblBhcnNlci5yZWFkRXhpZlRhZyh0aWZmTWFya2VyLCBzdHJlYW0pO1xyXG4gICAgICAgICAgICBpdGVyYXRvcih0YWdbMF0sIHRhZ1sxXSwgdGFnWzJdKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgRXhpZlNlY3Rpb25QYXJzZXIucmVhZEhlYWRlciA9IGZ1bmN0aW9uIChzdHJlYW0pIHtcclxuICAgICAgICB2YXIgZXhpZkhlYWRlciA9IHN0cmVhbS5uZXh0U3RyaW5nKDYpO1xyXG4gICAgICAgIGlmIChleGlmSGVhZGVyICE9PSAnRXhpZlxcMFxcMCcpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIEVYSUYgaGVhZGVyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB0aWZmTWFya2VyID0gc3RyZWFtLm1hcmsoKTtcclxuICAgICAgICB2YXIgdGlmZkhlYWRlciA9IHN0cmVhbS5uZXh0VUludDE2KCk7XHJcbiAgICAgICAgaWYgKHRpZmZIZWFkZXIgPT09IDB4NDk0OSkge1xyXG4gICAgICAgICAgICBzdHJlYW0uc2V0QmlnRW5kaWFuKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGlmZkhlYWRlciA9PT0gMHg0RDREKSB7XHJcbiAgICAgICAgICAgIHN0cmVhbS5zZXRCaWdFbmRpYW4odHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgVElGRiBoZWFkZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0cmVhbS5uZXh0VUludDE2KCkgIT09IDB4MDAyQSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgVElGRiBkYXRhJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aWZmTWFya2VyO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBFeGlmU2VjdGlvblBhcnNlcjtcclxufSgpKTtcclxuZXhwb3J0cy5FeGlmU2VjdGlvblBhcnNlciA9IEV4aWZTZWN0aW9uUGFyc2VyO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1FeGlmU2VjdGlvblBhcnNlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuLypqc2xpbnQgYnJvd3NlcjogdHJ1ZSwgZGV2ZWw6IHRydWUsIGJpdHdpc2U6IGZhbHNlLCBkZWJ1ZzogdHJ1ZSwgZXFlcTogZmFsc2UsIGVzNTogdHJ1ZSwgZXZpbDogZmFsc2UsIGZvcmluOiBmYWxzZSwgbmV3Y2FwOiBmYWxzZSwgbm9tZW46IHRydWUsIHBsdXNwbHVzOiB0cnVlLCByZWdleHA6IGZhbHNlLCB1bnBhcmFtOiBmYWxzZSwgc2xvcHB5OiB0cnVlLCBzdHVwaWQ6IGZhbHNlLCBzdWI6IGZhbHNlLCB0b2RvOiB0cnVlLCB2YXJzOiB0cnVlLCB3aGl0ZTogdHJ1ZSAqL1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuSnBlZ1BhcnNlciA9IHZvaWQgMDtcclxudmFyIEpwZWdQYXJzZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBKcGVnUGFyc2VyKCkge1xyXG4gICAgfVxyXG4gICAgSnBlZ1BhcnNlci5wYXJzZVNlY3Rpb25zID0gZnVuY3Rpb24gKHN0cmVhbSwgaXRlcmF0b3IpIHtcclxuICAgICAgICB2YXIgbGVuLCBtYXJrZXJUeXBlO1xyXG4gICAgICAgIHN0cmVhbS5zZXRCaWdFbmRpYW4odHJ1ZSk7XHJcbiAgICAgICAgLy9zdG9wIHJlYWRpbmcgdGhlIHN0cmVhbSBhdCB0aGUgU09TIChTdGFydCBvZiBTdHJlYW0pIG1hcmtlcixcclxuICAgICAgICAvL2JlY2F1c2UgaXRzIGxlbmd0aCBpcyBub3Qgc3RvcmVkIGluIHRoZSBoZWFkZXIgc28gd2UgY2FuJ3RcclxuICAgICAgICAvL2tub3cgd2hlcmUgdG8ganVtcCB0by4gVGhlIG9ubHkgbWFya2VyIGFmdGVyIHRoYXQgaXMganVzdCBFT0kgKEVuZCBPZiBJbWFnZSkgYW55d2F5XHJcbiAgICAgICAgd2hpbGUgKHN0cmVhbS5yZW1haW5pbmdMZW5ndGgoKSA+IDAgJiYgbWFya2VyVHlwZSAhPT0gMHhEQSkge1xyXG4gICAgICAgICAgICBpZiAoc3RyZWFtLm5leHRVSW50OCgpICE9PSAweEZGKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWFya2VyVHlwZSA9IHN0cmVhbS5uZXh0VUludDgoKTtcclxuICAgICAgICAgICAgLy9kb24ndCByZWFkIHNpemUgZnJvbSBtYXJrZXJzIHRoYXQgaGF2ZSBubyBkYXRhc1xyXG4gICAgICAgICAgICBpZiAoKG1hcmtlclR5cGUgPj0gMHhEMCAmJiBtYXJrZXJUeXBlIDw9IDB4RDkpIHx8IG1hcmtlclR5cGUgPT09IDB4REEpIHtcclxuICAgICAgICAgICAgICAgIGxlbiA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZW4gPSBzdHJlYW0ubmV4dFVJbnQxNigpIC0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpdGVyYXRvcihtYXJrZXJUeXBlLCBzdHJlYW0uYnJhbmNoKDAsIGxlbikpO1xyXG4gICAgICAgICAgICBzdHJlYW0uc2tpcChsZW4pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL3N0cmVhbSBzaG91bGQgYmUgbG9jYXRlZCBhZnRlciBTT0Ygc2VjdGlvbiBzaXplIGFuZCBpbiBiaWcgZW5kaWFuIG1vZGUsIGxpa2UgcGFzc2VkIHRvIHBhcnNlU2VjdGlvbnMgaXRlcmF0b3JcclxuICAgIEpwZWdQYXJzZXIuZ2V0U2l6ZUZyb21TT0ZTZWN0aW9uID0gZnVuY3Rpb24gKHN0cmVhbSkge1xyXG4gICAgICAgIHN0cmVhbS5za2lwKDEpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhlaWdodDogc3RyZWFtLm5leHRVSW50MTYoKSxcclxuICAgICAgICAgICAgd2lkdGg6IHN0cmVhbS5uZXh0VUludDE2KClcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIEpwZWdQYXJzZXIuZ2V0U2VjdGlvbk5hbWUgPSBmdW5jdGlvbiAobWFya2VyVHlwZSkge1xyXG4gICAgICAgIHZhciBuYW1lLCBpbmRleDtcclxuICAgICAgICBzd2l0Y2ggKG1hcmtlclR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAweEQ4OlxyXG4gICAgICAgICAgICAgICAgbmFtZSA9ICdTT0knO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMHhDNDpcclxuICAgICAgICAgICAgICAgIG5hbWUgPSAnREhUJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDB4REI6XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gJ0RRVCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAweEREOlxyXG4gICAgICAgICAgICAgICAgbmFtZSA9ICdEUkknO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMHhEQTpcclxuICAgICAgICAgICAgICAgIG5hbWUgPSAnU09TJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDB4RkU6XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gJ0NPTSc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAweEQ5OlxyXG4gICAgICAgICAgICAgICAgbmFtZSA9ICdFT0knO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBpZiAobWFya2VyVHlwZSA+PSAweEUwICYmIG1hcmtlclR5cGUgPD0gMHhFRikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSAnQVBQJztcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IG1hcmtlclR5cGUgLSAweEUwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobWFya2VyVHlwZSA+PSAweEMwICYmIG1hcmtlclR5cGUgPD0gMHhDRiAmJiBtYXJrZXJUeXBlICE9PSAweEM0ICYmIG1hcmtlclR5cGUgIT09IDB4QzggJiYgbWFya2VyVHlwZSAhPT0gMHhDQykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSAnU09GJztcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IG1hcmtlclR5cGUgLSAweEMwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobWFya2VyVHlwZSA+PSAweEQwICYmIG1hcmtlclR5cGUgPD0gMHhENykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSAnUlNUJztcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IG1hcmtlclR5cGUgLSAweEQwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBuYW1lU3RydWN0ID0ge1xyXG4gICAgICAgICAgICBuYW1lOiBuYW1lXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAodHlwZW9mIGluZGV4ID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBuYW1lU3RydWN0LmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuYW1lU3RydWN0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBKcGVnUGFyc2VyO1xyXG59KCkpO1xyXG5leHBvcnRzLkpwZWdQYXJzZXIgPSBKcGVnUGFyc2VyO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1KcGVnUGFyc2VyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVGFncyA9IHZvaWQgMDtcclxudmFyIFRhZ3M7XHJcbihmdW5jdGlvbiAoVGFncykge1xyXG4gICAgVGFncy5FeGlmID0ge1xyXG4gICAgICAgIDB4MDAwMTogXCJJbnRlcm9wSW5kZXhcIixcclxuICAgICAgICAweDAwMDI6IFwiSW50ZXJvcFZlcnNpb25cIixcclxuICAgICAgICAweDAwMEI6IFwiUHJvY2Vzc2luZ1NvZnR3YXJlXCIsXHJcbiAgICAgICAgMHgwMEZFOiBcIlN1YmZpbGVUeXBlXCIsXHJcbiAgICAgICAgMHgwMEZGOiBcIk9sZFN1YmZpbGVUeXBlXCIsXHJcbiAgICAgICAgMHgwMTAwOiBcIkltYWdlV2lkdGhcIixcclxuICAgICAgICAweDAxMDE6IFwiSW1hZ2VIZWlnaHRcIixcclxuICAgICAgICAweDAxMDI6IFwiQml0c1BlclNhbXBsZVwiLFxyXG4gICAgICAgIDB4MDEwMzogXCJDb21wcmVzc2lvblwiLFxyXG4gICAgICAgIDB4MDEwNjogXCJQaG90b21ldHJpY0ludGVycHJldGF0aW9uXCIsXHJcbiAgICAgICAgMHgwMTA3OiBcIlRocmVzaG9sZGluZ1wiLFxyXG4gICAgICAgIDB4MDEwODogXCJDZWxsV2lkdGhcIixcclxuICAgICAgICAweDAxMDk6IFwiQ2VsbExlbmd0aFwiLFxyXG4gICAgICAgIDB4MDEwQTogXCJGaWxsT3JkZXJcIixcclxuICAgICAgICAweDAxMEQ6IFwiRG9jdW1lbnROYW1lXCIsXHJcbiAgICAgICAgMHgwMTBFOiBcIkltYWdlRGVzY3JpcHRpb25cIixcclxuICAgICAgICAweDAxMEY6IFwiTWFrZVwiLFxyXG4gICAgICAgIDB4MDExMDogXCJNb2RlbFwiLFxyXG4gICAgICAgIDB4MDExMTogXCJTdHJpcE9mZnNldHNcIixcclxuICAgICAgICAweDAxMTI6IFwiT3JpZW50YXRpb25cIixcclxuICAgICAgICAweDAxMTU6IFwiU2FtcGxlc1BlclBpeGVsXCIsXHJcbiAgICAgICAgMHgwMTE2OiBcIlJvd3NQZXJTdHJpcFwiLFxyXG4gICAgICAgIDB4MDExNzogXCJTdHJpcEJ5dGVDb3VudHNcIixcclxuICAgICAgICAweDAxMTg6IFwiTWluU2FtcGxlVmFsdWVcIixcclxuICAgICAgICAweDAxMTk6IFwiTWF4U2FtcGxlVmFsdWVcIixcclxuICAgICAgICAweDAxMUE6IFwiWFJlc29sdXRpb25cIixcclxuICAgICAgICAweDAxMUI6IFwiWVJlc29sdXRpb25cIixcclxuICAgICAgICAweDAxMUM6IFwiUGxhbmFyQ29uZmlndXJhdGlvblwiLFxyXG4gICAgICAgIDB4MDExRDogXCJQYWdlTmFtZVwiLFxyXG4gICAgICAgIDB4MDExRTogXCJYUG9zaXRpb25cIixcclxuICAgICAgICAweDAxMUY6IFwiWVBvc2l0aW9uXCIsXHJcbiAgICAgICAgMHgwMTIwOiBcIkZyZWVPZmZzZXRzXCIsXHJcbiAgICAgICAgMHgwMTIxOiBcIkZyZWVCeXRlQ291bnRzXCIsXHJcbiAgICAgICAgMHgwMTIyOiBcIkdyYXlSZXNwb25zZVVuaXRcIixcclxuICAgICAgICAweDAxMjM6IFwiR3JheVJlc3BvbnNlQ3VydmVcIixcclxuICAgICAgICAweDAxMjQ6IFwiVDRPcHRpb25zXCIsXHJcbiAgICAgICAgMHgwMTI1OiBcIlQ2T3B0aW9uc1wiLFxyXG4gICAgICAgIDB4MDEyODogXCJSZXNvbHV0aW9uVW5pdFwiLFxyXG4gICAgICAgIDB4MDEyOTogXCJQYWdlTnVtYmVyXCIsXHJcbiAgICAgICAgMHgwMTJDOiBcIkNvbG9yUmVzcG9uc2VVbml0XCIsXHJcbiAgICAgICAgMHgwMTJEOiBcIlRyYW5zZmVyRnVuY3Rpb25cIixcclxuICAgICAgICAweDAxMzE6IFwiU29mdHdhcmVcIixcclxuICAgICAgICAweDAxMzI6IFwiTW9kaWZ5RGF0ZVwiLFxyXG4gICAgICAgIDB4MDEzQjogXCJBcnRpc3RcIixcclxuICAgICAgICAweDAxM0M6IFwiSG9zdENvbXB1dGVyXCIsXHJcbiAgICAgICAgMHgwMTNEOiBcIlByZWRpY3RvclwiLFxyXG4gICAgICAgIDB4MDEzRTogXCJXaGl0ZVBvaW50XCIsXHJcbiAgICAgICAgMHgwMTNGOiBcIlByaW1hcnlDaHJvbWF0aWNpdGllc1wiLFxyXG4gICAgICAgIDB4MDE0MDogXCJDb2xvck1hcFwiLFxyXG4gICAgICAgIDB4MDE0MTogXCJIYWxmdG9uZUhpbnRzXCIsXHJcbiAgICAgICAgMHgwMTQyOiBcIlRpbGVXaWR0aFwiLFxyXG4gICAgICAgIDB4MDE0MzogXCJUaWxlTGVuZ3RoXCIsXHJcbiAgICAgICAgMHgwMTQ0OiBcIlRpbGVPZmZzZXRzXCIsXHJcbiAgICAgICAgMHgwMTQ1OiBcIlRpbGVCeXRlQ291bnRzXCIsXHJcbiAgICAgICAgMHgwMTQ2OiBcIkJhZEZheExpbmVzXCIsXHJcbiAgICAgICAgMHgwMTQ3OiBcIkNsZWFuRmF4RGF0YVwiLFxyXG4gICAgICAgIDB4MDE0ODogXCJDb25zZWN1dGl2ZUJhZEZheExpbmVzXCIsXHJcbiAgICAgICAgMHgwMTRBOiBcIlN1YklGRFwiLFxyXG4gICAgICAgIDB4MDE0QzogXCJJbmtTZXRcIixcclxuICAgICAgICAweDAxNEQ6IFwiSW5rTmFtZXNcIixcclxuICAgICAgICAweDAxNEU6IFwiTnVtYmVyb2ZJbmtzXCIsXHJcbiAgICAgICAgMHgwMTUwOiBcIkRvdFJhbmdlXCIsXHJcbiAgICAgICAgMHgwMTUxOiBcIlRhcmdldFByaW50ZXJcIixcclxuICAgICAgICAweDAxNTI6IFwiRXh0cmFTYW1wbGVzXCIsXHJcbiAgICAgICAgMHgwMTUzOiBcIlNhbXBsZUZvcm1hdFwiLFxyXG4gICAgICAgIDB4MDE1NDogXCJTTWluU2FtcGxlVmFsdWVcIixcclxuICAgICAgICAweDAxNTU6IFwiU01heFNhbXBsZVZhbHVlXCIsXHJcbiAgICAgICAgMHgwMTU2OiBcIlRyYW5zZmVyUmFuZ2VcIixcclxuICAgICAgICAweDAxNTc6IFwiQ2xpcFBhdGhcIixcclxuICAgICAgICAweDAxNTg6IFwiWENsaXBQYXRoVW5pdHNcIixcclxuICAgICAgICAweDAxNTk6IFwiWUNsaXBQYXRoVW5pdHNcIixcclxuICAgICAgICAweDAxNUE6IFwiSW5kZXhlZFwiLFxyXG4gICAgICAgIDB4MDE1QjogXCJKUEVHVGFibGVzXCIsXHJcbiAgICAgICAgMHgwMTVGOiBcIk9QSVByb3h5XCIsXHJcbiAgICAgICAgMHgwMTkwOiBcIkdsb2JhbFBhcmFtZXRlcnNJRkRcIixcclxuICAgICAgICAweDAxOTE6IFwiUHJvZmlsZVR5cGVcIixcclxuICAgICAgICAweDAxOTI6IFwiRmF4UHJvZmlsZVwiLFxyXG4gICAgICAgIDB4MDE5MzogXCJDb2RpbmdNZXRob2RzXCIsXHJcbiAgICAgICAgMHgwMTk0OiBcIlZlcnNpb25ZZWFyXCIsXHJcbiAgICAgICAgMHgwMTk1OiBcIk1vZGVOdW1iZXJcIixcclxuICAgICAgICAweDAxQjE6IFwiRGVjb2RlXCIsXHJcbiAgICAgICAgMHgwMUIyOiBcIkRlZmF1bHRJbWFnZUNvbG9yXCIsXHJcbiAgICAgICAgMHgwMUIzOiBcIlQ4Mk9wdGlvbnNcIixcclxuICAgICAgICAweDAxQjU6IFwiSlBFR1RhYmxlc1wiLFxyXG4gICAgICAgIDB4MDIwMDogXCJKUEVHUHJvY1wiLFxyXG4gICAgICAgIDB4MDIwMTogXCJUaHVtYm5haWxPZmZzZXRcIixcclxuICAgICAgICAweDAyMDI6IFwiVGh1bWJuYWlsTGVuZ3RoXCIsXHJcbiAgICAgICAgMHgwMjAzOiBcIkpQRUdSZXN0YXJ0SW50ZXJ2YWxcIixcclxuICAgICAgICAweDAyMDU6IFwiSlBFR0xvc3NsZXNzUHJlZGljdG9yc1wiLFxyXG4gICAgICAgIDB4MDIwNjogXCJKUEVHUG9pbnRUcmFuc2Zvcm1zXCIsXHJcbiAgICAgICAgMHgwMjA3OiBcIkpQRUdRVGFibGVzXCIsXHJcbiAgICAgICAgMHgwMjA4OiBcIkpQRUdEQ1RhYmxlc1wiLFxyXG4gICAgICAgIDB4MDIwOTogXCJKUEVHQUNUYWJsZXNcIixcclxuICAgICAgICAweDAyMTE6IFwiWUNiQ3JDb2VmZmljaWVudHNcIixcclxuICAgICAgICAweDAyMTI6IFwiWUNiQ3JTdWJTYW1wbGluZ1wiLFxyXG4gICAgICAgIDB4MDIxMzogXCJZQ2JDclBvc2l0aW9uaW5nXCIsXHJcbiAgICAgICAgMHgwMjE0OiBcIlJlZmVyZW5jZUJsYWNrV2hpdGVcIixcclxuICAgICAgICAweDAyMkY6IFwiU3RyaXBSb3dDb3VudHNcIixcclxuICAgICAgICAweDAyQkM6IFwiQXBwbGljYXRpb25Ob3Rlc1wiLFxyXG4gICAgICAgIDB4MDNFNzogXCJVU1BUT01pc2NlbGxhbmVvdXNcIixcclxuICAgICAgICAweDEwMDA6IFwiUmVsYXRlZEltYWdlRmlsZUZvcm1hdFwiLFxyXG4gICAgICAgIDB4MTAwMTogXCJSZWxhdGVkSW1hZ2VXaWR0aFwiLFxyXG4gICAgICAgIDB4MTAwMjogXCJSZWxhdGVkSW1hZ2VIZWlnaHRcIixcclxuICAgICAgICAweDQ3NDY6IFwiUmF0aW5nXCIsXHJcbiAgICAgICAgMHg0NzQ3OiBcIlhQX0RJUF9YTUxcIixcclxuICAgICAgICAweDQ3NDg6IFwiU3RpdGNoSW5mb1wiLFxyXG4gICAgICAgIDB4NDc0OTogXCJSYXRpbmdQZXJjZW50XCIsXHJcbiAgICAgICAgMHg4MDBEOiBcIkltYWdlSURcIixcclxuICAgICAgICAweDgwQTM6IFwiV2FuZ1RhZzFcIixcclxuICAgICAgICAweDgwQTQ6IFwiV2FuZ0Fubm90YXRpb25cIixcclxuICAgICAgICAweDgwQTU6IFwiV2FuZ1RhZzNcIixcclxuICAgICAgICAweDgwQTY6IFwiV2FuZ1RhZzRcIixcclxuICAgICAgICAweDgwRTM6IFwiTWF0dGVpbmdcIixcclxuICAgICAgICAweDgwRTQ6IFwiRGF0YVR5cGVcIixcclxuICAgICAgICAweDgwRTU6IFwiSW1hZ2VEZXB0aFwiLFxyXG4gICAgICAgIDB4ODBFNjogXCJUaWxlRGVwdGhcIixcclxuICAgICAgICAweDgyN0Q6IFwiTW9kZWwyXCIsXHJcbiAgICAgICAgMHg4MjhEOiBcIkNGQVJlcGVhdFBhdHRlcm5EaW1cIixcclxuICAgICAgICAweDgyOEU6IFwiQ0ZBUGF0dGVybjJcIixcclxuICAgICAgICAweDgyOEY6IFwiQmF0dGVyeUxldmVsXCIsXHJcbiAgICAgICAgMHg4MjkwOiBcIktvZGFrSUZEXCIsXHJcbiAgICAgICAgMHg4Mjk4OiBcIkNvcHlyaWdodFwiLFxyXG4gICAgICAgIDB4ODI5QTogXCJFeHBvc3VyZVRpbWVcIixcclxuICAgICAgICAweDgyOUQ6IFwiRk51bWJlclwiLFxyXG4gICAgICAgIDB4ODJBNTogXCJNREZpbGVUYWdcIixcclxuICAgICAgICAweDgyQTY6IFwiTURTY2FsZVBpeGVsXCIsXHJcbiAgICAgICAgMHg4MkE3OiBcIk1EQ29sb3JUYWJsZVwiLFxyXG4gICAgICAgIDB4ODJBODogXCJNRExhYk5hbWVcIixcclxuICAgICAgICAweDgyQTk6IFwiTURTYW1wbGVJbmZvXCIsXHJcbiAgICAgICAgMHg4MkFBOiBcIk1EUHJlcERhdGVcIixcclxuICAgICAgICAweDgyQUI6IFwiTURQcmVwVGltZVwiLFxyXG4gICAgICAgIDB4ODJBQzogXCJNREZpbGVVbml0c1wiLFxyXG4gICAgICAgIDB4ODMwRTogXCJQaXhlbFNjYWxlXCIsXHJcbiAgICAgICAgMHg4MzM1OiBcIkFkdmVudFNjYWxlXCIsXHJcbiAgICAgICAgMHg4MzM2OiBcIkFkdmVudFJldmlzaW9uXCIsXHJcbiAgICAgICAgMHg4MzVDOiBcIlVJQzFUYWdcIixcclxuICAgICAgICAweDgzNUQ6IFwiVUlDMlRhZ1wiLFxyXG4gICAgICAgIDB4ODM1RTogXCJVSUMzVGFnXCIsXHJcbiAgICAgICAgMHg4MzVGOiBcIlVJQzRUYWdcIixcclxuICAgICAgICAweDgzQkI6IFwiSVBUQy1OQUFcIixcclxuICAgICAgICAweDg0N0U6IFwiSW50ZXJncmFwaFBhY2tldERhdGFcIixcclxuICAgICAgICAweDg0N0Y6IFwiSW50ZXJncmFwaEZsYWdSZWdpc3RlcnNcIixcclxuICAgICAgICAweDg0ODA6IFwiSW50ZXJncmFwaE1hdHJpeFwiLFxyXG4gICAgICAgIDB4ODQ4MTogXCJJTkdSUmVzZXJ2ZWRcIixcclxuICAgICAgICAweDg0ODI6IFwiTW9kZWxUaWVQb2ludFwiLFxyXG4gICAgICAgIDB4ODRFMDogXCJTaXRlXCIsXHJcbiAgICAgICAgMHg4NEUxOiBcIkNvbG9yU2VxdWVuY2VcIixcclxuICAgICAgICAweDg0RTI6IFwiSVQ4SGVhZGVyXCIsXHJcbiAgICAgICAgMHg4NEUzOiBcIlJhc3RlclBhZGRpbmdcIixcclxuICAgICAgICAweDg0RTQ6IFwiQml0c1BlclJ1bkxlbmd0aFwiLFxyXG4gICAgICAgIDB4ODRFNTogXCJCaXRzUGVyRXh0ZW5kZWRSdW5MZW5ndGhcIixcclxuICAgICAgICAweDg0RTY6IFwiQ29sb3JUYWJsZVwiLFxyXG4gICAgICAgIDB4ODRFNzogXCJJbWFnZUNvbG9ySW5kaWNhdG9yXCIsXHJcbiAgICAgICAgMHg4NEU4OiBcIkJhY2tncm91bmRDb2xvckluZGljYXRvclwiLFxyXG4gICAgICAgIDB4ODRFOTogXCJJbWFnZUNvbG9yVmFsdWVcIixcclxuICAgICAgICAweDg0RUE6IFwiQmFja2dyb3VuZENvbG9yVmFsdWVcIixcclxuICAgICAgICAweDg0RUI6IFwiUGl4ZWxJbnRlbnNpdHlSYW5nZVwiLFxyXG4gICAgICAgIDB4ODRFQzogXCJUcmFuc3BhcmVuY3lJbmRpY2F0b3JcIixcclxuICAgICAgICAweDg0RUQ6IFwiQ29sb3JDaGFyYWN0ZXJpemF0aW9uXCIsXHJcbiAgICAgICAgMHg4NEVFOiBcIkhDVXNhZ2VcIixcclxuICAgICAgICAweDg0RUY6IFwiVHJhcEluZGljYXRvclwiLFxyXG4gICAgICAgIDB4ODRGMDogXCJDTVlLRXF1aXZhbGVudFwiLFxyXG4gICAgICAgIDB4ODU0NjogXCJTRU1JbmZvXCIsXHJcbiAgICAgICAgMHg4NTY4OiBcIkFGQ1BfSVBUQ1wiLFxyXG4gICAgICAgIDB4ODVCODogXCJQaXhlbE1hZ2ljSkJJR09wdGlvbnNcIixcclxuICAgICAgICAweDg1RDg6IFwiTW9kZWxUcmFuc2Zvcm1cIixcclxuICAgICAgICAweDg2MDI6IFwiV0JfR1JHQkxldmVsc1wiLFxyXG4gICAgICAgIDB4ODYwNjogXCJMZWFmRGF0YVwiLFxyXG4gICAgICAgIDB4ODY0OTogXCJQaG90b3Nob3BTZXR0aW5nc1wiLFxyXG4gICAgICAgIDB4ODc2OTogXCJFeGlmT2Zmc2V0XCIsXHJcbiAgICAgICAgMHg4NzczOiBcIklDQ19Qcm9maWxlXCIsXHJcbiAgICAgICAgMHg4NzdGOiBcIlRJRkZfRlhFeHRlbnNpb25zXCIsXHJcbiAgICAgICAgMHg4NzgwOiBcIk11bHRpUHJvZmlsZXNcIixcclxuICAgICAgICAweDg3ODE6IFwiU2hhcmVkRGF0YVwiLFxyXG4gICAgICAgIDB4ODc4MjogXCJUODhPcHRpb25zXCIsXHJcbiAgICAgICAgMHg4N0FDOiBcIkltYWdlTGF5ZXJcIixcclxuICAgICAgICAweDg3QUY6IFwiR2VvVGlmZkRpcmVjdG9yeVwiLFxyXG4gICAgICAgIDB4ODdCMDogXCJHZW9UaWZmRG91YmxlUGFyYW1zXCIsXHJcbiAgICAgICAgMHg4N0IxOiBcIkdlb1RpZmZBc2NpaVBhcmFtc1wiLFxyXG4gICAgICAgIDB4ODgyMjogXCJFeHBvc3VyZVByb2dyYW1cIixcclxuICAgICAgICAweDg4MjQ6IFwiU3BlY3RyYWxTZW5zaXRpdml0eVwiLFxyXG4gICAgICAgIDB4ODgyNTogXCJHUFNJbmZvXCIsXHJcbiAgICAgICAgMHg4ODI3OiBcIklTT1wiLFxyXG4gICAgICAgIDB4ODgyODogXCJPcHRvLUVsZWN0cmljQ29udkZhY3RvclwiLFxyXG4gICAgICAgIDB4ODgyOTogXCJJbnRlcmxhY2VcIixcclxuICAgICAgICAweDg4MkE6IFwiVGltZVpvbmVPZmZzZXRcIixcclxuICAgICAgICAweDg4MkI6IFwiU2VsZlRpbWVyTW9kZVwiLFxyXG4gICAgICAgIDB4ODgzMDogXCJTZW5zaXRpdml0eVR5cGVcIixcclxuICAgICAgICAweDg4MzE6IFwiU3RhbmRhcmRPdXRwdXRTZW5zaXRpdml0eVwiLFxyXG4gICAgICAgIDB4ODgzMjogXCJSZWNvbW1lbmRlZEV4cG9zdXJlSW5kZXhcIixcclxuICAgICAgICAweDg4MzM6IFwiSVNPU3BlZWRcIixcclxuICAgICAgICAweDg4MzQ6IFwiSVNPU3BlZWRMYXRpdHVkZXl5eVwiLFxyXG4gICAgICAgIDB4ODgzNTogXCJJU09TcGVlZExhdGl0dWRlenp6XCIsXHJcbiAgICAgICAgMHg4ODVDOiBcIkZheFJlY3ZQYXJhbXNcIixcclxuICAgICAgICAweDg4NUQ6IFwiRmF4U3ViQWRkcmVzc1wiLFxyXG4gICAgICAgIDB4ODg1RTogXCJGYXhSZWN2VGltZVwiLFxyXG4gICAgICAgIDB4ODg4QTogXCJMZWFmU3ViSUZEXCIsXHJcbiAgICAgICAgMHg5MDAwOiBcIkV4aWZWZXJzaW9uXCIsXHJcbiAgICAgICAgMHg5MDAzOiBcIkRhdGVUaW1lT3JpZ2luYWxcIixcclxuICAgICAgICAweDkwMDQ6IFwiQ3JlYXRlRGF0ZVwiLFxyXG4gICAgICAgIDB4OTEwMTogXCJDb21wb25lbnRzQ29uZmlndXJhdGlvblwiLFxyXG4gICAgICAgIDB4OTEwMjogXCJDb21wcmVzc2VkQml0c1BlclBpeGVsXCIsXHJcbiAgICAgICAgMHg5MjAxOiBcIlNodXR0ZXJTcGVlZFZhbHVlXCIsXHJcbiAgICAgICAgMHg5MjAyOiBcIkFwZXJ0dXJlVmFsdWVcIixcclxuICAgICAgICAweDkyMDM6IFwiQnJpZ2h0bmVzc1ZhbHVlXCIsXHJcbiAgICAgICAgMHg5MjA0OiBcIkV4cG9zdXJlQ29tcGVuc2F0aW9uXCIsXHJcbiAgICAgICAgMHg5MjA1OiBcIk1heEFwZXJ0dXJlVmFsdWVcIixcclxuICAgICAgICAweDkyMDY6IFwiU3ViamVjdERpc3RhbmNlXCIsXHJcbiAgICAgICAgMHg5MjA3OiBcIk1ldGVyaW5nTW9kZVwiLFxyXG4gICAgICAgIDB4OTIwODogXCJMaWdodFNvdXJjZVwiLFxyXG4gICAgICAgIDB4OTIwOTogXCJGbGFzaFwiLFxyXG4gICAgICAgIDB4OTIwQTogXCJGb2NhbExlbmd0aFwiLFxyXG4gICAgICAgIDB4OTIwQjogXCJGbGFzaEVuZXJneVwiLFxyXG4gICAgICAgIDB4OTIwQzogXCJTcGF0aWFsRnJlcXVlbmN5UmVzcG9uc2VcIixcclxuICAgICAgICAweDkyMEQ6IFwiTm9pc2VcIixcclxuICAgICAgICAweDkyMEU6IFwiRm9jYWxQbGFuZVhSZXNvbHV0aW9uXCIsXHJcbiAgICAgICAgMHg5MjBGOiBcIkZvY2FsUGxhbmVZUmVzb2x1dGlvblwiLFxyXG4gICAgICAgIDB4OTIxMDogXCJGb2NhbFBsYW5lUmVzb2x1dGlvblVuaXRcIixcclxuICAgICAgICAweDkyMTE6IFwiSW1hZ2VOdW1iZXJcIixcclxuICAgICAgICAweDkyMTI6IFwiU2VjdXJpdHlDbGFzc2lmaWNhdGlvblwiLFxyXG4gICAgICAgIDB4OTIxMzogXCJJbWFnZUhpc3RvcnlcIixcclxuICAgICAgICAweDkyMTQ6IFwiU3ViamVjdEFyZWFcIixcclxuICAgICAgICAweDkyMTU6IFwiRXhwb3N1cmVJbmRleFwiLFxyXG4gICAgICAgIDB4OTIxNjogXCJUSUZGLUVQU3RhbmRhcmRJRFwiLFxyXG4gICAgICAgIDB4OTIxNzogXCJTZW5zaW5nTWV0aG9kXCIsXHJcbiAgICAgICAgMHg5MjNBOiBcIkNJUDNEYXRhRmlsZVwiLFxyXG4gICAgICAgIDB4OTIzQjogXCJDSVAzU2hlZXRcIixcclxuICAgICAgICAweDkyM0M6IFwiQ0lQM1NpZGVcIixcclxuICAgICAgICAweDkyM0Y6IFwiU3RvTml0c1wiLFxyXG4gICAgICAgIDB4OTI3QzogXCJNYWtlck5vdGVcIixcclxuICAgICAgICAweDkyODY6IFwiVXNlckNvbW1lbnRcIixcclxuICAgICAgICAweDkyOTA6IFwiU3ViU2VjVGltZVwiLFxyXG4gICAgICAgIDB4OTI5MTogXCJTdWJTZWNUaW1lT3JpZ2luYWxcIixcclxuICAgICAgICAweDkyOTI6IFwiU3ViU2VjVGltZURpZ2l0aXplZFwiLFxyXG4gICAgICAgIDB4OTMyRjogXCJNU0RvY3VtZW50VGV4dFwiLFxyXG4gICAgICAgIDB4OTMzMDogXCJNU1Byb3BlcnR5U2V0U3RvcmFnZVwiLFxyXG4gICAgICAgIDB4OTMzMTogXCJNU0RvY3VtZW50VGV4dFBvc2l0aW9uXCIsXHJcbiAgICAgICAgMHg5MzVDOiBcIkltYWdlU291cmNlRGF0YVwiLFxyXG4gICAgICAgIDB4OUM5QjogXCJYUFRpdGxlXCIsXHJcbiAgICAgICAgMHg5QzlDOiBcIlhQQ29tbWVudFwiLFxyXG4gICAgICAgIDB4OUM5RDogXCJYUEF1dGhvclwiLFxyXG4gICAgICAgIDB4OUM5RTogXCJYUEtleXdvcmRzXCIsXHJcbiAgICAgICAgMHg5QzlGOiBcIlhQU3ViamVjdFwiLFxyXG4gICAgICAgIDB4QTAwMDogXCJGbGFzaHBpeFZlcnNpb25cIixcclxuICAgICAgICAweEEwMDE6IFwiQ29sb3JTcGFjZVwiLFxyXG4gICAgICAgIDB4QTAwMjogXCJFeGlmSW1hZ2VXaWR0aFwiLFxyXG4gICAgICAgIDB4QTAwMzogXCJFeGlmSW1hZ2VIZWlnaHRcIixcclxuICAgICAgICAweEEwMDQ6IFwiUmVsYXRlZFNvdW5kRmlsZVwiLFxyXG4gICAgICAgIDB4QTAwNTogXCJJbnRlcm9wT2Zmc2V0XCIsXHJcbiAgICAgICAgMHhBMjBCOiBcIkZsYXNoRW5lcmd5XCIsXHJcbiAgICAgICAgMHhBMjBDOiBcIlNwYXRpYWxGcmVxdWVuY3lSZXNwb25zZVwiLFxyXG4gICAgICAgIDB4QTIwRDogXCJOb2lzZVwiLFxyXG4gICAgICAgIDB4QTIwRTogXCJGb2NhbFBsYW5lWFJlc29sdXRpb25cIixcclxuICAgICAgICAweEEyMEY6IFwiRm9jYWxQbGFuZVlSZXNvbHV0aW9uXCIsXHJcbiAgICAgICAgMHhBMjEwOiBcIkZvY2FsUGxhbmVSZXNvbHV0aW9uVW5pdFwiLFxyXG4gICAgICAgIDB4QTIxMTogXCJJbWFnZU51bWJlclwiLFxyXG4gICAgICAgIDB4QTIxMjogXCJTZWN1cml0eUNsYXNzaWZpY2F0aW9uXCIsXHJcbiAgICAgICAgMHhBMjEzOiBcIkltYWdlSGlzdG9yeVwiLFxyXG4gICAgICAgIDB4QTIxNDogXCJTdWJqZWN0TG9jYXRpb25cIixcclxuICAgICAgICAweEEyMTU6IFwiRXhwb3N1cmVJbmRleFwiLFxyXG4gICAgICAgIDB4QTIxNjogXCJUSUZGLUVQU3RhbmRhcmRJRFwiLFxyXG4gICAgICAgIDB4QTIxNzogXCJTZW5zaW5nTWV0aG9kXCIsXHJcbiAgICAgICAgMHhBMzAwOiBcIkZpbGVTb3VyY2VcIixcclxuICAgICAgICAweEEzMDE6IFwiU2NlbmVUeXBlXCIsXHJcbiAgICAgICAgMHhBMzAyOiBcIkNGQVBhdHRlcm5cIixcclxuICAgICAgICAweEE0MDE6IFwiQ3VzdG9tUmVuZGVyZWRcIixcclxuICAgICAgICAweEE0MDI6IFwiRXhwb3N1cmVNb2RlXCIsXHJcbiAgICAgICAgMHhBNDAzOiBcIldoaXRlQmFsYW5jZVwiLFxyXG4gICAgICAgIDB4QTQwNDogXCJEaWdpdGFsWm9vbVJhdGlvXCIsXHJcbiAgICAgICAgMHhBNDA1OiBcIkZvY2FsTGVuZ3RoSW4zNW1tRm9ybWF0XCIsXHJcbiAgICAgICAgMHhBNDA2OiBcIlNjZW5lQ2FwdHVyZVR5cGVcIixcclxuICAgICAgICAweEE0MDc6IFwiR2FpbkNvbnRyb2xcIixcclxuICAgICAgICAweEE0MDg6IFwiQ29udHJhc3RcIixcclxuICAgICAgICAweEE0MDk6IFwiU2F0dXJhdGlvblwiLFxyXG4gICAgICAgIDB4QTQwQTogXCJTaGFycG5lc3NcIixcclxuICAgICAgICAweEE0MEI6IFwiRGV2aWNlU2V0dGluZ0Rlc2NyaXB0aW9uXCIsXHJcbiAgICAgICAgMHhBNDBDOiBcIlN1YmplY3REaXN0YW5jZVJhbmdlXCIsXHJcbiAgICAgICAgMHhBNDIwOiBcIkltYWdlVW5pcXVlSURcIixcclxuICAgICAgICAweEE0MzA6IFwiT3duZXJOYW1lXCIsXHJcbiAgICAgICAgMHhBNDMxOiBcIlNlcmlhbE51bWJlclwiLFxyXG4gICAgICAgIDB4QTQzMjogXCJMZW5zSW5mb1wiLFxyXG4gICAgICAgIDB4QTQzMzogXCJMZW5zTWFrZVwiLFxyXG4gICAgICAgIDB4QTQzNDogXCJMZW5zTW9kZWxcIixcclxuICAgICAgICAweEE0MzU6IFwiTGVuc1NlcmlhbE51bWJlclwiLFxyXG4gICAgICAgIDB4QTQ4MDogXCJHREFMTWV0YWRhdGFcIixcclxuICAgICAgICAweEE0ODE6IFwiR0RBTE5vRGF0YVwiLFxyXG4gICAgICAgIDB4QTUwMDogXCJHYW1tYVwiLFxyXG4gICAgICAgIDB4QUZDMDogXCJFeHBhbmRTb2Z0d2FyZVwiLFxyXG4gICAgICAgIDB4QUZDMTogXCJFeHBhbmRMZW5zXCIsXHJcbiAgICAgICAgMHhBRkMyOiBcIkV4cGFuZEZpbG1cIixcclxuICAgICAgICAweEFGQzM6IFwiRXhwYW5kRmlsdGVyTGVuc1wiLFxyXG4gICAgICAgIDB4QUZDNDogXCJFeHBhbmRTY2FubmVyXCIsXHJcbiAgICAgICAgMHhBRkM1OiBcIkV4cGFuZEZsYXNoTGFtcFwiLFxyXG4gICAgICAgIDB4QkMwMTogXCJQaXhlbEZvcm1hdFwiLFxyXG4gICAgICAgIDB4QkMwMjogXCJUcmFuc2Zvcm1hdGlvblwiLFxyXG4gICAgICAgIDB4QkMwMzogXCJVbmNvbXByZXNzZWRcIixcclxuICAgICAgICAweEJDMDQ6IFwiSW1hZ2VUeXBlXCIsXHJcbiAgICAgICAgMHhCQzgwOiBcIkltYWdlV2lkdGhcIixcclxuICAgICAgICAweEJDODE6IFwiSW1hZ2VIZWlnaHRcIixcclxuICAgICAgICAweEJDODI6IFwiV2lkdGhSZXNvbHV0aW9uXCIsXHJcbiAgICAgICAgMHhCQzgzOiBcIkhlaWdodFJlc29sdXRpb25cIixcclxuICAgICAgICAweEJDQzA6IFwiSW1hZ2VPZmZzZXRcIixcclxuICAgICAgICAweEJDQzE6IFwiSW1hZ2VCeXRlQ291bnRcIixcclxuICAgICAgICAweEJDQzI6IFwiQWxwaGFPZmZzZXRcIixcclxuICAgICAgICAweEJDQzM6IFwiQWxwaGFCeXRlQ291bnRcIixcclxuICAgICAgICAweEJDQzQ6IFwiSW1hZ2VEYXRhRGlzY2FyZFwiLFxyXG4gICAgICAgIDB4QkNDNTogXCJBbHBoYURhdGFEaXNjYXJkXCIsXHJcbiAgICAgICAgMHhDNDI3OiBcIk9jZVNjYW5qb2JEZXNjXCIsXHJcbiAgICAgICAgMHhDNDI4OiBcIk9jZUFwcGxpY2F0aW9uU2VsZWN0b3JcIixcclxuICAgICAgICAweEM0Mjk6IFwiT2NlSUROdW1iZXJcIixcclxuICAgICAgICAweEM0MkE6IFwiT2NlSW1hZ2VMb2dpY1wiLFxyXG4gICAgICAgIDB4QzQ0RjogXCJBbm5vdGF0aW9uc1wiLFxyXG4gICAgICAgIDB4QzRBNTogXCJQcmludElNXCIsXHJcbiAgICAgICAgMHhDNTgwOiBcIlVTUFRPT3JpZ2luYWxDb250ZW50VHlwZVwiLFxyXG4gICAgICAgIDB4QzYxMjogXCJETkdWZXJzaW9uXCIsXHJcbiAgICAgICAgMHhDNjEzOiBcIkROR0JhY2t3YXJkVmVyc2lvblwiLFxyXG4gICAgICAgIDB4QzYxNDogXCJVbmlxdWVDYW1lcmFNb2RlbFwiLFxyXG4gICAgICAgIDB4QzYxNTogXCJMb2NhbGl6ZWRDYW1lcmFNb2RlbFwiLFxyXG4gICAgICAgIDB4QzYxNjogXCJDRkFQbGFuZUNvbG9yXCIsXHJcbiAgICAgICAgMHhDNjE3OiBcIkNGQUxheW91dFwiLFxyXG4gICAgICAgIDB4QzYxODogXCJMaW5lYXJpemF0aW9uVGFibGVcIixcclxuICAgICAgICAweEM2MTk6IFwiQmxhY2tMZXZlbFJlcGVhdERpbVwiLFxyXG4gICAgICAgIDB4QzYxQTogXCJCbGFja0xldmVsXCIsXHJcbiAgICAgICAgMHhDNjFCOiBcIkJsYWNrTGV2ZWxEZWx0YUhcIixcclxuICAgICAgICAweEM2MUM6IFwiQmxhY2tMZXZlbERlbHRhVlwiLFxyXG4gICAgICAgIDB4QzYxRDogXCJXaGl0ZUxldmVsXCIsXHJcbiAgICAgICAgMHhDNjFFOiBcIkRlZmF1bHRTY2FsZVwiLFxyXG4gICAgICAgIDB4QzYxRjogXCJEZWZhdWx0Q3JvcE9yaWdpblwiLFxyXG4gICAgICAgIDB4QzYyMDogXCJEZWZhdWx0Q3JvcFNpemVcIixcclxuICAgICAgICAweEM2MjE6IFwiQ29sb3JNYXRyaXgxXCIsXHJcbiAgICAgICAgMHhDNjIyOiBcIkNvbG9yTWF0cml4MlwiLFxyXG4gICAgICAgIDB4QzYyMzogXCJDYW1lcmFDYWxpYnJhdGlvbjFcIixcclxuICAgICAgICAweEM2MjQ6IFwiQ2FtZXJhQ2FsaWJyYXRpb24yXCIsXHJcbiAgICAgICAgMHhDNjI1OiBcIlJlZHVjdGlvbk1hdHJpeDFcIixcclxuICAgICAgICAweEM2MjY6IFwiUmVkdWN0aW9uTWF0cml4MlwiLFxyXG4gICAgICAgIDB4QzYyNzogXCJBbmFsb2dCYWxhbmNlXCIsXHJcbiAgICAgICAgMHhDNjI4OiBcIkFzU2hvdE5ldXRyYWxcIixcclxuICAgICAgICAweEM2Mjk6IFwiQXNTaG90V2hpdGVYWVwiLFxyXG4gICAgICAgIDB4QzYyQTogXCJCYXNlbGluZUV4cG9zdXJlXCIsXHJcbiAgICAgICAgMHhDNjJCOiBcIkJhc2VsaW5lTm9pc2VcIixcclxuICAgICAgICAweEM2MkM6IFwiQmFzZWxpbmVTaGFycG5lc3NcIixcclxuICAgICAgICAweEM2MkQ6IFwiQmF5ZXJHcmVlblNwbGl0XCIsXHJcbiAgICAgICAgMHhDNjJFOiBcIkxpbmVhclJlc3BvbnNlTGltaXRcIixcclxuICAgICAgICAweEM2MkY6IFwiQ2FtZXJhU2VyaWFsTnVtYmVyXCIsXHJcbiAgICAgICAgMHhDNjMwOiBcIkROR0xlbnNJbmZvXCIsXHJcbiAgICAgICAgMHhDNjMxOiBcIkNocm9tYUJsdXJSYWRpdXNcIixcclxuICAgICAgICAweEM2MzI6IFwiQW50aUFsaWFzU3RyZW5ndGhcIixcclxuICAgICAgICAweEM2MzM6IFwiU2hhZG93U2NhbGVcIixcclxuICAgICAgICAweEM2MzQ6IFwiRE5HUHJpdmF0ZURhdGFcIixcclxuICAgICAgICAweEM2MzU6IFwiTWFrZXJOb3RlU2FmZXR5XCIsXHJcbiAgICAgICAgMHhDNjQwOiBcIlJhd0ltYWdlU2VnbWVudGF0aW9uXCIsXHJcbiAgICAgICAgMHhDNjVBOiBcIkNhbGlicmF0aW9uSWxsdW1pbmFudDFcIixcclxuICAgICAgICAweEM2NUI6IFwiQ2FsaWJyYXRpb25JbGx1bWluYW50MlwiLFxyXG4gICAgICAgIDB4QzY1QzogXCJCZXN0UXVhbGl0eVNjYWxlXCIsXHJcbiAgICAgICAgMHhDNjVEOiBcIlJhd0RhdGFVbmlxdWVJRFwiLFxyXG4gICAgICAgIDB4QzY2MDogXCJBbGlhc0xheWVyTWV0YWRhdGFcIixcclxuICAgICAgICAweEM2OEI6IFwiT3JpZ2luYWxSYXdGaWxlTmFtZVwiLFxyXG4gICAgICAgIDB4QzY4QzogXCJPcmlnaW5hbFJhd0ZpbGVEYXRhXCIsXHJcbiAgICAgICAgMHhDNjhEOiBcIkFjdGl2ZUFyZWFcIixcclxuICAgICAgICAweEM2OEU6IFwiTWFza2VkQXJlYXNcIixcclxuICAgICAgICAweEM2OEY6IFwiQXNTaG90SUNDUHJvZmlsZVwiLFxyXG4gICAgICAgIDB4QzY5MDogXCJBc1Nob3RQcmVQcm9maWxlTWF0cml4XCIsXHJcbiAgICAgICAgMHhDNjkxOiBcIkN1cnJlbnRJQ0NQcm9maWxlXCIsXHJcbiAgICAgICAgMHhDNjkyOiBcIkN1cnJlbnRQcmVQcm9maWxlTWF0cml4XCIsXHJcbiAgICAgICAgMHhDNkJGOiBcIkNvbG9yaW1ldHJpY1JlZmVyZW5jZVwiLFxyXG4gICAgICAgIDB4QzZEMjogXCJQYW5hc29uaWNUaXRsZVwiLFxyXG4gICAgICAgIDB4QzZEMzogXCJQYW5hc29uaWNUaXRsZTJcIixcclxuICAgICAgICAweEM2RjM6IFwiQ2FtZXJhQ2FsaWJyYXRpb25TaWdcIixcclxuICAgICAgICAweEM2RjQ6IFwiUHJvZmlsZUNhbGlicmF0aW9uU2lnXCIsXHJcbiAgICAgICAgMHhDNkY1OiBcIlByb2ZpbGVJRkRcIixcclxuICAgICAgICAweEM2RjY6IFwiQXNTaG90UHJvZmlsZU5hbWVcIixcclxuICAgICAgICAweEM2Rjc6IFwiTm9pc2VSZWR1Y3Rpb25BcHBsaWVkXCIsXHJcbiAgICAgICAgMHhDNkY4OiBcIlByb2ZpbGVOYW1lXCIsXHJcbiAgICAgICAgMHhDNkY5OiBcIlByb2ZpbGVIdWVTYXRNYXBEaW1zXCIsXHJcbiAgICAgICAgMHhDNkZBOiBcIlByb2ZpbGVIdWVTYXRNYXBEYXRhMVwiLFxyXG4gICAgICAgIDB4QzZGQjogXCJQcm9maWxlSHVlU2F0TWFwRGF0YTJcIixcclxuICAgICAgICAweEM2RkM6IFwiUHJvZmlsZVRvbmVDdXJ2ZVwiLFxyXG4gICAgICAgIDB4QzZGRDogXCJQcm9maWxlRW1iZWRQb2xpY3lcIixcclxuICAgICAgICAweEM2RkU6IFwiUHJvZmlsZUNvcHlyaWdodFwiLFxyXG4gICAgICAgIDB4QzcxNDogXCJGb3J3YXJkTWF0cml4MVwiLFxyXG4gICAgICAgIDB4QzcxNTogXCJGb3J3YXJkTWF0cml4MlwiLFxyXG4gICAgICAgIDB4QzcxNjogXCJQcmV2aWV3QXBwbGljYXRpb25OYW1lXCIsXHJcbiAgICAgICAgMHhDNzE3OiBcIlByZXZpZXdBcHBsaWNhdGlvblZlcnNpb25cIixcclxuICAgICAgICAweEM3MTg6IFwiUHJldmlld1NldHRpbmdzTmFtZVwiLFxyXG4gICAgICAgIDB4QzcxOTogXCJQcmV2aWV3U2V0dGluZ3NEaWdlc3RcIixcclxuICAgICAgICAweEM3MUE6IFwiUHJldmlld0NvbG9yU3BhY2VcIixcclxuICAgICAgICAweEM3MUI6IFwiUHJldmlld0RhdGVUaW1lXCIsXHJcbiAgICAgICAgMHhDNzFDOiBcIlJhd0ltYWdlRGlnZXN0XCIsXHJcbiAgICAgICAgMHhDNzFEOiBcIk9yaWdpbmFsUmF3RmlsZURpZ2VzdFwiLFxyXG4gICAgICAgIDB4QzcxRTogXCJTdWJUaWxlQmxvY2tTaXplXCIsXHJcbiAgICAgICAgMHhDNzFGOiBcIlJvd0ludGVybGVhdmVGYWN0b3JcIixcclxuICAgICAgICAweEM3MjU6IFwiUHJvZmlsZUxvb2tUYWJsZURpbXNcIixcclxuICAgICAgICAweEM3MjY6IFwiUHJvZmlsZUxvb2tUYWJsZURhdGFcIixcclxuICAgICAgICAweEM3NDA6IFwiT3Bjb2RlTGlzdDFcIixcclxuICAgICAgICAweEM3NDE6IFwiT3Bjb2RlTGlzdDJcIixcclxuICAgICAgICAweEM3NEU6IFwiT3Bjb2RlTGlzdDNcIixcclxuICAgICAgICAweEM3NjE6IFwiTm9pc2VQcm9maWxlXCIsXHJcbiAgICAgICAgMHhDNzYzOiBcIlRpbWVDb2Rlc1wiLFxyXG4gICAgICAgIDB4Qzc2NDogXCJGcmFtZVJhdGVcIixcclxuICAgICAgICAweEM3NzI6IFwiVFN0b3BcIixcclxuICAgICAgICAweEM3ODk6IFwiUmVlbE5hbWVcIixcclxuICAgICAgICAweEM3OTE6IFwiT3JpZ2luYWxEZWZhdWx0RmluYWxTaXplXCIsXHJcbiAgICAgICAgMHhDNzkyOiBcIk9yaWdpbmFsQmVzdFF1YWxpdHlTaXplXCIsXHJcbiAgICAgICAgMHhDNzkzOiBcIk9yaWdpbmFsRGVmYXVsdENyb3BTaXplXCIsXHJcbiAgICAgICAgMHhDN0ExOiBcIkNhbWVyYUxhYmVsXCIsXHJcbiAgICAgICAgMHhDN0EzOiBcIlByb2ZpbGVIdWVTYXRNYXBFbmNvZGluZ1wiLFxyXG4gICAgICAgIDB4QzdBNDogXCJQcm9maWxlTG9va1RhYmxlRW5jb2RpbmdcIixcclxuICAgICAgICAweEM3QTU6IFwiQmFzZWxpbmVFeHBvc3VyZU9mZnNldFwiLFxyXG4gICAgICAgIDB4QzdBNjogXCJEZWZhdWx0QmxhY2tSZW5kZXJcIixcclxuICAgICAgICAweEM3QTc6IFwiTmV3UmF3SW1hZ2VEaWdlc3RcIixcclxuICAgICAgICAweEM3QTg6IFwiUmF3VG9QcmV2aWV3R2FpblwiLFxyXG4gICAgICAgIDB4QzdCNTogXCJEZWZhdWx0VXNlckNyb3BcIixcclxuICAgICAgICAweEVBMUM6IFwiUGFkZGluZ1wiLFxyXG4gICAgICAgIDB4RUExRDogXCJPZmZzZXRTY2hlbWFcIixcclxuICAgICAgICAweEZERTg6IFwiT3duZXJOYW1lXCIsXHJcbiAgICAgICAgMHhGREU5OiBcIlNlcmlhbE51bWJlclwiLFxyXG4gICAgICAgIDB4RkRFQTogXCJMZW5zXCIsXHJcbiAgICAgICAgMHhGRTAwOiBcIktEQ19JRkRcIixcclxuICAgICAgICAweEZFNEM6IFwiUmF3RmlsZVwiLFxyXG4gICAgICAgIDB4RkU0RDogXCJDb252ZXJ0ZXJcIixcclxuICAgICAgICAweEZFNEU6IFwiV2hpdGVCYWxhbmNlXCIsXHJcbiAgICAgICAgMHhGRTUxOiBcIkV4cG9zdXJlXCIsXHJcbiAgICAgICAgMHhGRTUyOiBcIlNoYWRvd3NcIixcclxuICAgICAgICAweEZFNTM6IFwiQnJpZ2h0bmVzc1wiLFxyXG4gICAgICAgIDB4RkU1NDogXCJDb250cmFzdFwiLFxyXG4gICAgICAgIDB4RkU1NTogXCJTYXR1cmF0aW9uXCIsXHJcbiAgICAgICAgMHhGRTU2OiBcIlNoYXJwbmVzc1wiLFxyXG4gICAgICAgIDB4RkU1NzogXCJTbW9vdGhuZXNzXCIsXHJcbiAgICAgICAgMHhGRTU4OiBcIk1vaXJlRmlsdGVyXCJcclxuICAgIH07XHJcbiAgICBUYWdzLkdQUyA9IHtcclxuICAgICAgICAweDAwMDA6ICdHUFNWZXJzaW9uSUQnLFxyXG4gICAgICAgIDB4MDAwMTogJ0dQU0xhdGl0dWRlUmVmJyxcclxuICAgICAgICAweDAwMDI6ICdHUFNMYXRpdHVkZScsXHJcbiAgICAgICAgMHgwMDAzOiAnR1BTTG9uZ2l0dWRlUmVmJyxcclxuICAgICAgICAweDAwMDQ6ICdHUFNMb25naXR1ZGUnLFxyXG4gICAgICAgIDB4MDAwNTogJ0dQU0FsdGl0dWRlUmVmJyxcclxuICAgICAgICAweDAwMDY6ICdHUFNBbHRpdHVkZScsXHJcbiAgICAgICAgMHgwMDA3OiAnR1BTVGltZVN0YW1wJyxcclxuICAgICAgICAweDAwMDg6ICdHUFNTYXRlbGxpdGVzJyxcclxuICAgICAgICAweDAwMDk6ICdHUFNTdGF0dXMnLFxyXG4gICAgICAgIDB4MDAwQTogJ0dQU01lYXN1cmVNb2RlJyxcclxuICAgICAgICAweDAwMEI6ICdHUFNET1AnLFxyXG4gICAgICAgIDB4MDAwQzogJ0dQU1NwZWVkUmVmJyxcclxuICAgICAgICAweDAwMEQ6ICdHUFNTcGVlZCcsXHJcbiAgICAgICAgMHgwMDBFOiAnR1BTVHJhY2tSZWYnLFxyXG4gICAgICAgIDB4MDAwRjogJ0dQU1RyYWNrJyxcclxuICAgICAgICAweDAwMTA6ICdHUFNJbWdEaXJlY3Rpb25SZWYnLFxyXG4gICAgICAgIDB4MDAxMTogJ0dQU0ltZ0RpcmVjdGlvbicsXHJcbiAgICAgICAgMHgwMDEyOiAnR1BTTWFwRGF0dW0nLFxyXG4gICAgICAgIDB4MDAxMzogJ0dQU0Rlc3RMYXRpdHVkZVJlZicsXHJcbiAgICAgICAgMHgwMDE0OiAnR1BTRGVzdExhdGl0dWRlJyxcclxuICAgICAgICAweDAwMTU6ICdHUFNEZXN0TG9uZ2l0dWRlUmVmJyxcclxuICAgICAgICAweDAwMTY6ICdHUFNEZXN0TG9uZ2l0dWRlJyxcclxuICAgICAgICAweDAwMTc6ICdHUFNEZXN0QmVhcmluZ1JlZicsXHJcbiAgICAgICAgMHgwMDE4OiAnR1BTRGVzdEJlYXJpbmcnLFxyXG4gICAgICAgIDB4MDAxOTogJ0dQU0Rlc3REaXN0YW5jZVJlZicsXHJcbiAgICAgICAgMHgwMDFBOiAnR1BTRGVzdERpc3RhbmNlJyxcclxuICAgICAgICAweDAwMUI6ICdHUFNQcm9jZXNzaW5nTWV0aG9kJyxcclxuICAgICAgICAweDAwMUM6ICdHUFNBcmVhSW5mb3JtYXRpb24nLFxyXG4gICAgICAgIDB4MDAxRDogJ0dQU0RhdGVTdGFtcCcsXHJcbiAgICAgICAgMHgwMDFFOiAnR1BTRGlmZmVyZW50aWFsJyxcclxuICAgICAgICAweDAwMUY6ICdHUFNIUG9zaXRpb25pbmdFcnJvcidcclxuICAgIH07XHJcbn0pKFRhZ3MgPSBleHBvcnRzLlRhZ3MgfHwgKGV4cG9ydHMuVGFncyA9IHt9KSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV4aWYtdGFncy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnNpbXBsaWZ5ID0gdm9pZCAwO1xyXG52YXIgRXhpZlNlY3Rpb25QYXJzZXJfMSA9IHJlcXVpcmUoXCIuL0V4aWZTZWN0aW9uUGFyc2VyXCIpO1xyXG52YXIgRGF0ZVV0aWxfMSA9IHJlcXVpcmUoXCIuL0RhdGVVdGlsXCIpO1xyXG52YXIgc2ltcGxpZnk7XHJcbihmdW5jdGlvbiAoc2ltcGxpZnkpIHtcclxuICAgIHZhciBkZWdyZWVUYWdzID0gW3tcclxuICAgICAgICAgICAgc2VjdGlvbjogRXhpZlNlY3Rpb25QYXJzZXJfMS5FeGlmU2VjdGlvbnMuR1BTSUZELFxyXG4gICAgICAgICAgICB0eXBlOiAweDAwMDIsXHJcbiAgICAgICAgICAgIG5hbWU6ICdHUFNMYXRpdHVkZScsXHJcbiAgICAgICAgICAgIHJlZlR5cGU6IDB4MDAwMSxcclxuICAgICAgICAgICAgcmVmTmFtZTogJ0dQU0xhdGl0dWRlUmVmJyxcclxuICAgICAgICAgICAgcG9zVmFsOiAnTidcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2VjdGlvbjogRXhpZlNlY3Rpb25QYXJzZXJfMS5FeGlmU2VjdGlvbnMuR1BTSUZELFxyXG4gICAgICAgICAgICB0eXBlOiAweDAwMDQsXHJcbiAgICAgICAgICAgIG5hbWU6ICdHUFNMb25naXR1ZGUnLFxyXG4gICAgICAgICAgICByZWZUeXBlOiAweDAwMDMsXHJcbiAgICAgICAgICAgIHJlZk5hbWU6ICdHUFNMb25naXR1ZGVSZWYnLFxyXG4gICAgICAgICAgICBwb3NWYWw6ICdFJ1xyXG4gICAgICAgIH1dO1xyXG4gICAgdmFyIGRhdGVUYWdzID0gW3tcclxuICAgICAgICAgICAgc2VjdGlvbjogRXhpZlNlY3Rpb25QYXJzZXJfMS5FeGlmU2VjdGlvbnMuU3ViSUZELFxyXG4gICAgICAgICAgICB0eXBlOiAweDAxMzIsXHJcbiAgICAgICAgICAgIG5hbWU6ICdNb2RpZnlEYXRlJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZWN0aW9uOiBFeGlmU2VjdGlvblBhcnNlcl8xLkV4aWZTZWN0aW9ucy5TdWJJRkQsXHJcbiAgICAgICAgICAgIHR5cGU6IDB4OTAwMyxcclxuICAgICAgICAgICAgbmFtZTogJ0RhdGVUaW1lT3JpZ2luYWwnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNlY3Rpb246IEV4aWZTZWN0aW9uUGFyc2VyXzEuRXhpZlNlY3Rpb25zLlN1YklGRCxcclxuICAgICAgICAgICAgdHlwZTogMHg5MDA0LFxyXG4gICAgICAgICAgICBuYW1lOiAnQ3JlYXRlRGF0ZSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2VjdGlvbjogRXhpZlNlY3Rpb25QYXJzZXJfMS5FeGlmU2VjdGlvbnMuU3ViSUZELFxyXG4gICAgICAgICAgICB0eXBlOiAweDAxMzIsXHJcbiAgICAgICAgICAgIG5hbWU6ICdNb2RpZnlEYXRlJyxcclxuICAgICAgICB9XTtcclxuICAgIGZ1bmN0aW9uIGNhc3REZWdyZWVWYWx1ZXMoZ2V0VGFnVmFsdWUsIHNldFRhZ1ZhbHVlKSB7XHJcbiAgICAgICAgZGVncmVlVGFncy5mb3JFYWNoKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIHZhciBkZWdyZWVWYWwgPSBnZXRUYWdWYWx1ZSh0KTtcclxuICAgICAgICAgICAgaWYgKGRlZ3JlZVZhbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlZ3JlZVJlZiA9IGdldFRhZ1ZhbHVlKHsgc2VjdGlvbjogdC5zZWN0aW9uLCB0eXBlOiB0LnJlZlR5cGUsIG5hbWU6IHQucmVmTmFtZSB9KTtcclxuICAgICAgICAgICAgICAgIHZhciBkZWdyZWVOdW1SZWYgPSBkZWdyZWVSZWYgPT09IHQucG9zVmFsID8gMSA6IC0xO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlZ3JlZSA9IChkZWdyZWVWYWxbMF0gKyAoZGVncmVlVmFsWzFdIC8gNjApICsgKGRlZ3JlZVZhbFsyXSAvIDM2MDApKSAqIGRlZ3JlZU51bVJlZjtcclxuICAgICAgICAgICAgICAgIHNldFRhZ1ZhbHVlKHQsIGRlZ3JlZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNpbXBsaWZ5LmNhc3REZWdyZWVWYWx1ZXMgPSBjYXN0RGVncmVlVmFsdWVzO1xyXG4gICAgZnVuY3Rpb24gY2FzdERhdGVWYWx1ZXMoZ2V0VGFnVmFsdWUsIHNldFRhZ1ZhbHVlKSB7XHJcbiAgICAgICAgZGF0ZVRhZ3MuZm9yRWFjaChmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0ZVN0clZhbCA9IGdldFRhZ1ZhbHVlKHQpO1xyXG4gICAgICAgICAgICBpZiAoZGF0ZVN0clZhbCkge1xyXG4gICAgICAgICAgICAgICAgLy9zb21lIGVhc3kgY2hlY2tzIHRvIGRldGVybWluZSB0d28gY29tbW9uIGRhdGUgZm9ybWF0c1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpbWVzdGFtcCA9IERhdGVVdGlsXzEuRGF0ZVV0aWwucGFyc2VFeGlmRGF0ZShkYXRlU3RyVmFsKTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGltZXN0YW1wICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRhZ1ZhbHVlKHQsIHRpbWVzdGFtcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNpbXBsaWZ5LmNhc3REYXRlVmFsdWVzID0gY2FzdERhdGVWYWx1ZXM7XHJcbiAgICBmdW5jdGlvbiBzaW1wbGlmeVZhbHVlKHZhbHVlcywgZm9ybWF0KSB7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWVzKSkge1xyXG4gICAgICAgICAgICB2YWx1ZXMgPSB2YWx1ZXMubWFwKGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZvcm1hdCA9PT0gMTAgfHwgZm9ybWF0ID09PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlWzBdIC8gdmFsdWVbMV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodmFsdWVzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZXM7XHJcbiAgICB9XHJcbiAgICBzaW1wbGlmeS5zaW1wbGlmeVZhbHVlID0gc2ltcGxpZnlWYWx1ZTtcclxufSkoc2ltcGxpZnkgPSBleHBvcnRzLnNpbXBsaWZ5IHx8IChleHBvcnRzLnNpbXBsaWZ5ID0ge30pKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2ltcGxpZnkuanMubWFwIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7RXhpZlBhcnNlckZhY3Rvcnl9IGZyb20gXCJ0cy1leGlmLXBhcnNlclwiO1xuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVGaWxlU2VsZWN0KGV2dDogYW55KSB7XG4gICAgbGV0IGZpbGVzOiBGaWxlW10gPSBldnQudGFyZ2V0LmZpbGVzOyAvLyBGaWxlTGlzdCBvYmplY3RcbiAgICBmb3IgKGxldCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICAgIGxldCBidWZmZXIgPSBhd2FpdCBmaWxlLmFycmF5QnVmZmVyKCk7XG4gICAgICAgIGxldCBwYXJzZXIgPSBFeGlmUGFyc2VyRmFjdG9yeS5jcmVhdGUoYnVmZmVyKTtcbiAgICAgICAgbGV0IG91dHB1dCA9IHBhcnNlci5wYXJzZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpc3RcIikpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpc3RcIikuaW5uZXJIVE1MID0gSlNPTi5zdHJpbmdpZnkob3V0cHV0LnRhZ3MpO1xuICAgICAgICBjb25zb2xlLmxvZyhvdXRwdXQudGFncyk7XG4gICAgfVxuXG59XG5cbmRvY3VtZW50Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZXMnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBoYW5kbGVGaWxlU2VsZWN0LCBmYWxzZSk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=