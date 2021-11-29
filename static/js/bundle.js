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
        var files, filePairs, _i, files_1, file, buffer, parser, output, tags, filteredFilePairs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    files = evt.target.files;
                    filePairs = [];
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
                    tags = output.tags;
                    filePairs.push({ file: file, tags: tags });
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    filteredFilePairs = filePairs.filter(function (_a) {
                        var file = _a.file, tags = _a.tags;
                        return tags.LensMake === "Apple";
                    });
                    console.log({ filePairs: filePairs, filteredFilePairs: filteredFilePairs });
                    // @ts-ignore
                    window.map = map;
                    return [2 /*return*/];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQywwQkFBMEIsWUFBWSxLQUFLO0FBQzVDOzs7Ozs7Ozs7O0FDdmRhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGdCQUFnQjtBQUNoQiwwQkFBMEIsbUJBQU8sQ0FBQyxtRkFBcUI7QUFDdkQsaUJBQWlCLG1CQUFPLENBQUMsaUVBQVk7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLHNEQUFzRDtBQUNwRztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxrQ0FBa0MsZ0JBQWdCLEtBQUs7QUFDeEQ7Ozs7OztVQ3BGQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ04yRDtBQUUzRCxTQUFlLGdCQUFnQixDQUFDLEdBQVE7Ozs7OztvQkFDaEMsS0FBSyxHQUFXLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO29CQUMvQixTQUFTLEdBQW1DLEVBQUUsQ0FBQzswQkFDL0IsRUFBTCxlQUFLOzs7eUJBQUwsb0JBQUs7b0JBQWIsSUFBSTtvQkFDSSxxQkFBTSxJQUFJLENBQUMsV0FBVyxFQUFFOztvQkFBakMsTUFBTSxHQUFHLFNBQXdCO29CQUNqQyxNQUFNLEdBQUcsb0VBQXdCLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzFDLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ3RCLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUN6QixTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxRQUFFLElBQUksUUFBQyxDQUFDOzs7b0JBTGYsSUFBSzs7O29CQU9oQixpQkFBaUIsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQUMsRUFBWTs0QkFBWCxJQUFJLFlBQUUsSUFBSTt3QkFBTSxXQUFJLENBQUMsUUFBUSxLQUFLLE9BQU87b0JBQXpCLENBQXlCLENBQUMsQ0FBQztvQkFDeEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFDLFNBQVMsYUFBRSxpQkFBaUIscUJBQUMsQ0FBQyxDQUFDO29CQUM1QyxhQUFhO29CQUNiLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDOzs7OztDQUVwQjtBQUVELFFBQVEsQ0FBQyxrQkFBa0IsR0FBRztJQUMxQixRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN6RixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaWFuX3dlYnBhY2svLi9ub2RlX21vZHVsZXMvdHMtZXhpZi1wYXJzZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaWFuX3dlYnBhY2svLi9ub2RlX21vZHVsZXMvdHMtZXhpZi1wYXJzZXIvbGliL0J1ZmZlclN0cmVhbS5qcyIsIndlYnBhY2s6Ly9pYW5fd2VicGFjay8uL25vZGVfbW9kdWxlcy90cy1leGlmLXBhcnNlci9saWIvRE9NQnVmZmVyU3RyZWFtLmpzIiwid2VicGFjazovL2lhbl93ZWJwYWNrLy4vbm9kZV9tb2R1bGVzL3RzLWV4aWYtcGFyc2VyL2xpYi9EYXRlVXRpbC5qcyIsIndlYnBhY2s6Ly9pYW5fd2VicGFjay8uL25vZGVfbW9kdWxlcy90cy1leGlmLXBhcnNlci9saWIvRXhpZkRhdGEuanMiLCJ3ZWJwYWNrOi8vaWFuX3dlYnBhY2svLi9ub2RlX21vZHVsZXMvdHMtZXhpZi1wYXJzZXIvbGliL0V4aWZQYXJzZXIuanMiLCJ3ZWJwYWNrOi8vaWFuX3dlYnBhY2svLi9ub2RlX21vZHVsZXMvdHMtZXhpZi1wYXJzZXIvbGliL0V4aWZQYXJzZXJGYWN0b3J5LmpzIiwid2VicGFjazovL2lhbl93ZWJwYWNrLy4vbm9kZV9tb2R1bGVzL3RzLWV4aWYtcGFyc2VyL2xpYi9FeGlmU2VjdGlvblBhcnNlci5qcyIsIndlYnBhY2s6Ly9pYW5fd2VicGFjay8uL25vZGVfbW9kdWxlcy90cy1leGlmLXBhcnNlci9saWIvSnBlZ1BhcnNlci5qcyIsIndlYnBhY2s6Ly9pYW5fd2VicGFjay8uL25vZGVfbW9kdWxlcy90cy1leGlmLXBhcnNlci9saWIvZXhpZi10YWdzLmpzIiwid2VicGFjazovL2lhbl93ZWJwYWNrLy4vbm9kZV9tb2R1bGVzL3RzLWV4aWYtcGFyc2VyL2xpYi9zaW1wbGlmeS5qcyIsIndlYnBhY2s6Ly9pYW5fd2VicGFjay93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9pYW5fd2VicGFjay93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2lhbl93ZWJwYWNrLy4vc3RhdGljL3RzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5UaHVtYm5haWxUeXBlcyA9IGV4cG9ydHMuRXhpZkRhdGEgPSBleHBvcnRzLk9yaWVudGF0aW9uVHlwZXMgPSBleHBvcnRzLkV4aWZQYXJzZXJGYWN0b3J5ID0gdm9pZCAwO1xudmFyIEV4aWZQYXJzZXJGYWN0b3J5XzEgPSByZXF1aXJlKFwiLi9saWIvRXhpZlBhcnNlckZhY3RvcnlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJFeGlmUGFyc2VyRmFjdG9yeVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gRXhpZlBhcnNlckZhY3RvcnlfMS5FeGlmUGFyc2VyRmFjdG9yeTsgfSB9KTtcbnZhciBFeGlmRGF0YV8xID0gcmVxdWlyZShcIi4vbGliL0V4aWZEYXRhXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiT3JpZW50YXRpb25UeXBlc1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gRXhpZkRhdGFfMS5PcmllbnRhdGlvblR5cGVzOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiRXhpZkRhdGFcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIEV4aWZEYXRhXzEuRXhpZkRhdGE7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJUaHVtYm5haWxUeXBlc1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gRXhpZkRhdGFfMS5UaHVtYm5haWxUeXBlczsgfSB9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5CdWZmZXJTdHJlYW0gPSB2b2lkIDA7XG52YXIgQnVmZmVyU3RyZWFtID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJ1ZmZlclN0cmVhbShidWZmZXIsIG9mZnNldCwgbGVuZ3RoLCBiaWdFbmRpYW4pIHtcbiAgICAgICAgaWYgKG9mZnNldCA9PT0gdm9pZCAwKSB7IG9mZnNldCA9IDA7IH1cbiAgICAgICAgaWYgKGxlbmd0aCA9PT0gdm9pZCAwKSB7IGxlbmd0aCA9IGJ1ZmZlci5sZW5ndGg7IH1cbiAgICAgICAgdGhpcy5idWZmZXIgPSBidWZmZXI7XG4gICAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy5iaWdFbmRpYW4gPSBiaWdFbmRpYW47XG4gICAgICAgIHRoaXMuZW5kUG9zaXRpb24gPSB0aGlzLm9mZnNldCArIGxlbmd0aDtcbiAgICAgICAgdGhpcy5zZXRCaWdFbmRpYW4oYmlnRW5kaWFuKTtcbiAgICB9XG4gICAgQnVmZmVyU3RyZWFtLnByb3RvdHlwZS5zZXRCaWdFbmRpYW4gPSBmdW5jdGlvbiAoYmlnRW5kaWFuKSB7XG4gICAgICAgIHRoaXMuYmlnRW5kaWFuID0gISFiaWdFbmRpYW47XG4gICAgfTtcbiAgICBCdWZmZXJTdHJlYW0ucHJvdG90eXBlLm5leHRVSW50OCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5idWZmZXIucmVhZFVJbnQ4KHRoaXMub2Zmc2V0KTtcbiAgICAgICAgdGhpcy5vZmZzZXQgKz0gMTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgQnVmZmVyU3RyZWFtLnByb3RvdHlwZS5uZXh0SW50OCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5idWZmZXIucmVhZEludDgodGhpcy5vZmZzZXQpO1xuICAgICAgICB0aGlzLm9mZnNldCArPSAxO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBCdWZmZXJTdHJlYW0ucHJvdG90eXBlLm5leHRVSW50MTYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuYmlnRW5kaWFuID8gdGhpcy5idWZmZXIucmVhZFVJbnQxNkJFKHRoaXMub2Zmc2V0KSA6IHRoaXMuYnVmZmVyLnJlYWRVSW50MTZMRSh0aGlzLm9mZnNldCk7XG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IDI7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIEJ1ZmZlclN0cmVhbS5wcm90b3R5cGUubmV4dFVJbnQzMiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5iaWdFbmRpYW4gPyB0aGlzLmJ1ZmZlci5yZWFkVUludDMyQkUodGhpcy5vZmZzZXQpIDogdGhpcy5idWZmZXIucmVhZFVJbnQzMkxFKHRoaXMub2Zmc2V0KTtcbiAgICAgICAgdGhpcy5vZmZzZXQgKz0gNDtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgQnVmZmVyU3RyZWFtLnByb3RvdHlwZS5uZXh0SW50MTYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuYmlnRW5kaWFuID8gdGhpcy5idWZmZXIucmVhZEludDE2QkUodGhpcy5vZmZzZXQpIDogdGhpcy5idWZmZXIucmVhZEludDE2TEUodGhpcy5vZmZzZXQpO1xuICAgICAgICB0aGlzLm9mZnNldCArPSAyO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBCdWZmZXJTdHJlYW0ucHJvdG90eXBlLm5leHRJbnQzMiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5iaWdFbmRpYW4gPyB0aGlzLmJ1ZmZlci5yZWFkSW50MzJCRSh0aGlzLm9mZnNldCkgOiB0aGlzLmJ1ZmZlci5yZWFkSW50MzJMRSh0aGlzLm9mZnNldCk7XG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IDQ7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIEJ1ZmZlclN0cmVhbS5wcm90b3R5cGUubmV4dEZsb2F0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmJpZ0VuZGlhbiA/IHRoaXMuYnVmZmVyLnJlYWRGbG9hdEJFKHRoaXMub2Zmc2V0KSA6IHRoaXMuYnVmZmVyLnJlYWRGbG9hdExFKHRoaXMub2Zmc2V0KTtcbiAgICAgICAgdGhpcy5vZmZzZXQgKz0gNDtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgQnVmZmVyU3RyZWFtLnByb3RvdHlwZS5uZXh0RG91YmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmJpZ0VuZGlhbiA/IHRoaXMuYnVmZmVyLnJlYWREb3VibGVCRSh0aGlzLm9mZnNldCkgOiB0aGlzLmJ1ZmZlci5yZWFkRG91YmxlTEUodGhpcy5vZmZzZXQpO1xuICAgICAgICB0aGlzLm9mZnNldCArPSA4O1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBCdWZmZXJTdHJlYW0ucHJvdG90eXBlLm5leHRCdWZmZXIgPSBmdW5jdGlvbiAobGVuZ3RoKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuYnVmZmVyLnNsaWNlKHRoaXMub2Zmc2V0LCB0aGlzLm9mZnNldCArIGxlbmd0aCk7XG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IGxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgQnVmZmVyU3RyZWFtLnByb3RvdHlwZS5yZW1haW5pbmdMZW5ndGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuZFBvc2l0aW9uIC0gdGhpcy5vZmZzZXQ7XG4gICAgfTtcbiAgICBCdWZmZXJTdHJlYW0ucHJvdG90eXBlLm5leHRTdHJpbmcgPSBmdW5jdGlvbiAobGVuZ3RoKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuYnVmZmVyLnRvU3RyaW5nKCd1dGY4JywgdGhpcy5vZmZzZXQsIHRoaXMub2Zmc2V0ICsgbGVuZ3RoKTtcbiAgICAgICAgdGhpcy5vZmZzZXQgKz0gbGVuZ3RoO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBCdWZmZXJTdHJlYW0ucHJvdG90eXBlLm1hcmsgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9wZW5XaXRoT2Zmc2V0OiBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gKG9mZnNldCB8fCAwKSArIHRoaXMub2Zmc2V0O1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQnVmZmVyU3RyZWFtKHNlbGYuYnVmZmVyLCBvZmZzZXQsIHNlbGYuZW5kUG9zaXRpb24gLSBvZmZzZXQsIHNlbGYuYmlnRW5kaWFuKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvZmZzZXQ6IHRoaXMub2Zmc2V0XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBCdWZmZXJTdHJlYW0ucHJvdG90eXBlLm9mZnNldEZyb20gPSBmdW5jdGlvbiAobWFya2VyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9mZnNldCAtIG1hcmtlci5vZmZzZXQ7XG4gICAgfTtcbiAgICBCdWZmZXJTdHJlYW0ucHJvdG90eXBlLnNraXAgPSBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IGFtb3VudDtcbiAgICB9O1xuICAgIEJ1ZmZlclN0cmVhbS5wcm90b3R5cGUuYnJhbmNoID0gZnVuY3Rpb24gKG9mZnNldCwgbGVuZ3RoKSB7XG4gICAgICAgIGxlbmd0aCA9IHR5cGVvZiBsZW5ndGggPT09ICdudW1iZXInID8gbGVuZ3RoIDogdGhpcy5lbmRQb3NpdGlvbiAtICh0aGlzLm9mZnNldCArIG9mZnNldCk7XG4gICAgICAgIHJldHVybiBuZXcgQnVmZmVyU3RyZWFtKHRoaXMuYnVmZmVyLCB0aGlzLm9mZnNldCArIG9mZnNldCwgbGVuZ3RoLCB0aGlzLmJpZ0VuZGlhbik7XG4gICAgfTtcbiAgICByZXR1cm4gQnVmZmVyU3RyZWFtO1xufSgpKTtcbmV4cG9ydHMuQnVmZmVyU3RyZWFtID0gQnVmZmVyU3RyZWFtO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QnVmZmVyU3RyZWFtLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuLypqc2xpbnQgYnJvd3NlcjogdHJ1ZSwgZGV2ZWw6IHRydWUsIGJpdHdpc2U6IGZhbHNlLCBkZWJ1ZzogdHJ1ZSwgZXFlcTogZmFsc2UsIGVzNTogdHJ1ZSwgZXZpbDogZmFsc2UsIGZvcmluOiBmYWxzZSwgbmV3Y2FwOiBmYWxzZSwgbm9tZW46IHRydWUsIHBsdXNwbHVzOiB0cnVlLCByZWdleHA6IGZhbHNlLCB1bnBhcmFtOiBmYWxzZSwgc2xvcHB5OiB0cnVlLCBzdHVwaWQ6IGZhbHNlLCBzdWI6IGZhbHNlLCB0b2RvOiB0cnVlLCBsZXRzOiB0cnVlLCB3aGl0ZTogdHJ1ZSAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5ET01CdWZmZXJTdHJlYW0gPSB2b2lkIDA7XG52YXIgRE9NQnVmZmVyU3RyZWFtID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERPTUJ1ZmZlclN0cmVhbShhcnJheUJ1ZmZlciwgb2Zmc2V0LCBsZW5ndGgsIGJpZ0VuZGlhbiwgZ2xvYmFsLCBwYXJlbnRPZmZzZXQpIHtcbiAgICAgICAgdGhpcy5hcnJheUJ1ZmZlciA9IGFycmF5QnVmZmVyO1xuICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMuYmlnRW5kaWFuID0gYmlnRW5kaWFuO1xuICAgICAgICB0aGlzLmdsb2JhbCA9IGdsb2JhbDtcbiAgICAgICAgdGhpcy5wYXJlbnRPZmZzZXQgPSBwYXJlbnRPZmZzZXQ7XG4gICAgICAgIHRoaXMuZ2xvYmFsID0gZ2xvYmFsO1xuICAgICAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcbiAgICAgICAgbGVuZ3RoID0gbGVuZ3RoIHx8IChhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoIC0gb2Zmc2V0KTtcbiAgICAgICAgdGhpcy5hcnJheUJ1ZmZlciA9IGFycmF5QnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgbGVuZ3RoKTtcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IGdsb2JhbC5EYXRhVmlldyh0aGlzLmFycmF5QnVmZmVyLCAwLCB0aGlzLmFycmF5QnVmZmVyLmJ5dGVMZW5ndGgpO1xuICAgICAgICB0aGlzLnNldEJpZ0VuZGlhbihiaWdFbmRpYW4pO1xuICAgICAgICB0aGlzLm9mZnNldCA9IDA7XG4gICAgICAgIHRoaXMucGFyZW50T2Zmc2V0ID0gKHBhcmVudE9mZnNldCB8fCAwKSArIG9mZnNldDtcbiAgICB9XG4gICAgRE9NQnVmZmVyU3RyZWFtLnByb3RvdHlwZS5zZXRCaWdFbmRpYW4gPSBmdW5jdGlvbiAoYmlnRW5kaWFuKSB7XG4gICAgICAgIHRoaXMubGl0dGxlRW5kaWFuID0gIWJpZ0VuZGlhbjtcbiAgICB9O1xuICAgIERPTUJ1ZmZlclN0cmVhbS5wcm90b3R5cGUubmV4dFVJbnQ4ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnZpZXcuZ2V0VWludDgodGhpcy5vZmZzZXQpO1xuICAgICAgICB0aGlzLm9mZnNldCArPSAxO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBET01CdWZmZXJTdHJlYW0ucHJvdG90eXBlLm5leHRJbnQ4ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnZpZXcuZ2V0SW50OCh0aGlzLm9mZnNldCk7XG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IDE7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIERPTUJ1ZmZlclN0cmVhbS5wcm90b3R5cGUubmV4dFVJbnQxNiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy52aWV3LmdldFVpbnQxNih0aGlzLm9mZnNldCwgdGhpcy5saXR0bGVFbmRpYW4pO1xuICAgICAgICB0aGlzLm9mZnNldCArPSAyO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBET01CdWZmZXJTdHJlYW0ucHJvdG90eXBlLm5leHRVSW50MzIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMudmlldy5nZXRVaW50MzIodGhpcy5vZmZzZXQsIHRoaXMubGl0dGxlRW5kaWFuKTtcbiAgICAgICAgdGhpcy5vZmZzZXQgKz0gNDtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgRE9NQnVmZmVyU3RyZWFtLnByb3RvdHlwZS5uZXh0SW50MTYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMudmlldy5nZXRJbnQxNih0aGlzLm9mZnNldCwgdGhpcy5saXR0bGVFbmRpYW4pO1xuICAgICAgICB0aGlzLm9mZnNldCArPSAyO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBET01CdWZmZXJTdHJlYW0ucHJvdG90eXBlLm5leHRJbnQzMiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy52aWV3LmdldEludDMyKHRoaXMub2Zmc2V0LCB0aGlzLmxpdHRsZUVuZGlhbik7XG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IDQ7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIERPTUJ1ZmZlclN0cmVhbS5wcm90b3R5cGUubmV4dEZsb2F0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnZpZXcuZ2V0RmxvYXQzMih0aGlzLm9mZnNldCwgdGhpcy5saXR0bGVFbmRpYW4pO1xuICAgICAgICB0aGlzLm9mZnNldCArPSA0O1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBET01CdWZmZXJTdHJlYW0ucHJvdG90eXBlLm5leHREb3VibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMudmlldy5nZXRGbG9hdDY0KHRoaXMub2Zmc2V0LCB0aGlzLmxpdHRsZUVuZGlhbik7XG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IDg7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIERPTUJ1ZmZlclN0cmVhbS5wcm90b3R5cGUubmV4dEJ1ZmZlciA9IGZ1bmN0aW9uIChsZW5ndGgpIHtcbiAgICAgICAgLy90aGlzIHdvbid0IHdvcmsgaW4gSUUxMFxuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmFycmF5QnVmZmVyLnNsaWNlKHRoaXMub2Zmc2V0LCB0aGlzLm9mZnNldCArIGxlbmd0aCk7XG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IGxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgRE9NQnVmZmVyU3RyZWFtLnByb3RvdHlwZS5yZW1haW5pbmdMZW5ndGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFycmF5QnVmZmVyLmJ5dGVMZW5ndGggLSB0aGlzLm9mZnNldDtcbiAgICB9O1xuICAgIERPTUJ1ZmZlclN0cmVhbS5wcm90b3R5cGUubmV4dFN0cmluZyA9IGZ1bmN0aW9uIChsZW5ndGgpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5hcnJheUJ1ZmZlci5zbGljZSh0aGlzLm9mZnNldCwgdGhpcy5vZmZzZXQgKyBsZW5ndGgpO1xuICAgICAgICB2YWx1ZSA9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgbmV3IHRoaXMuZ2xvYmFsLlVpbnQ4QXJyYXkodmFsdWUpKTtcbiAgICAgICAgdGhpcy5vZmZzZXQgKz0gbGVuZ3RoO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBET01CdWZmZXJTdHJlYW0ucHJvdG90eXBlLm1hcmsgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9wZW5XaXRoT2Zmc2V0OiBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gKG9mZnNldCB8fCAwKSArIHRoaXMub2Zmc2V0O1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRE9NQnVmZmVyU3RyZWFtKHNlbGYuYXJyYXlCdWZmZXIsIG9mZnNldCwgc2VsZi5hcnJheUJ1ZmZlci5ieXRlTGVuZ3RoIC0gb2Zmc2V0LCAhc2VsZi5saXR0bGVFbmRpYW4sIHNlbGYuZ2xvYmFsLCBzZWxmLnBhcmVudE9mZnNldCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb2Zmc2V0OiB0aGlzLm9mZnNldCxcbiAgICAgICAgICAgIGdldFBhcmVudE9mZnNldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLnBhcmVudE9mZnNldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xuICAgIERPTUJ1ZmZlclN0cmVhbS5wcm90b3R5cGUub2Zmc2V0RnJvbSA9IGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50T2Zmc2V0ICsgdGhpcy5vZmZzZXQgLSAobWFya2VyLm9mZnNldCArIG1hcmtlci5nZXRQYXJlbnRPZmZzZXQoKSk7XG4gICAgfTtcbiAgICBET01CdWZmZXJTdHJlYW0ucHJvdG90eXBlLnNraXAgPSBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IGFtb3VudDtcbiAgICB9O1xuICAgIERPTUJ1ZmZlclN0cmVhbS5wcm90b3R5cGUuYnJhbmNoID0gZnVuY3Rpb24gKG9mZnNldCwgbGVuZ3RoKSB7XG4gICAgICAgIGxlbmd0aCA9IHR5cGVvZiBsZW5ndGggPT09ICdudW1iZXInID8gbGVuZ3RoIDogdGhpcy5hcnJheUJ1ZmZlci5ieXRlTGVuZ3RoIC0gKHRoaXMub2Zmc2V0ICsgb2Zmc2V0KTtcbiAgICAgICAgcmV0dXJuIG5ldyBET01CdWZmZXJTdHJlYW0odGhpcy5hcnJheUJ1ZmZlciwgdGhpcy5vZmZzZXQgKyBvZmZzZXQsIGxlbmd0aCwgIXRoaXMubGl0dGxlRW5kaWFuLCB0aGlzLmdsb2JhbCwgdGhpcy5wYXJlbnRPZmZzZXQpO1xuICAgIH07XG4gICAgcmV0dXJuIERPTUJ1ZmZlclN0cmVhbTtcbn0oKSk7XG5leHBvcnRzLkRPTUJ1ZmZlclN0cmVhbSA9IERPTUJ1ZmZlclN0cmVhbTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURPTUJ1ZmZlclN0cmVhbS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRGF0ZVV0aWwgPSB2b2lkIDA7XG52YXIgRGF0ZVV0aWwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGF0ZVV0aWwoKSB7XG4gICAgfVxuICAgIERhdGVVdGlsLnBhcnNlTnVtYmVyID0gZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHMsIDEwKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHRha2UgZGF0ZSAoeWVhciwgbW9udGgsIGRheSkgYW5kIHRpbWUgKGhvdXIsIG1pbnV0ZXMsIHNlY29uZHMpIGRpZ2l0cyBpbiBVVENcbiAgICAgKiBhbmQgcmV0dXJuIGEgdGltZXN0YW1wIGluIHNlY29uZHNcbiAgICAgKiBAcGFyYW0gZGF0ZVBhcnRzXG4gICAgICogQHBhcmFtIHRpbWVQYXJ0c1xuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgRGF0ZVV0aWwucGFyc2VEYXRlVGltZVBhcnRzID0gZnVuY3Rpb24gKGRhdGVQYXJ0cywgdGltZVBhcnRzKSB7XG4gICAgICAgIGRhdGVQYXJ0cyA9IGRhdGVQYXJ0cy5tYXAoRGF0ZVV0aWwucGFyc2VOdW1iZXIpO1xuICAgICAgICB0aW1lUGFydHMgPSB0aW1lUGFydHMubWFwKERhdGVVdGlsLnBhcnNlTnVtYmVyKTtcbiAgICAgICAgdmFyIHllYXIgPSBkYXRlUGFydHNbMF07XG4gICAgICAgIHZhciBtb250aCA9IGRhdGVQYXJ0c1sxXSAtIDE7XG4gICAgICAgIHZhciBkYXkgPSBkYXRlUGFydHNbMl07XG4gICAgICAgIHZhciBob3VycyA9IHRpbWVQYXJ0c1swXTtcbiAgICAgICAgdmFyIG1pbnV0ZXMgPSB0aW1lUGFydHNbMV07XG4gICAgICAgIHZhciBzZWNvbmRzID0gdGltZVBhcnRzWzJdO1xuICAgICAgICB2YXIgZGF0ZSA9IERhdGUuVVRDKHllYXIsIG1vbnRoLCBkYXksIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCAwKTtcbiAgICAgICAgdmFyIHRpbWVzdGFtcCA9IGRhdGUgLyAxMDAwO1xuICAgICAgICByZXR1cm4gdGltZXN0YW1wO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcGFyc2UgZGF0ZSB3aXRoIFwiMjAwNC0wOS0wNFQyMzozOTowNi0wODowMFwiIGZvcm1hdCxcbiAgICAgKiBvbmUgb2YgdGhlIGZvcm1hdHMgc3VwcG9ydGVkIGJ5IElTTyA4NjAxLCBhbmRcbiAgICAgKiBjb252ZXJ0IHRvIHV0YyB0aW1lc3RhbXAgaW4gc2Vjb25kc1xuICAgICAqIEBwYXJhbSBkYXRlVGltZVN0clxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgRGF0ZVV0aWwucGFyc2VEYXRlV2l0aFRpbWV6b25lRm9ybWF0ID0gZnVuY3Rpb24gKGRhdGVUaW1lU3RyKSB7XG4gICAgICAgIHZhciBkYXRlUGFydHMgPSBkYXRlVGltZVN0ci5zdWJzdHIoMCwgMTApLnNwbGl0KCctJyk7XG4gICAgICAgIHZhciB0aW1lUGFydHMgPSBkYXRlVGltZVN0ci5zdWJzdHIoMTEsIDgpLnNwbGl0KCc6Jyk7XG4gICAgICAgIHZhciB0aW1lem9uZVN0ciA9IGRhdGVUaW1lU3RyLnN1YnN0cigxOSwgNik7XG4gICAgICAgIHZhciB0aW1lem9uZVBhcnRzID0gdGltZXpvbmVTdHIuc3BsaXQoJzonKS5tYXAoRGF0ZVV0aWwucGFyc2VOdW1iZXIpO1xuICAgICAgICB2YXIgdGltZXpvbmVPZmZzZXQgPSAodGltZXpvbmVQYXJ0c1swXSAqIERhdGVVdGlsLmhvdXJzKSArXG4gICAgICAgICAgICAodGltZXpvbmVQYXJ0c1sxXSAqIERhdGVVdGlsLm1pbnV0ZXMpO1xuICAgICAgICB2YXIgdGltZXN0YW1wID0gRGF0ZVV0aWwucGFyc2VEYXRlVGltZVBhcnRzKGRhdGVQYXJ0cywgdGltZVBhcnRzKTtcbiAgICAgICAgLy9taW51cyBiZWNhdXNlIHRoZSB0aW1lem9uZU9mZnNldCBkZXNjcmliZXNcbiAgICAgICAgLy9ob3cgbXVjaCB0aGUgZGVzY3JpYmVkIHRpbWUgaXMgYWhlYWQgb2YgVVRDXG4gICAgICAgIHRpbWVzdGFtcCAtPSB0aW1lem9uZU9mZnNldDtcbiAgICAgICAgaWYgKHR5cGVvZiB0aW1lc3RhbXAgPT09ICdudW1iZXInICYmICFpc05hTih0aW1lc3RhbXApKSB7XG4gICAgICAgICAgICByZXR1cm4gdGltZXN0YW1wO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBwYXJzZSBkYXRlIHdpdGggXCJZWVlZOk1NOkREIGhoOm1tOnNzXCIgZm9ybWF0LCBjb252ZXJ0IHRvIHV0YyB0aW1lc3RhbXAgaW4gc2Vjb25kc1xuICAgICAqIEBwYXJhbSBkYXRlVGltZVN0clxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgRGF0ZVV0aWwucGFyc2VEYXRlV2l0aFNwZWNGb3JtYXQgPSBmdW5jdGlvbiAoZGF0ZVRpbWVTdHIpIHtcbiAgICAgICAgdmFyIHBhcnRzID0gZGF0ZVRpbWVTdHIuc3BsaXQoJyAnKSwgZGF0ZVBhcnRzID0gcGFydHNbMF0uc3BsaXQoJzonKSwgdGltZVBhcnRzID0gcGFydHNbMV0uc3BsaXQoJzonKTtcbiAgICAgICAgdmFyIHRpbWVzdGFtcCA9IERhdGVVdGlsLnBhcnNlRGF0ZVRpbWVQYXJ0cyhkYXRlUGFydHMsIHRpbWVQYXJ0cyk7XG4gICAgICAgIGlmICh0eXBlb2YgdGltZXN0YW1wID09PSAnbnVtYmVyJyAmJiAhaXNOYU4odGltZXN0YW1wKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRpbWVzdGFtcDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRGF0ZVV0aWwucGFyc2VFeGlmRGF0ZSA9IGZ1bmN0aW9uIChkYXRlVGltZVN0cikge1xuICAgICAgICAvL3NvbWUgZWFzeSBjaGVja3MgdG8gZGV0ZXJtaW5lIHR3byBjb21tb24gZGF0ZSBmb3JtYXRzXG4gICAgICAgIC8vaXMgdGhlIGRhdGUgaW4gdGhlIHN0YW5kYXJkIFwiWVlZWTpNTTpERCBoaDptbTpzc1wiIGZvcm1hdD9cbiAgICAgICAgdmFyIGlzU3BlY0Zvcm1hdCA9IGRhdGVUaW1lU3RyLmxlbmd0aCA9PT0gMTkgJiZcbiAgICAgICAgICAgIGRhdGVUaW1lU3RyLmNoYXJBdCg0KSA9PT0gJzonO1xuICAgICAgICAvL2lzIHRoZSBkYXRlIGluIHRoZSBub24tc3RhbmRhcmQgZm9ybWF0LFxuICAgICAgICAvL1wiMjAwNC0wOS0wNFQyMzozOTowNi0wODowMFwiIHRvIGluY2x1ZGUgYSB0aW1lem9uZT9cbiAgICAgICAgdmFyIGlzVGltZXpvbmVGb3JtYXQgPSBkYXRlVGltZVN0ci5sZW5ndGggPT09IDI1ICYmXG4gICAgICAgICAgICBkYXRlVGltZVN0ci5jaGFyQXQoMTApID09PSAnVCc7XG4gICAgICAgIHZhciB0aW1lc3RhbXA7XG4gICAgICAgIGlmIChpc1RpbWV6b25lRm9ybWF0KSB7XG4gICAgICAgICAgICByZXR1cm4gRGF0ZVV0aWwucGFyc2VEYXRlV2l0aFRpbWV6b25lRm9ybWF0KGRhdGVUaW1lU3RyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc1NwZWNGb3JtYXQpIHtcbiAgICAgICAgICAgIHJldHVybiBEYXRlVXRpbC5wYXJzZURhdGVXaXRoU3BlY0Zvcm1hdChkYXRlVGltZVN0cik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vaW4gc2Vjb25kc1xuICAgIERhdGVVdGlsLmhvdXJzID0gMzYwMDtcbiAgICBEYXRlVXRpbC5taW51dGVzID0gNjA7XG4gICAgcmV0dXJuIERhdGVVdGlsO1xufSgpKTtcbmV4cG9ydHMuRGF0ZVV0aWwgPSBEYXRlVXRpbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURhdGVVdGlsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5FeGlmRGF0YSA9IGV4cG9ydHMuVGh1bWJuYWlsVHlwZXMgPSBleHBvcnRzLk9yaWVudGF0aW9uVHlwZXMgPSB2b2lkIDA7XG52YXIgSnBlZ1BhcnNlcl8xID0gcmVxdWlyZShcIi4vSnBlZ1BhcnNlclwiKTtcbnZhciBPcmllbnRhdGlvblR5cGVzO1xuKGZ1bmN0aW9uIChPcmllbnRhdGlvblR5cGVzKSB7XG4gICAgT3JpZW50YXRpb25UeXBlc1tPcmllbnRhdGlvblR5cGVzW1wiVE9QX0xFRlRcIl0gPSAxXSA9IFwiVE9QX0xFRlRcIjtcbiAgICBPcmllbnRhdGlvblR5cGVzW09yaWVudGF0aW9uVHlwZXNbXCJUT1BfUklHSFRcIl0gPSAyXSA9IFwiVE9QX1JJR0hUXCI7XG4gICAgT3JpZW50YXRpb25UeXBlc1tPcmllbnRhdGlvblR5cGVzW1wiQk9UVE9NX1JJR0hUXCJdID0gM10gPSBcIkJPVFRPTV9SSUdIVFwiO1xuICAgIE9yaWVudGF0aW9uVHlwZXNbT3JpZW50YXRpb25UeXBlc1tcIkJPVFRPTV9MRUZUXCJdID0gNF0gPSBcIkJPVFRPTV9MRUZUXCI7XG4gICAgT3JpZW50YXRpb25UeXBlc1tPcmllbnRhdGlvblR5cGVzW1wiTEVGVF9UT1BcIl0gPSA1XSA9IFwiTEVGVF9UT1BcIjtcbiAgICBPcmllbnRhdGlvblR5cGVzW09yaWVudGF0aW9uVHlwZXNbXCJSSUdIVF9UT1BcIl0gPSA2XSA9IFwiUklHSFRfVE9QXCI7XG4gICAgT3JpZW50YXRpb25UeXBlc1tPcmllbnRhdGlvblR5cGVzW1wiUklHSFRfQk9UVE9NXCJdID0gN10gPSBcIlJJR0hUX0JPVFRPTVwiO1xuICAgIE9yaWVudGF0aW9uVHlwZXNbT3JpZW50YXRpb25UeXBlc1tcIkxFRlRfQk9UVE9NXCJdID0gOF0gPSBcIkxFRlRfQk9UVE9NXCI7XG59KShPcmllbnRhdGlvblR5cGVzID0gZXhwb3J0cy5PcmllbnRhdGlvblR5cGVzIHx8IChleHBvcnRzLk9yaWVudGF0aW9uVHlwZXMgPSB7fSkpO1xudmFyIFRodW1ibmFpbFR5cGVzO1xuKGZ1bmN0aW9uIChUaHVtYm5haWxUeXBlcykge1xuICAgIFRodW1ibmFpbFR5cGVzW1RodW1ibmFpbFR5cGVzW1wianBlZ1wiXSA9IDZdID0gXCJqcGVnXCI7XG4gICAgVGh1bWJuYWlsVHlwZXNbVGh1bWJuYWlsVHlwZXNbXCJ0aWZmXCJdID0gMV0gPSBcInRpZmZcIjtcbn0pKFRodW1ibmFpbFR5cGVzID0gZXhwb3J0cy5UaHVtYm5haWxUeXBlcyB8fCAoZXhwb3J0cy5UaHVtYm5haWxUeXBlcyA9IHt9KSk7XG52YXIgRXhpZkRhdGEgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRXhpZkRhdGEoc3RhcnRNYXJrZXIsIHRhZ3MsIGltYWdlU2l6ZSwgdGh1bWJuYWlsT2Zmc2V0LCB0aHVtYm5haWxMZW5ndGgsIHRodW1ibmFpbFR5cGUsIGFwcDFPZmZzZXQpIHtcbiAgICAgICAgdGhpcy5zdGFydE1hcmtlciA9IHN0YXJ0TWFya2VyO1xuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzO1xuICAgICAgICB0aGlzLmltYWdlU2l6ZSA9IGltYWdlU2l6ZTtcbiAgICAgICAgdGhpcy50aHVtYm5haWxPZmZzZXQgPSB0aHVtYm5haWxPZmZzZXQ7XG4gICAgICAgIHRoaXMudGh1bWJuYWlsTGVuZ3RoID0gdGh1bWJuYWlsTGVuZ3RoO1xuICAgICAgICB0aGlzLnRodW1ibmFpbFR5cGUgPSB0aHVtYm5haWxUeXBlO1xuICAgICAgICB0aGlzLmFwcDFPZmZzZXQgPSBhcHAxT2Zmc2V0O1xuICAgIH1cbiAgICBFeGlmRGF0YS5wcm90b3R5cGUuaGFzVGh1bWJuYWlsID0gZnVuY3Rpb24gKG1pbWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRodW1ibmFpbE9mZnNldCB8fCAhdGhpcy50aHVtYm5haWxMZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG1pbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWltZS50b0xvd2VyQ2FzZSgpLnRyaW0oKSA9PT0gJ2ltYWdlL2pwZWcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50aHVtYm5haWxUeXBlID09PSBUaHVtYm5haWxUeXBlcy5qcGVnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtaW1lLnRvTG93ZXJDYXNlKCkudHJpbSgpID09PSAnaW1hZ2UvdGlmZicpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRodW1ibmFpbFR5cGUgPT09IFRodW1ibmFpbFR5cGVzLnRpZmY7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgRXhpZkRhdGEucHJvdG90eXBlLmdldFRodW1ibmFpbE9mZnNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwMU9mZnNldCArIDYgKyB0aGlzLnRodW1ibmFpbE9mZnNldDtcbiAgICB9O1xuICAgIEV4aWZEYXRhLnByb3RvdHlwZS5nZXRUaHVtYm5haWxMZW5ndGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRodW1ibmFpbExlbmd0aDtcbiAgICB9O1xuICAgIEV4aWZEYXRhLnByb3RvdHlwZS5nZXRUaHVtYm5haWxCdWZmZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFRodW1ibmFpbFN0cmVhbSgpLm5leHRCdWZmZXIodGhpcy50aHVtYm5haWxMZW5ndGgpO1xuICAgIH07XG4gICAgRXhpZkRhdGEucHJvdG90eXBlLmdldFRodW1ibmFpbFN0cmVhbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRNYXJrZXIub3BlbldpdGhPZmZzZXQodGhpcy5nZXRUaHVtYm5haWxPZmZzZXQoKSk7XG4gICAgfTtcbiAgICBFeGlmRGF0YS5wcm90b3R5cGUuZ2V0SW1hZ2VTaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZVNpemU7XG4gICAgfTtcbiAgICBFeGlmRGF0YS5wcm90b3R5cGUuZ2V0VGh1bWJuYWlsU2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN0cmVhbSA9IHRoaXMuZ2V0VGh1bWJuYWlsU3RyZWFtKCksIHNpemU7XG4gICAgICAgIEpwZWdQYXJzZXJfMS5KcGVnUGFyc2VyLnBhcnNlU2VjdGlvbnMoc3RyZWFtLCBmdW5jdGlvbiAoc2VjdGlvblR5cGUsIHNlY3Rpb25TdHJlYW0pIHtcbiAgICAgICAgICAgIGlmIChKcGVnUGFyc2VyXzEuSnBlZ1BhcnNlci5nZXRTZWN0aW9uTmFtZShzZWN0aW9uVHlwZSkubmFtZSA9PT0gJ1NPRicpIHtcbiAgICAgICAgICAgICAgICBzaXplID0gSnBlZ1BhcnNlcl8xLkpwZWdQYXJzZXIuZ2V0U2l6ZUZyb21TT0ZTZWN0aW9uKHNlY3Rpb25TdHJlYW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNpemU7XG4gICAgfTtcbiAgICByZXR1cm4gRXhpZkRhdGE7XG59KCkpO1xuZXhwb3J0cy5FeGlmRGF0YSA9IEV4aWZEYXRhO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RXhpZkRhdGEuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkV4aWZQYXJzZXIgPSB2b2lkIDA7XG4vKmpzbGludCBicm93c2VyOiB0cnVlLCBkZXZlbDogdHJ1ZSwgYml0d2lzZTogZmFsc2UsIGRlYnVnOiB0cnVlLCBlcWVxOiBmYWxzZSwgZXM1OiB0cnVlLCBldmlsOiBmYWxzZSwgZm9yaW46IGZhbHNlLCBuZXdjYXA6IGZhbHNlLCBub21lbjogdHJ1ZSwgcGx1c3BsdXM6IHRydWUsIHJlZ2V4cDogZmFsc2UsIHVucGFyYW06IGZhbHNlLCBzbG9wcHk6IHRydWUsIHN0dXBpZDogZmFsc2UsIHN1YjogZmFsc2UsIHRvZG86IHRydWUsIGxldHM6IHRydWUsIHdoaXRlOiB0cnVlICovXG52YXIgc2ltcGxpZnlfMSA9IHJlcXVpcmUoXCIuL3NpbXBsaWZ5XCIpO1xudmFyIEpwZWdQYXJzZXJfMSA9IHJlcXVpcmUoXCIuL0pwZWdQYXJzZXJcIik7XG52YXIgRXhpZlNlY3Rpb25QYXJzZXJfMSA9IHJlcXVpcmUoXCIuL0V4aWZTZWN0aW9uUGFyc2VyXCIpO1xudmFyIGV4aWZfdGFnc18xID0gcmVxdWlyZShcIi4vZXhpZi10YWdzXCIpO1xudmFyIEV4aWZEYXRhXzEgPSByZXF1aXJlKFwiLi9FeGlmRGF0YVwiKTtcbnZhciBFeGlmUGFyc2VyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEV4aWZQYXJzZXIoc3RyZWFtKSB7XG4gICAgICAgIHRoaXMuc3RyZWFtID0gc3RyZWFtO1xuICAgICAgICB0aGlzLmZsYWdzID0ge1xuICAgICAgICAgICAgcmVhZEJpbmFyeVRhZ3M6IGZhbHNlLFxuICAgICAgICAgICAgcmVzb2x2ZVRhZ05hbWVzOiB0cnVlLFxuICAgICAgICAgICAgc2ltcGxpZnlWYWx1ZXM6IHRydWUsXG4gICAgICAgICAgICBpbWFnZVNpemU6IHRydWUsXG4gICAgICAgICAgICBoaWRlUG9pbnRlcnM6IHRydWUsXG4gICAgICAgICAgICByZXR1cm5UYWdzOiB0cnVlXG4gICAgICAgIH07XG4gICAgfVxuICAgIEV4aWZQYXJzZXIucHJvdG90eXBlLmVuYWJsZUJpbmFyeUZpZWxkcyA9IGZ1bmN0aW9uIChlbmFibGUpIHtcbiAgICAgICAgdGhpcy5mbGFncy5yZWFkQmluYXJ5VGFncyA9IGVuYWJsZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBFeGlmUGFyc2VyLnByb3RvdHlwZS5lbmFibGVQb2ludGVycyA9IGZ1bmN0aW9uIChlbmFibGUpIHtcbiAgICAgICAgdGhpcy5mbGFncy5oaWRlUG9pbnRlcnMgPSAhZW5hYmxlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEV4aWZQYXJzZXIucHJvdG90eXBlLmVuYWJsZVRhZ05hbWVzID0gZnVuY3Rpb24gKGVuYWJsZSkge1xuICAgICAgICB0aGlzLmZsYWdzLnJlc29sdmVUYWdOYW1lcyA9IGVuYWJsZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBFeGlmUGFyc2VyLnByb3RvdHlwZS5lbmFibGVJbWFnZVNpemUgPSBmdW5jdGlvbiAoZW5hYmxlKSB7XG4gICAgICAgIHRoaXMuZmxhZ3MuaW1hZ2VTaXplID0gZW5hYmxlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEV4aWZQYXJzZXIucHJvdG90eXBlLmVuYWJsZVJldHVyblRhZ3MgPSBmdW5jdGlvbiAoZW5hYmxlKSB7XG4gICAgICAgIHRoaXMuZmxhZ3MucmV0dXJuVGFncyA9IGVuYWJsZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBFeGlmUGFyc2VyLnByb3RvdHlwZS5lbmFibGVTaW1wbGVWYWx1ZXMgPSBmdW5jdGlvbiAoZW5hYmxlKSB7XG4gICAgICAgIHRoaXMuZmxhZ3Muc2ltcGxpZnlWYWx1ZXMgPSBlbmFibGU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgRXhpZlBhcnNlci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdGFydCA9IHRoaXMuc3RyZWFtLm1hcmsoKSwgc3RyZWFtID0gc3RhcnQub3BlbldpdGhPZmZzZXQoMCksIGZsYWdzID0gdGhpcy5mbGFncywgdGFncywgaW1hZ2VTaXplLCB0aHVtYm5haWxPZmZzZXQsIHRodW1ibmFpbExlbmd0aCwgdGh1bWJuYWlsVHlwZSwgYXBwMU9mZnNldCwgZ2V0VGFnVmFsdWUsIHNldFRhZ1ZhbHVlO1xuICAgICAgICBpZiAoZmxhZ3MucmVzb2x2ZVRhZ05hbWVzKSB7XG4gICAgICAgICAgICB0YWdzID0ge307XG4gICAgICAgICAgICBnZXRUYWdWYWx1ZSA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhZ3NbdC5uYW1lXTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzZXRUYWdWYWx1ZSA9IGZ1bmN0aW9uICh0LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRhZ3NbdC5uYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRhZ3MgPSBbXTtcbiAgICAgICAgICAgIGdldFRhZ1ZhbHVlID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGFncy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFnc1tpXS50eXBlID09PSB0LnR5cGUgJiYgdGFnc1tpXS5zZWN0aW9uID09PSB0LnNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YWdzLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNldFRhZ1ZhbHVlID0gZnVuY3Rpb24gKHQsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHRhZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhZ3NbaV0udHlwZSA9PT0gdC50eXBlICYmIHRhZ3NbaV0uc2VjdGlvbiA9PT0gdC5zZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWdzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIEpwZWdQYXJzZXJfMS5KcGVnUGFyc2VyLnBhcnNlU2VjdGlvbnMoc3RyZWFtLCBmdW5jdGlvbiAoc2VjdGlvblR5cGUsIHNlY3Rpb25TdHJlYW0pIHtcbiAgICAgICAgICAgIHZhciB2YWxpZEV4aWZIZWFkZXJzLCBzZWN0aW9uT2Zmc2V0ID0gc2VjdGlvblN0cmVhbS5vZmZzZXRGcm9tKHN0YXJ0KTtcbiAgICAgICAgICAgIGlmIChzZWN0aW9uVHlwZSA9PT0gMHhFMSkge1xuICAgICAgICAgICAgICAgIHZhbGlkRXhpZkhlYWRlcnMgPSBFeGlmU2VjdGlvblBhcnNlcl8xLkV4aWZTZWN0aW9uUGFyc2VyLnBhcnNlVGFncyhzZWN0aW9uU3RyZWFtLCBmdW5jdGlvbiAoaWZkU2VjdGlvbiwgdGFnVHlwZSwgdmFsdWUsIGZvcm1hdCkge1xuICAgICAgICAgICAgICAgICAgICAvL2lnbm9yZSBiaW5hcnkgZmllbGRzIGlmIGRpc2FibGVkXG4gICAgICAgICAgICAgICAgICAgIGlmICghZmxhZ3MucmVhZEJpbmFyeVRhZ3MgJiYgZm9ybWF0ID09PSA3KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhZ1R5cGUgPT09IDB4MDIwMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsT2Zmc2V0ID0gdmFsdWVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmxhZ3MuaGlkZVBvaW50ZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRhZ1R5cGUgPT09IDB4MDIwMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsTGVuZ3RoID0gdmFsdWVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmxhZ3MuaGlkZVBvaW50ZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRhZ1R5cGUgPT09IDB4MDEwMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsVHlwZSA9IHZhbHVlWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZsYWdzLmhpZGVQb2ludGVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL2lmIGZsYWcgaXMgc2V0IHRvIG5vdCBzdG9yZSB0YWdzLCByZXR1cm4gaGVyZSBhZnRlciBzdG9yaW5nIHBvaW50ZXJzXG4gICAgICAgICAgICAgICAgICAgIGlmICghZmxhZ3MucmV0dXJuVGFncykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChmbGFncy5zaW1wbGlmeVZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBzaW1wbGlmeV8xLnNpbXBsaWZ5LnNpbXBsaWZ5VmFsdWUodmFsdWUsIGZvcm1hdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGZsYWdzLnJlc29sdmVUYWdOYW1lcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlY3Rpb25UYWdOYW1lcyA9IGlmZFNlY3Rpb24gPT09IEV4aWZTZWN0aW9uUGFyc2VyXzEuRXhpZlNlY3Rpb25zLkdQU0lGRCA/IGV4aWZfdGFnc18xLlRhZ3MuR1BTIDogZXhpZl90YWdzXzEuVGFncy5FeGlmO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWVfMSA9IHNlY3Rpb25UYWdOYW1lc1t0YWdUeXBlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmFtZV8xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZV8xID0gZXhpZl90YWdzXzEuVGFncy5FeGlmW3RhZ1R5cGVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0YWdzLmhhc093blByb3BlcnR5KG5hbWVfMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWdzW25hbWVfMV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZ3MucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VjdGlvbjogaWZkU2VjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0YWdUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAodmFsaWRFeGlmSGVhZGVycykge1xuICAgICAgICAgICAgICAgICAgICBhcHAxT2Zmc2V0ID0gc2VjdGlvbk9mZnNldDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChmbGFncy5pbWFnZVNpemUgJiYgSnBlZ1BhcnNlcl8xLkpwZWdQYXJzZXIuZ2V0U2VjdGlvbk5hbWUoc2VjdGlvblR5cGUpLm5hbWUgPT09ICdTT0YnKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VTaXplID0gSnBlZ1BhcnNlcl8xLkpwZWdQYXJzZXIuZ2V0U2l6ZUZyb21TT0ZTZWN0aW9uKHNlY3Rpb25TdHJlYW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGZsYWdzLnNpbXBsaWZ5VmFsdWVzKSB7XG4gICAgICAgICAgICBzaW1wbGlmeV8xLnNpbXBsaWZ5LmNhc3REZWdyZWVWYWx1ZXMoZ2V0VGFnVmFsdWUsIHNldFRhZ1ZhbHVlKTtcbiAgICAgICAgICAgIHNpbXBsaWZ5XzEuc2ltcGxpZnkuY2FzdERhdGVWYWx1ZXMoZ2V0VGFnVmFsdWUsIHNldFRhZ1ZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IEV4aWZEYXRhXzEuRXhpZkRhdGEoc3RhcnQsIHRhZ3MsIGltYWdlU2l6ZSwgdGh1bWJuYWlsT2Zmc2V0LCB0aHVtYm5haWxMZW5ndGgsIHRodW1ibmFpbFR5cGUsIGFwcDFPZmZzZXQpO1xuICAgIH07XG4gICAgcmV0dXJuIEV4aWZQYXJzZXI7XG59KCkpO1xuZXhwb3J0cy5FeGlmUGFyc2VyID0gRXhpZlBhcnNlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUV4aWZQYXJzZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkV4aWZQYXJzZXJGYWN0b3J5ID0gdm9pZCAwO1xudmFyIEV4aWZQYXJzZXJfMSA9IHJlcXVpcmUoXCIuL0V4aWZQYXJzZXJcIik7XG5mdW5jdGlvbiBnZXRHbG9iYWwoKSB7XG4gICAgcmV0dXJuICgxLCBldmFsKSgndGhpcycpO1xufVxudmFyIEV4aWZQYXJzZXJGYWN0b3J5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEV4aWZQYXJzZXJGYWN0b3J5KCkge1xuICAgIH1cbiAgICBFeGlmUGFyc2VyRmFjdG9yeS5jcmVhdGUgPSBmdW5jdGlvbiAoYnVmZmVyLCBnbG9iYWwpIHtcbiAgICAgICAgZ2xvYmFsID0gZ2xvYmFsIHx8IGdldEdsb2JhbCgpO1xuICAgICAgICBpZiAoYnVmZmVyIGluc3RhbmNlb2YgZ2xvYmFsLkFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICB2YXIgRE9NQnVmZmVyU3RyZWFtID0gcmVxdWlyZSgnLi9ET01CdWZmZXJTdHJlYW0nKS5ET01CdWZmZXJTdHJlYW07XG4gICAgICAgICAgICByZXR1cm4gbmV3IEV4aWZQYXJzZXJfMS5FeGlmUGFyc2VyKG5ldyBET01CdWZmZXJTdHJlYW0oYnVmZmVyLCAwLCBidWZmZXIuYnl0ZUxlbmd0aCwgdHJ1ZSwgZ2xvYmFsKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgTm9kZUJ1ZmZlclN0cmVhbSA9IHJlcXVpcmUoJy4vQnVmZmVyU3RyZWFtJykuQnVmZmVyU3RyZWFtO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFeGlmUGFyc2VyXzEuRXhpZlBhcnNlcihuZXcgTm9kZUJ1ZmZlclN0cmVhbShidWZmZXIsIDAsIGJ1ZmZlci5sZW5ndGgsIHRydWUpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEV4aWZQYXJzZXJGYWN0b3J5O1xufSgpKTtcbmV4cG9ydHMuRXhpZlBhcnNlckZhY3RvcnkgPSBFeGlmUGFyc2VyRmFjdG9yeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUV4aWZQYXJzZXJGYWN0b3J5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuLypqc2xpbnQgYnJvd3NlcjogdHJ1ZSwgZGV2ZWw6IHRydWUsIGJpdHdpc2U6IGZhbHNlLCBkZWJ1ZzogdHJ1ZSwgZXFlcTogZmFsc2UsIGVzNTogdHJ1ZSwgZXZpbDogZmFsc2UsIGZvcmluOiBmYWxzZSwgbmV3Y2FwOiBmYWxzZSwgbm9tZW46IHRydWUsIHBsdXNwbHVzOiB0cnVlLCByZWdleHA6IGZhbHNlLCB1bnBhcmFtOiBmYWxzZSwgc2xvcHB5OiB0cnVlLCBzdHVwaWQ6IGZhbHNlLCBzdWI6IGZhbHNlLCB0b2RvOiB0cnVlLCBsZXRzOiB0cnVlLCB3aGl0ZTogdHJ1ZSAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5FeGlmU2VjdGlvblBhcnNlciA9IGV4cG9ydHMuRXhpZlNlY3Rpb25zID0gdm9pZCAwO1xudmFyIEV4aWZTZWN0aW9ucztcbihmdW5jdGlvbiAoRXhpZlNlY3Rpb25zKSB7XG4gICAgRXhpZlNlY3Rpb25zW0V4aWZTZWN0aW9uc1tcIklGRDBcIl0gPSAxXSA9IFwiSUZEMFwiO1xuICAgIEV4aWZTZWN0aW9uc1tFeGlmU2VjdGlvbnNbXCJJRkQxXCJdID0gMl0gPSBcIklGRDFcIjtcbiAgICBFeGlmU2VjdGlvbnNbRXhpZlNlY3Rpb25zW1wiR1BTSUZEXCJdID0gM10gPSBcIkdQU0lGRFwiO1xuICAgIEV4aWZTZWN0aW9uc1tFeGlmU2VjdGlvbnNbXCJTdWJJRkRcIl0gPSA0XSA9IFwiU3ViSUZEXCI7XG4gICAgRXhpZlNlY3Rpb25zW0V4aWZTZWN0aW9uc1tcIkludGVyb3BJRkRcIl0gPSA1XSA9IFwiSW50ZXJvcElGRFwiO1xufSkoRXhpZlNlY3Rpb25zID0gZXhwb3J0cy5FeGlmU2VjdGlvbnMgfHwgKGV4cG9ydHMuRXhpZlNlY3Rpb25zID0ge30pKTtcbnZhciBFeGlmU2VjdGlvblBhcnNlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFeGlmU2VjdGlvblBhcnNlcigpIHtcbiAgICB9XG4gICAgRXhpZlNlY3Rpb25QYXJzZXIucGFyc2VUYWdzID0gZnVuY3Rpb24gKHN0cmVhbSwgaXRlcmF0b3IpIHtcbiAgICAgICAgdmFyIHRpZmZNYXJrZXI7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aWZmTWFya2VyID0gRXhpZlNlY3Rpb25QYXJzZXIucmVhZEhlYWRlcihzdHJlYW0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vaWdub3JlIEFQUDEgc2VjdGlvbnMgd2l0aCBpbnZhbGlkIGhlYWRlcnNcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3ViSWZkT2Zmc2V0LCBncHNPZmZzZXQsIGludGVyb3BPZmZzZXQ7XG4gICAgICAgIHZhciBpZmQwU3RyZWFtID0gdGlmZk1hcmtlci5vcGVuV2l0aE9mZnNldChzdHJlYW0ubmV4dFVJbnQzMigpKSwgSUZEMCA9IEV4aWZTZWN0aW9ucy5JRkQwO1xuICAgICAgICBFeGlmU2VjdGlvblBhcnNlci5yZWFkSUZEU2VjdGlvbih0aWZmTWFya2VyLCBpZmQwU3RyZWFtLCBmdW5jdGlvbiAodGFnVHlwZSwgdmFsdWUsIGZvcm1hdCkge1xuICAgICAgICAgICAgc3dpdGNoICh0YWdUeXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAweDg4MjU6XG4gICAgICAgICAgICAgICAgICAgIGdwc09mZnNldCA9IHZhbHVlWzBdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDB4ODc2OTpcbiAgICAgICAgICAgICAgICAgICAgc3ViSWZkT2Zmc2V0ID0gdmFsdWVbMF07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGl0ZXJhdG9yKElGRDAsIHRhZ1R5cGUsIHZhbHVlLCBmb3JtYXQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBpZmQxT2Zmc2V0ID0gaWZkMFN0cmVhbS5uZXh0VUludDMyKCk7XG4gICAgICAgIGlmIChpZmQxT2Zmc2V0ICE9PSAwKSB7XG4gICAgICAgICAgICB2YXIgaWZkMVN0cmVhbSA9IHRpZmZNYXJrZXIub3BlbldpdGhPZmZzZXQoaWZkMU9mZnNldCk7XG4gICAgICAgICAgICBFeGlmU2VjdGlvblBhcnNlci5yZWFkSUZEU2VjdGlvbih0aWZmTWFya2VyLCBpZmQxU3RyZWFtLCBpdGVyYXRvci5iaW5kKG51bGwsIEV4aWZTZWN0aW9ucy5JRkQxKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdwc09mZnNldCkge1xuICAgICAgICAgICAgdmFyIGdwc1N0cmVhbSA9IHRpZmZNYXJrZXIub3BlbldpdGhPZmZzZXQoZ3BzT2Zmc2V0KTtcbiAgICAgICAgICAgIEV4aWZTZWN0aW9uUGFyc2VyLnJlYWRJRkRTZWN0aW9uKHRpZmZNYXJrZXIsIGdwc1N0cmVhbSwgaXRlcmF0b3IuYmluZChudWxsLCBFeGlmU2VjdGlvbnMuR1BTSUZEKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN1YklmZE9mZnNldCkge1xuICAgICAgICAgICAgdmFyIHN1YklmZFN0cmVhbSA9IHRpZmZNYXJrZXIub3BlbldpdGhPZmZzZXQoc3ViSWZkT2Zmc2V0KSwgSW50ZXJvcElGRF8xID0gRXhpZlNlY3Rpb25zLkludGVyb3BJRkQ7XG4gICAgICAgICAgICBFeGlmU2VjdGlvblBhcnNlci5yZWFkSUZEU2VjdGlvbih0aWZmTWFya2VyLCBzdWJJZmRTdHJlYW0sIGZ1bmN0aW9uICh0YWdUeXBlLCB2YWx1ZSwgZm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhZ1R5cGUgPT09IDB4QTAwNSkge1xuICAgICAgICAgICAgICAgICAgICBpbnRlcm9wT2Zmc2V0ID0gdmFsdWVbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpdGVyYXRvcihJbnRlcm9wSUZEXzEsIHRhZ1R5cGUsIHZhbHVlLCBmb3JtYXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbnRlcm9wT2Zmc2V0KSB7XG4gICAgICAgICAgICB2YXIgaW50ZXJvcFN0cmVhbSA9IHRpZmZNYXJrZXIub3BlbldpdGhPZmZzZXQoaW50ZXJvcE9mZnNldCk7XG4gICAgICAgICAgICBFeGlmU2VjdGlvblBhcnNlci5yZWFkSUZEU2VjdGlvbih0aWZmTWFya2VyLCBpbnRlcm9wU3RyZWFtLCBpdGVyYXRvci5iaW5kKG51bGwsIEV4aWZTZWN0aW9ucy5JbnRlcm9wSUZEKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBFeGlmU2VjdGlvblBhcnNlci5yZWFkRXhpZlZhbHVlID0gZnVuY3Rpb24gKGZvcm1hdCwgc3RyZWFtKSB7XG4gICAgICAgIHN3aXRjaCAoZm9ybWF0KSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0cmVhbS5uZXh0VUludDgoKTtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyZWFtLm5leHRVSW50MTYoKTtcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyZWFtLm5leHRVSW50MzIoKTtcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gW3N0cmVhbS5uZXh0VUludDMyKCksIHN0cmVhbS5uZXh0VUludDMyKCldO1xuICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgIHJldHVybiBzdHJlYW0ubmV4dEludDgoKTtcbiAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyZWFtLm5leHRVSW50MTYoKTtcbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyZWFtLm5leHRVSW50MzIoKTtcbiAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtzdHJlYW0ubmV4dEludDMyKCksIHN0cmVhbS5uZXh0SW50MzIoKV07XG4gICAgICAgICAgICBjYXNlIDExOlxuICAgICAgICAgICAgICAgIHJldHVybiBzdHJlYW0ubmV4dEZsb2F0KCk7XG4gICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICAgIHJldHVybiBzdHJlYW0ubmV4dERvdWJsZSgpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZm9ybWF0IHdoaWxlIGRlY29kaW5nOiAnICsgZm9ybWF0KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRXhpZlNlY3Rpb25QYXJzZXIuZ2V0Qnl0ZXNQZXJDb21wb25lbnQgPSBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgICAgIHN3aXRjaCAoZm9ybWF0KSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICBjYXNlIDExOlxuICAgICAgICAgICAgICAgIHJldHVybiA0O1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDg7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBFeGlmU2VjdGlvblBhcnNlci5yZWFkRXhpZlRhZyA9IGZ1bmN0aW9uICh0aWZmTWFya2VyLCBzdHJlYW0pIHtcbiAgICAgICAgdmFyIHRhZ1R5cGUgPSBzdHJlYW0ubmV4dFVJbnQxNigpLCBmb3JtYXQgPSBzdHJlYW0ubmV4dFVJbnQxNigpLCBieXRlc1BlckNvbXBvbmVudCA9IEV4aWZTZWN0aW9uUGFyc2VyLmdldEJ5dGVzUGVyQ29tcG9uZW50KGZvcm1hdCksIGNvbXBvbmVudHMgPSBzdHJlYW0ubmV4dFVJbnQzMigpLCB2YWx1ZUJ5dGVzID0gYnl0ZXNQZXJDb21wb25lbnQgKiBjb21wb25lbnRzLCB2YWx1ZXMsIHZhbHVlLCBjO1xuICAgICAgICAvKiBpZiB0aGUgdmFsdWUgaXMgYmlnZ2VyIHRoZW4gNCBieXRlcywgdGhlIHZhbHVlIGlzIGluIHRoZSBkYXRhIHNlY3Rpb24gb2YgdGhlIElGRFxuICAgICAgICBhbmQgdGhlIHZhbHVlIHByZXNlbnQgaW4gdGhlIHRhZyBpcyB0aGUgb2Zmc2V0IHN0YXJ0aW5nIGZyb20gdGhlIHRpZmYgaGVhZGVyLiBTbyB3ZSByZXBsYWNlIHRoZSBzdHJlYW1cbiAgICAgICAgd2l0aCBhIHN0cmVhbSB0aGF0IGlzIGxvY2F0ZWQgYXQgdGhlIGdpdmVuIG9mZnNldCBpbiB0aGUgZGF0YSBzZWN0aW9uLiBzKi9cbiAgICAgICAgaWYgKHZhbHVlQnl0ZXMgPiA0KSB7XG4gICAgICAgICAgICBzdHJlYW0gPSB0aWZmTWFya2VyLm9wZW5XaXRoT2Zmc2V0KHN0cmVhbS5uZXh0VUludDMyKCkpO1xuICAgICAgICB9XG4gICAgICAgIC8vd2UgZG9uJ3Qgd2FudCB0byByZWFkIHN0cmluZ3MgYXMgYXJyYXlzXG4gICAgICAgIGlmIChmb3JtYXQgPT09IDIpIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IHN0cmVhbS5uZXh0U3RyaW5nKGNvbXBvbmVudHMpO1xuICAgICAgICAgICAgLy9jdXQgb2ZmIFxcMCBjaGFyYWN0ZXJzXG4gICAgICAgICAgICB2YXIgbGFzdE51bGwgPSB2YWx1ZXMuaW5kZXhPZignXFwwJyk7XG4gICAgICAgICAgICBpZiAobGFzdE51bGwgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzLnN1YnN0cigwLCBsYXN0TnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZm9ybWF0ID09PSA3KSB7XG4gICAgICAgICAgICB2YWx1ZXMgPSBzdHJlYW0ubmV4dEJ1ZmZlcihjb21wb25lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmb3JtYXQgIT09IDApIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChjID0gMDsgYyA8IGNvbXBvbmVudHM7ICsrYykge1xuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKEV4aWZTZWN0aW9uUGFyc2VyLnJlYWRFeGlmVmFsdWUoZm9ybWF0LCBzdHJlYW0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL3NpbmNlIG91ciBzdHJlYW0gaXMgYSBzdGF0ZWZ1bCBvYmplY3QsIHdlIG5lZWQgdG8gc2tpcCByZW1haW5pbmcgYnl0ZXNcbiAgICAgICAgLy9zbyBvdXIgb2Zmc2V0IHN0YXlzIGNvcnJlY3RcbiAgICAgICAgaWYgKHZhbHVlQnl0ZXMgPCA0KSB7XG4gICAgICAgICAgICBzdHJlYW0uc2tpcCg0IC0gdmFsdWVCeXRlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFt0YWdUeXBlLCB2YWx1ZXMsIGZvcm1hdF07XG4gICAgfTtcbiAgICBFeGlmU2VjdGlvblBhcnNlci5yZWFkSUZEU2VjdGlvbiA9IGZ1bmN0aW9uICh0aWZmTWFya2VyLCBzdHJlYW0sIGl0ZXJhdG9yKSB7XG4gICAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBjYW4gcmVhZCBuZXh0VWludDE2IGJ5dGVcbiAgICAgICAgaWYgKHN0cmVhbS5yZW1haW5pbmdMZW5ndGgoKSA8IDIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbnVtYmVyT2ZFbnRyaWVzID0gc3RyZWFtLm5leHRVSW50MTYoKSwgdGFnLCBpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbnVtYmVyT2ZFbnRyaWVzOyArK2kpIHtcbiAgICAgICAgICAgIHRhZyA9IEV4aWZTZWN0aW9uUGFyc2VyLnJlYWRFeGlmVGFnKHRpZmZNYXJrZXIsIHN0cmVhbSk7XG4gICAgICAgICAgICBpdGVyYXRvcih0YWdbMF0sIHRhZ1sxXSwgdGFnWzJdKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRXhpZlNlY3Rpb25QYXJzZXIucmVhZEhlYWRlciA9IGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgICAgICAgdmFyIGV4aWZIZWFkZXIgPSBzdHJlYW0ubmV4dFN0cmluZyg2KTtcbiAgICAgICAgaWYgKGV4aWZIZWFkZXIgIT09ICdFeGlmXFwwXFwwJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIEVYSUYgaGVhZGVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRpZmZNYXJrZXIgPSBzdHJlYW0ubWFyaygpO1xuICAgICAgICB2YXIgdGlmZkhlYWRlciA9IHN0cmVhbS5uZXh0VUludDE2KCk7XG4gICAgICAgIGlmICh0aWZmSGVhZGVyID09PSAweDQ5NDkpIHtcbiAgICAgICAgICAgIHN0cmVhbS5zZXRCaWdFbmRpYW4oZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRpZmZIZWFkZXIgPT09IDB4NEQ0RCkge1xuICAgICAgICAgICAgc3RyZWFtLnNldEJpZ0VuZGlhbih0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBUSUZGIGhlYWRlcicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdHJlYW0ubmV4dFVJbnQxNigpICE9PSAweDAwMkEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBUSUZGIGRhdGEnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGlmZk1hcmtlcjtcbiAgICB9O1xuICAgIHJldHVybiBFeGlmU2VjdGlvblBhcnNlcjtcbn0oKSk7XG5leHBvcnRzLkV4aWZTZWN0aW9uUGFyc2VyID0gRXhpZlNlY3Rpb25QYXJzZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FeGlmU2VjdGlvblBhcnNlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8qanNsaW50IGJyb3dzZXI6IHRydWUsIGRldmVsOiB0cnVlLCBiaXR3aXNlOiBmYWxzZSwgZGVidWc6IHRydWUsIGVxZXE6IGZhbHNlLCBlczU6IHRydWUsIGV2aWw6IGZhbHNlLCBmb3JpbjogZmFsc2UsIG5ld2NhcDogZmFsc2UsIG5vbWVuOiB0cnVlLCBwbHVzcGx1czogdHJ1ZSwgcmVnZXhwOiBmYWxzZSwgdW5wYXJhbTogZmFsc2UsIHNsb3BweTogdHJ1ZSwgc3R1cGlkOiBmYWxzZSwgc3ViOiBmYWxzZSwgdG9kbzogdHJ1ZSwgdmFyczogdHJ1ZSwgd2hpdGU6IHRydWUgKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuSnBlZ1BhcnNlciA9IHZvaWQgMDtcbnZhciBKcGVnUGFyc2VyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEpwZWdQYXJzZXIoKSB7XG4gICAgfVxuICAgIEpwZWdQYXJzZXIucGFyc2VTZWN0aW9ucyA9IGZ1bmN0aW9uIChzdHJlYW0sIGl0ZXJhdG9yKSB7XG4gICAgICAgIHZhciBsZW4sIG1hcmtlclR5cGU7XG4gICAgICAgIHN0cmVhbS5zZXRCaWdFbmRpYW4odHJ1ZSk7XG4gICAgICAgIC8vc3RvcCByZWFkaW5nIHRoZSBzdHJlYW0gYXQgdGhlIFNPUyAoU3RhcnQgb2YgU3RyZWFtKSBtYXJrZXIsXG4gICAgICAgIC8vYmVjYXVzZSBpdHMgbGVuZ3RoIGlzIG5vdCBzdG9yZWQgaW4gdGhlIGhlYWRlciBzbyB3ZSBjYW4ndFxuICAgICAgICAvL2tub3cgd2hlcmUgdG8ganVtcCB0by4gVGhlIG9ubHkgbWFya2VyIGFmdGVyIHRoYXQgaXMganVzdCBFT0kgKEVuZCBPZiBJbWFnZSkgYW55d2F5XG4gICAgICAgIHdoaWxlIChzdHJlYW0ucmVtYWluaW5nTGVuZ3RoKCkgPiAwICYmIG1hcmtlclR5cGUgIT09IDB4REEpIHtcbiAgICAgICAgICAgIGlmIChzdHJlYW0ubmV4dFVJbnQ4KCkgIT09IDB4RkYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYXJrZXJUeXBlID0gc3RyZWFtLm5leHRVSW50OCgpO1xuICAgICAgICAgICAgLy9kb24ndCByZWFkIHNpemUgZnJvbSBtYXJrZXJzIHRoYXQgaGF2ZSBubyBkYXRhc1xuICAgICAgICAgICAgaWYgKChtYXJrZXJUeXBlID49IDB4RDAgJiYgbWFya2VyVHlwZSA8PSAweEQ5KSB8fCBtYXJrZXJUeXBlID09PSAweERBKSB7XG4gICAgICAgICAgICAgICAgbGVuID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxlbiA9IHN0cmVhbS5uZXh0VUludDE2KCkgLSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXRlcmF0b3IobWFya2VyVHlwZSwgc3RyZWFtLmJyYW5jaCgwLCBsZW4pKTtcbiAgICAgICAgICAgIHN0cmVhbS5za2lwKGxlbik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vc3RyZWFtIHNob3VsZCBiZSBsb2NhdGVkIGFmdGVyIFNPRiBzZWN0aW9uIHNpemUgYW5kIGluIGJpZyBlbmRpYW4gbW9kZSwgbGlrZSBwYXNzZWQgdG8gcGFyc2VTZWN0aW9ucyBpdGVyYXRvclxuICAgIEpwZWdQYXJzZXIuZ2V0U2l6ZUZyb21TT0ZTZWN0aW9uID0gZnVuY3Rpb24gKHN0cmVhbSkge1xuICAgICAgICBzdHJlYW0uc2tpcCgxKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhlaWdodDogc3RyZWFtLm5leHRVSW50MTYoKSxcbiAgICAgICAgICAgIHdpZHRoOiBzdHJlYW0ubmV4dFVJbnQxNigpXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBKcGVnUGFyc2VyLmdldFNlY3Rpb25OYW1lID0gZnVuY3Rpb24gKG1hcmtlclR5cGUpIHtcbiAgICAgICAgdmFyIG5hbWUsIGluZGV4O1xuICAgICAgICBzd2l0Y2ggKG1hcmtlclR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgMHhEODpcbiAgICAgICAgICAgICAgICBuYW1lID0gJ1NPSSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDB4QzQ6XG4gICAgICAgICAgICAgICAgbmFtZSA9ICdESFQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAweERCOlxuICAgICAgICAgICAgICAgIG5hbWUgPSAnRFFUJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMHhERDpcbiAgICAgICAgICAgICAgICBuYW1lID0gJ0RSSSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDB4REE6XG4gICAgICAgICAgICAgICAgbmFtZSA9ICdTT1MnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAweEZFOlxuICAgICAgICAgICAgICAgIG5hbWUgPSAnQ09NJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMHhEOTpcbiAgICAgICAgICAgICAgICBuYW1lID0gJ0VPSSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmIChtYXJrZXJUeXBlID49IDB4RTAgJiYgbWFya2VyVHlwZSA8PSAweEVGKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSAnQVBQJztcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBtYXJrZXJUeXBlIC0gMHhFMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobWFya2VyVHlwZSA+PSAweEMwICYmIG1hcmtlclR5cGUgPD0gMHhDRiAmJiBtYXJrZXJUeXBlICE9PSAweEM0ICYmIG1hcmtlclR5cGUgIT09IDB4QzggJiYgbWFya2VyVHlwZSAhPT0gMHhDQykge1xuICAgICAgICAgICAgICAgICAgICBuYW1lID0gJ1NPRic7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gbWFya2VyVHlwZSAtIDB4QzA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1hcmtlclR5cGUgPj0gMHhEMCAmJiBtYXJrZXJUeXBlIDw9IDB4RDcpIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9ICdSU1QnO1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IG1hcmtlclR5cGUgLSAweEQwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmFtZVN0cnVjdCA9IHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWVcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIG5hbWVTdHJ1Y3QuaW5kZXggPSBpbmRleDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmFtZVN0cnVjdDtcbiAgICB9O1xuICAgIHJldHVybiBKcGVnUGFyc2VyO1xufSgpKTtcbmV4cG9ydHMuSnBlZ1BhcnNlciA9IEpwZWdQYXJzZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1KcGVnUGFyc2VyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5UYWdzID0gdm9pZCAwO1xudmFyIFRhZ3M7XG4oZnVuY3Rpb24gKFRhZ3MpIHtcbiAgICBUYWdzLkV4aWYgPSB7XG4gICAgICAgIDB4MDAwMTogXCJJbnRlcm9wSW5kZXhcIixcbiAgICAgICAgMHgwMDAyOiBcIkludGVyb3BWZXJzaW9uXCIsXG4gICAgICAgIDB4MDAwQjogXCJQcm9jZXNzaW5nU29mdHdhcmVcIixcbiAgICAgICAgMHgwMEZFOiBcIlN1YmZpbGVUeXBlXCIsXG4gICAgICAgIDB4MDBGRjogXCJPbGRTdWJmaWxlVHlwZVwiLFxuICAgICAgICAweDAxMDA6IFwiSW1hZ2VXaWR0aFwiLFxuICAgICAgICAweDAxMDE6IFwiSW1hZ2VIZWlnaHRcIixcbiAgICAgICAgMHgwMTAyOiBcIkJpdHNQZXJTYW1wbGVcIixcbiAgICAgICAgMHgwMTAzOiBcIkNvbXByZXNzaW9uXCIsXG4gICAgICAgIDB4MDEwNjogXCJQaG90b21ldHJpY0ludGVycHJldGF0aW9uXCIsXG4gICAgICAgIDB4MDEwNzogXCJUaHJlc2hvbGRpbmdcIixcbiAgICAgICAgMHgwMTA4OiBcIkNlbGxXaWR0aFwiLFxuICAgICAgICAweDAxMDk6IFwiQ2VsbExlbmd0aFwiLFxuICAgICAgICAweDAxMEE6IFwiRmlsbE9yZGVyXCIsXG4gICAgICAgIDB4MDEwRDogXCJEb2N1bWVudE5hbWVcIixcbiAgICAgICAgMHgwMTBFOiBcIkltYWdlRGVzY3JpcHRpb25cIixcbiAgICAgICAgMHgwMTBGOiBcIk1ha2VcIixcbiAgICAgICAgMHgwMTEwOiBcIk1vZGVsXCIsXG4gICAgICAgIDB4MDExMTogXCJTdHJpcE9mZnNldHNcIixcbiAgICAgICAgMHgwMTEyOiBcIk9yaWVudGF0aW9uXCIsXG4gICAgICAgIDB4MDExNTogXCJTYW1wbGVzUGVyUGl4ZWxcIixcbiAgICAgICAgMHgwMTE2OiBcIlJvd3NQZXJTdHJpcFwiLFxuICAgICAgICAweDAxMTc6IFwiU3RyaXBCeXRlQ291bnRzXCIsXG4gICAgICAgIDB4MDExODogXCJNaW5TYW1wbGVWYWx1ZVwiLFxuICAgICAgICAweDAxMTk6IFwiTWF4U2FtcGxlVmFsdWVcIixcbiAgICAgICAgMHgwMTFBOiBcIlhSZXNvbHV0aW9uXCIsXG4gICAgICAgIDB4MDExQjogXCJZUmVzb2x1dGlvblwiLFxuICAgICAgICAweDAxMUM6IFwiUGxhbmFyQ29uZmlndXJhdGlvblwiLFxuICAgICAgICAweDAxMUQ6IFwiUGFnZU5hbWVcIixcbiAgICAgICAgMHgwMTFFOiBcIlhQb3NpdGlvblwiLFxuICAgICAgICAweDAxMUY6IFwiWVBvc2l0aW9uXCIsXG4gICAgICAgIDB4MDEyMDogXCJGcmVlT2Zmc2V0c1wiLFxuICAgICAgICAweDAxMjE6IFwiRnJlZUJ5dGVDb3VudHNcIixcbiAgICAgICAgMHgwMTIyOiBcIkdyYXlSZXNwb25zZVVuaXRcIixcbiAgICAgICAgMHgwMTIzOiBcIkdyYXlSZXNwb25zZUN1cnZlXCIsXG4gICAgICAgIDB4MDEyNDogXCJUNE9wdGlvbnNcIixcbiAgICAgICAgMHgwMTI1OiBcIlQ2T3B0aW9uc1wiLFxuICAgICAgICAweDAxMjg6IFwiUmVzb2x1dGlvblVuaXRcIixcbiAgICAgICAgMHgwMTI5OiBcIlBhZ2VOdW1iZXJcIixcbiAgICAgICAgMHgwMTJDOiBcIkNvbG9yUmVzcG9uc2VVbml0XCIsXG4gICAgICAgIDB4MDEyRDogXCJUcmFuc2ZlckZ1bmN0aW9uXCIsXG4gICAgICAgIDB4MDEzMTogXCJTb2Z0d2FyZVwiLFxuICAgICAgICAweDAxMzI6IFwiTW9kaWZ5RGF0ZVwiLFxuICAgICAgICAweDAxM0I6IFwiQXJ0aXN0XCIsXG4gICAgICAgIDB4MDEzQzogXCJIb3N0Q29tcHV0ZXJcIixcbiAgICAgICAgMHgwMTNEOiBcIlByZWRpY3RvclwiLFxuICAgICAgICAweDAxM0U6IFwiV2hpdGVQb2ludFwiLFxuICAgICAgICAweDAxM0Y6IFwiUHJpbWFyeUNocm9tYXRpY2l0aWVzXCIsXG4gICAgICAgIDB4MDE0MDogXCJDb2xvck1hcFwiLFxuICAgICAgICAweDAxNDE6IFwiSGFsZnRvbmVIaW50c1wiLFxuICAgICAgICAweDAxNDI6IFwiVGlsZVdpZHRoXCIsXG4gICAgICAgIDB4MDE0MzogXCJUaWxlTGVuZ3RoXCIsXG4gICAgICAgIDB4MDE0NDogXCJUaWxlT2Zmc2V0c1wiLFxuICAgICAgICAweDAxNDU6IFwiVGlsZUJ5dGVDb3VudHNcIixcbiAgICAgICAgMHgwMTQ2OiBcIkJhZEZheExpbmVzXCIsXG4gICAgICAgIDB4MDE0NzogXCJDbGVhbkZheERhdGFcIixcbiAgICAgICAgMHgwMTQ4OiBcIkNvbnNlY3V0aXZlQmFkRmF4TGluZXNcIixcbiAgICAgICAgMHgwMTRBOiBcIlN1YklGRFwiLFxuICAgICAgICAweDAxNEM6IFwiSW5rU2V0XCIsXG4gICAgICAgIDB4MDE0RDogXCJJbmtOYW1lc1wiLFxuICAgICAgICAweDAxNEU6IFwiTnVtYmVyb2ZJbmtzXCIsXG4gICAgICAgIDB4MDE1MDogXCJEb3RSYW5nZVwiLFxuICAgICAgICAweDAxNTE6IFwiVGFyZ2V0UHJpbnRlclwiLFxuICAgICAgICAweDAxNTI6IFwiRXh0cmFTYW1wbGVzXCIsXG4gICAgICAgIDB4MDE1MzogXCJTYW1wbGVGb3JtYXRcIixcbiAgICAgICAgMHgwMTU0OiBcIlNNaW5TYW1wbGVWYWx1ZVwiLFxuICAgICAgICAweDAxNTU6IFwiU01heFNhbXBsZVZhbHVlXCIsXG4gICAgICAgIDB4MDE1NjogXCJUcmFuc2ZlclJhbmdlXCIsXG4gICAgICAgIDB4MDE1NzogXCJDbGlwUGF0aFwiLFxuICAgICAgICAweDAxNTg6IFwiWENsaXBQYXRoVW5pdHNcIixcbiAgICAgICAgMHgwMTU5OiBcIllDbGlwUGF0aFVuaXRzXCIsXG4gICAgICAgIDB4MDE1QTogXCJJbmRleGVkXCIsXG4gICAgICAgIDB4MDE1QjogXCJKUEVHVGFibGVzXCIsXG4gICAgICAgIDB4MDE1RjogXCJPUElQcm94eVwiLFxuICAgICAgICAweDAxOTA6IFwiR2xvYmFsUGFyYW1ldGVyc0lGRFwiLFxuICAgICAgICAweDAxOTE6IFwiUHJvZmlsZVR5cGVcIixcbiAgICAgICAgMHgwMTkyOiBcIkZheFByb2ZpbGVcIixcbiAgICAgICAgMHgwMTkzOiBcIkNvZGluZ01ldGhvZHNcIixcbiAgICAgICAgMHgwMTk0OiBcIlZlcnNpb25ZZWFyXCIsXG4gICAgICAgIDB4MDE5NTogXCJNb2RlTnVtYmVyXCIsXG4gICAgICAgIDB4MDFCMTogXCJEZWNvZGVcIixcbiAgICAgICAgMHgwMUIyOiBcIkRlZmF1bHRJbWFnZUNvbG9yXCIsXG4gICAgICAgIDB4MDFCMzogXCJUODJPcHRpb25zXCIsXG4gICAgICAgIDB4MDFCNTogXCJKUEVHVGFibGVzXCIsXG4gICAgICAgIDB4MDIwMDogXCJKUEVHUHJvY1wiLFxuICAgICAgICAweDAyMDE6IFwiVGh1bWJuYWlsT2Zmc2V0XCIsXG4gICAgICAgIDB4MDIwMjogXCJUaHVtYm5haWxMZW5ndGhcIixcbiAgICAgICAgMHgwMjAzOiBcIkpQRUdSZXN0YXJ0SW50ZXJ2YWxcIixcbiAgICAgICAgMHgwMjA1OiBcIkpQRUdMb3NzbGVzc1ByZWRpY3RvcnNcIixcbiAgICAgICAgMHgwMjA2OiBcIkpQRUdQb2ludFRyYW5zZm9ybXNcIixcbiAgICAgICAgMHgwMjA3OiBcIkpQRUdRVGFibGVzXCIsXG4gICAgICAgIDB4MDIwODogXCJKUEVHRENUYWJsZXNcIixcbiAgICAgICAgMHgwMjA5OiBcIkpQRUdBQ1RhYmxlc1wiLFxuICAgICAgICAweDAyMTE6IFwiWUNiQ3JDb2VmZmljaWVudHNcIixcbiAgICAgICAgMHgwMjEyOiBcIllDYkNyU3ViU2FtcGxpbmdcIixcbiAgICAgICAgMHgwMjEzOiBcIllDYkNyUG9zaXRpb25pbmdcIixcbiAgICAgICAgMHgwMjE0OiBcIlJlZmVyZW5jZUJsYWNrV2hpdGVcIixcbiAgICAgICAgMHgwMjJGOiBcIlN0cmlwUm93Q291bnRzXCIsXG4gICAgICAgIDB4MDJCQzogXCJBcHBsaWNhdGlvbk5vdGVzXCIsXG4gICAgICAgIDB4MDNFNzogXCJVU1BUT01pc2NlbGxhbmVvdXNcIixcbiAgICAgICAgMHgxMDAwOiBcIlJlbGF0ZWRJbWFnZUZpbGVGb3JtYXRcIixcbiAgICAgICAgMHgxMDAxOiBcIlJlbGF0ZWRJbWFnZVdpZHRoXCIsXG4gICAgICAgIDB4MTAwMjogXCJSZWxhdGVkSW1hZ2VIZWlnaHRcIixcbiAgICAgICAgMHg0NzQ2OiBcIlJhdGluZ1wiLFxuICAgICAgICAweDQ3NDc6IFwiWFBfRElQX1hNTFwiLFxuICAgICAgICAweDQ3NDg6IFwiU3RpdGNoSW5mb1wiLFxuICAgICAgICAweDQ3NDk6IFwiUmF0aW5nUGVyY2VudFwiLFxuICAgICAgICAweDgwMEQ6IFwiSW1hZ2VJRFwiLFxuICAgICAgICAweDgwQTM6IFwiV2FuZ1RhZzFcIixcbiAgICAgICAgMHg4MEE0OiBcIldhbmdBbm5vdGF0aW9uXCIsXG4gICAgICAgIDB4ODBBNTogXCJXYW5nVGFnM1wiLFxuICAgICAgICAweDgwQTY6IFwiV2FuZ1RhZzRcIixcbiAgICAgICAgMHg4MEUzOiBcIk1hdHRlaW5nXCIsXG4gICAgICAgIDB4ODBFNDogXCJEYXRhVHlwZVwiLFxuICAgICAgICAweDgwRTU6IFwiSW1hZ2VEZXB0aFwiLFxuICAgICAgICAweDgwRTY6IFwiVGlsZURlcHRoXCIsXG4gICAgICAgIDB4ODI3RDogXCJNb2RlbDJcIixcbiAgICAgICAgMHg4MjhEOiBcIkNGQVJlcGVhdFBhdHRlcm5EaW1cIixcbiAgICAgICAgMHg4MjhFOiBcIkNGQVBhdHRlcm4yXCIsXG4gICAgICAgIDB4ODI4RjogXCJCYXR0ZXJ5TGV2ZWxcIixcbiAgICAgICAgMHg4MjkwOiBcIktvZGFrSUZEXCIsXG4gICAgICAgIDB4ODI5ODogXCJDb3B5cmlnaHRcIixcbiAgICAgICAgMHg4MjlBOiBcIkV4cG9zdXJlVGltZVwiLFxuICAgICAgICAweDgyOUQ6IFwiRk51bWJlclwiLFxuICAgICAgICAweDgyQTU6IFwiTURGaWxlVGFnXCIsXG4gICAgICAgIDB4ODJBNjogXCJNRFNjYWxlUGl4ZWxcIixcbiAgICAgICAgMHg4MkE3OiBcIk1EQ29sb3JUYWJsZVwiLFxuICAgICAgICAweDgyQTg6IFwiTURMYWJOYW1lXCIsXG4gICAgICAgIDB4ODJBOTogXCJNRFNhbXBsZUluZm9cIixcbiAgICAgICAgMHg4MkFBOiBcIk1EUHJlcERhdGVcIixcbiAgICAgICAgMHg4MkFCOiBcIk1EUHJlcFRpbWVcIixcbiAgICAgICAgMHg4MkFDOiBcIk1ERmlsZVVuaXRzXCIsXG4gICAgICAgIDB4ODMwRTogXCJQaXhlbFNjYWxlXCIsXG4gICAgICAgIDB4ODMzNTogXCJBZHZlbnRTY2FsZVwiLFxuICAgICAgICAweDgzMzY6IFwiQWR2ZW50UmV2aXNpb25cIixcbiAgICAgICAgMHg4MzVDOiBcIlVJQzFUYWdcIixcbiAgICAgICAgMHg4MzVEOiBcIlVJQzJUYWdcIixcbiAgICAgICAgMHg4MzVFOiBcIlVJQzNUYWdcIixcbiAgICAgICAgMHg4MzVGOiBcIlVJQzRUYWdcIixcbiAgICAgICAgMHg4M0JCOiBcIklQVEMtTkFBXCIsXG4gICAgICAgIDB4ODQ3RTogXCJJbnRlcmdyYXBoUGFja2V0RGF0YVwiLFxuICAgICAgICAweDg0N0Y6IFwiSW50ZXJncmFwaEZsYWdSZWdpc3RlcnNcIixcbiAgICAgICAgMHg4NDgwOiBcIkludGVyZ3JhcGhNYXRyaXhcIixcbiAgICAgICAgMHg4NDgxOiBcIklOR1JSZXNlcnZlZFwiLFxuICAgICAgICAweDg0ODI6IFwiTW9kZWxUaWVQb2ludFwiLFxuICAgICAgICAweDg0RTA6IFwiU2l0ZVwiLFxuICAgICAgICAweDg0RTE6IFwiQ29sb3JTZXF1ZW5jZVwiLFxuICAgICAgICAweDg0RTI6IFwiSVQ4SGVhZGVyXCIsXG4gICAgICAgIDB4ODRFMzogXCJSYXN0ZXJQYWRkaW5nXCIsXG4gICAgICAgIDB4ODRFNDogXCJCaXRzUGVyUnVuTGVuZ3RoXCIsXG4gICAgICAgIDB4ODRFNTogXCJCaXRzUGVyRXh0ZW5kZWRSdW5MZW5ndGhcIixcbiAgICAgICAgMHg4NEU2OiBcIkNvbG9yVGFibGVcIixcbiAgICAgICAgMHg4NEU3OiBcIkltYWdlQ29sb3JJbmRpY2F0b3JcIixcbiAgICAgICAgMHg4NEU4OiBcIkJhY2tncm91bmRDb2xvckluZGljYXRvclwiLFxuICAgICAgICAweDg0RTk6IFwiSW1hZ2VDb2xvclZhbHVlXCIsXG4gICAgICAgIDB4ODRFQTogXCJCYWNrZ3JvdW5kQ29sb3JWYWx1ZVwiLFxuICAgICAgICAweDg0RUI6IFwiUGl4ZWxJbnRlbnNpdHlSYW5nZVwiLFxuICAgICAgICAweDg0RUM6IFwiVHJhbnNwYXJlbmN5SW5kaWNhdG9yXCIsXG4gICAgICAgIDB4ODRFRDogXCJDb2xvckNoYXJhY3Rlcml6YXRpb25cIixcbiAgICAgICAgMHg4NEVFOiBcIkhDVXNhZ2VcIixcbiAgICAgICAgMHg4NEVGOiBcIlRyYXBJbmRpY2F0b3JcIixcbiAgICAgICAgMHg4NEYwOiBcIkNNWUtFcXVpdmFsZW50XCIsXG4gICAgICAgIDB4ODU0NjogXCJTRU1JbmZvXCIsXG4gICAgICAgIDB4ODU2ODogXCJBRkNQX0lQVENcIixcbiAgICAgICAgMHg4NUI4OiBcIlBpeGVsTWFnaWNKQklHT3B0aW9uc1wiLFxuICAgICAgICAweDg1RDg6IFwiTW9kZWxUcmFuc2Zvcm1cIixcbiAgICAgICAgMHg4NjAyOiBcIldCX0dSR0JMZXZlbHNcIixcbiAgICAgICAgMHg4NjA2OiBcIkxlYWZEYXRhXCIsXG4gICAgICAgIDB4ODY0OTogXCJQaG90b3Nob3BTZXR0aW5nc1wiLFxuICAgICAgICAweDg3Njk6IFwiRXhpZk9mZnNldFwiLFxuICAgICAgICAweDg3NzM6IFwiSUNDX1Byb2ZpbGVcIixcbiAgICAgICAgMHg4NzdGOiBcIlRJRkZfRlhFeHRlbnNpb25zXCIsXG4gICAgICAgIDB4ODc4MDogXCJNdWx0aVByb2ZpbGVzXCIsXG4gICAgICAgIDB4ODc4MTogXCJTaGFyZWREYXRhXCIsXG4gICAgICAgIDB4ODc4MjogXCJUODhPcHRpb25zXCIsXG4gICAgICAgIDB4ODdBQzogXCJJbWFnZUxheWVyXCIsXG4gICAgICAgIDB4ODdBRjogXCJHZW9UaWZmRGlyZWN0b3J5XCIsXG4gICAgICAgIDB4ODdCMDogXCJHZW9UaWZmRG91YmxlUGFyYW1zXCIsXG4gICAgICAgIDB4ODdCMTogXCJHZW9UaWZmQXNjaWlQYXJhbXNcIixcbiAgICAgICAgMHg4ODIyOiBcIkV4cG9zdXJlUHJvZ3JhbVwiLFxuICAgICAgICAweDg4MjQ6IFwiU3BlY3RyYWxTZW5zaXRpdml0eVwiLFxuICAgICAgICAweDg4MjU6IFwiR1BTSW5mb1wiLFxuICAgICAgICAweDg4Mjc6IFwiSVNPXCIsXG4gICAgICAgIDB4ODgyODogXCJPcHRvLUVsZWN0cmljQ29udkZhY3RvclwiLFxuICAgICAgICAweDg4Mjk6IFwiSW50ZXJsYWNlXCIsXG4gICAgICAgIDB4ODgyQTogXCJUaW1lWm9uZU9mZnNldFwiLFxuICAgICAgICAweDg4MkI6IFwiU2VsZlRpbWVyTW9kZVwiLFxuICAgICAgICAweDg4MzA6IFwiU2Vuc2l0aXZpdHlUeXBlXCIsXG4gICAgICAgIDB4ODgzMTogXCJTdGFuZGFyZE91dHB1dFNlbnNpdGl2aXR5XCIsXG4gICAgICAgIDB4ODgzMjogXCJSZWNvbW1lbmRlZEV4cG9zdXJlSW5kZXhcIixcbiAgICAgICAgMHg4ODMzOiBcIklTT1NwZWVkXCIsXG4gICAgICAgIDB4ODgzNDogXCJJU09TcGVlZExhdGl0dWRleXl5XCIsXG4gICAgICAgIDB4ODgzNTogXCJJU09TcGVlZExhdGl0dWRlenp6XCIsXG4gICAgICAgIDB4ODg1QzogXCJGYXhSZWN2UGFyYW1zXCIsXG4gICAgICAgIDB4ODg1RDogXCJGYXhTdWJBZGRyZXNzXCIsXG4gICAgICAgIDB4ODg1RTogXCJGYXhSZWN2VGltZVwiLFxuICAgICAgICAweDg4OEE6IFwiTGVhZlN1YklGRFwiLFxuICAgICAgICAweDkwMDA6IFwiRXhpZlZlcnNpb25cIixcbiAgICAgICAgMHg5MDAzOiBcIkRhdGVUaW1lT3JpZ2luYWxcIixcbiAgICAgICAgMHg5MDA0OiBcIkNyZWF0ZURhdGVcIixcbiAgICAgICAgMHg5MTAxOiBcIkNvbXBvbmVudHNDb25maWd1cmF0aW9uXCIsXG4gICAgICAgIDB4OTEwMjogXCJDb21wcmVzc2VkQml0c1BlclBpeGVsXCIsXG4gICAgICAgIDB4OTIwMTogXCJTaHV0dGVyU3BlZWRWYWx1ZVwiLFxuICAgICAgICAweDkyMDI6IFwiQXBlcnR1cmVWYWx1ZVwiLFxuICAgICAgICAweDkyMDM6IFwiQnJpZ2h0bmVzc1ZhbHVlXCIsXG4gICAgICAgIDB4OTIwNDogXCJFeHBvc3VyZUNvbXBlbnNhdGlvblwiLFxuICAgICAgICAweDkyMDU6IFwiTWF4QXBlcnR1cmVWYWx1ZVwiLFxuICAgICAgICAweDkyMDY6IFwiU3ViamVjdERpc3RhbmNlXCIsXG4gICAgICAgIDB4OTIwNzogXCJNZXRlcmluZ01vZGVcIixcbiAgICAgICAgMHg5MjA4OiBcIkxpZ2h0U291cmNlXCIsXG4gICAgICAgIDB4OTIwOTogXCJGbGFzaFwiLFxuICAgICAgICAweDkyMEE6IFwiRm9jYWxMZW5ndGhcIixcbiAgICAgICAgMHg5MjBCOiBcIkZsYXNoRW5lcmd5XCIsXG4gICAgICAgIDB4OTIwQzogXCJTcGF0aWFsRnJlcXVlbmN5UmVzcG9uc2VcIixcbiAgICAgICAgMHg5MjBEOiBcIk5vaXNlXCIsXG4gICAgICAgIDB4OTIwRTogXCJGb2NhbFBsYW5lWFJlc29sdXRpb25cIixcbiAgICAgICAgMHg5MjBGOiBcIkZvY2FsUGxhbmVZUmVzb2x1dGlvblwiLFxuICAgICAgICAweDkyMTA6IFwiRm9jYWxQbGFuZVJlc29sdXRpb25Vbml0XCIsXG4gICAgICAgIDB4OTIxMTogXCJJbWFnZU51bWJlclwiLFxuICAgICAgICAweDkyMTI6IFwiU2VjdXJpdHlDbGFzc2lmaWNhdGlvblwiLFxuICAgICAgICAweDkyMTM6IFwiSW1hZ2VIaXN0b3J5XCIsXG4gICAgICAgIDB4OTIxNDogXCJTdWJqZWN0QXJlYVwiLFxuICAgICAgICAweDkyMTU6IFwiRXhwb3N1cmVJbmRleFwiLFxuICAgICAgICAweDkyMTY6IFwiVElGRi1FUFN0YW5kYXJkSURcIixcbiAgICAgICAgMHg5MjE3OiBcIlNlbnNpbmdNZXRob2RcIixcbiAgICAgICAgMHg5MjNBOiBcIkNJUDNEYXRhRmlsZVwiLFxuICAgICAgICAweDkyM0I6IFwiQ0lQM1NoZWV0XCIsXG4gICAgICAgIDB4OTIzQzogXCJDSVAzU2lkZVwiLFxuICAgICAgICAweDkyM0Y6IFwiU3RvTml0c1wiLFxuICAgICAgICAweDkyN0M6IFwiTWFrZXJOb3RlXCIsXG4gICAgICAgIDB4OTI4NjogXCJVc2VyQ29tbWVudFwiLFxuICAgICAgICAweDkyOTA6IFwiU3ViU2VjVGltZVwiLFxuICAgICAgICAweDkyOTE6IFwiU3ViU2VjVGltZU9yaWdpbmFsXCIsXG4gICAgICAgIDB4OTI5MjogXCJTdWJTZWNUaW1lRGlnaXRpemVkXCIsXG4gICAgICAgIDB4OTMyRjogXCJNU0RvY3VtZW50VGV4dFwiLFxuICAgICAgICAweDkzMzA6IFwiTVNQcm9wZXJ0eVNldFN0b3JhZ2VcIixcbiAgICAgICAgMHg5MzMxOiBcIk1TRG9jdW1lbnRUZXh0UG9zaXRpb25cIixcbiAgICAgICAgMHg5MzVDOiBcIkltYWdlU291cmNlRGF0YVwiLFxuICAgICAgICAweDlDOUI6IFwiWFBUaXRsZVwiLFxuICAgICAgICAweDlDOUM6IFwiWFBDb21tZW50XCIsXG4gICAgICAgIDB4OUM5RDogXCJYUEF1dGhvclwiLFxuICAgICAgICAweDlDOUU6IFwiWFBLZXl3b3Jkc1wiLFxuICAgICAgICAweDlDOUY6IFwiWFBTdWJqZWN0XCIsXG4gICAgICAgIDB4QTAwMDogXCJGbGFzaHBpeFZlcnNpb25cIixcbiAgICAgICAgMHhBMDAxOiBcIkNvbG9yU3BhY2VcIixcbiAgICAgICAgMHhBMDAyOiBcIkV4aWZJbWFnZVdpZHRoXCIsXG4gICAgICAgIDB4QTAwMzogXCJFeGlmSW1hZ2VIZWlnaHRcIixcbiAgICAgICAgMHhBMDA0OiBcIlJlbGF0ZWRTb3VuZEZpbGVcIixcbiAgICAgICAgMHhBMDA1OiBcIkludGVyb3BPZmZzZXRcIixcbiAgICAgICAgMHhBMjBCOiBcIkZsYXNoRW5lcmd5XCIsXG4gICAgICAgIDB4QTIwQzogXCJTcGF0aWFsRnJlcXVlbmN5UmVzcG9uc2VcIixcbiAgICAgICAgMHhBMjBEOiBcIk5vaXNlXCIsXG4gICAgICAgIDB4QTIwRTogXCJGb2NhbFBsYW5lWFJlc29sdXRpb25cIixcbiAgICAgICAgMHhBMjBGOiBcIkZvY2FsUGxhbmVZUmVzb2x1dGlvblwiLFxuICAgICAgICAweEEyMTA6IFwiRm9jYWxQbGFuZVJlc29sdXRpb25Vbml0XCIsXG4gICAgICAgIDB4QTIxMTogXCJJbWFnZU51bWJlclwiLFxuICAgICAgICAweEEyMTI6IFwiU2VjdXJpdHlDbGFzc2lmaWNhdGlvblwiLFxuICAgICAgICAweEEyMTM6IFwiSW1hZ2VIaXN0b3J5XCIsXG4gICAgICAgIDB4QTIxNDogXCJTdWJqZWN0TG9jYXRpb25cIixcbiAgICAgICAgMHhBMjE1OiBcIkV4cG9zdXJlSW5kZXhcIixcbiAgICAgICAgMHhBMjE2OiBcIlRJRkYtRVBTdGFuZGFyZElEXCIsXG4gICAgICAgIDB4QTIxNzogXCJTZW5zaW5nTWV0aG9kXCIsXG4gICAgICAgIDB4QTMwMDogXCJGaWxlU291cmNlXCIsXG4gICAgICAgIDB4QTMwMTogXCJTY2VuZVR5cGVcIixcbiAgICAgICAgMHhBMzAyOiBcIkNGQVBhdHRlcm5cIixcbiAgICAgICAgMHhBNDAxOiBcIkN1c3RvbVJlbmRlcmVkXCIsXG4gICAgICAgIDB4QTQwMjogXCJFeHBvc3VyZU1vZGVcIixcbiAgICAgICAgMHhBNDAzOiBcIldoaXRlQmFsYW5jZVwiLFxuICAgICAgICAweEE0MDQ6IFwiRGlnaXRhbFpvb21SYXRpb1wiLFxuICAgICAgICAweEE0MDU6IFwiRm9jYWxMZW5ndGhJbjM1bW1Gb3JtYXRcIixcbiAgICAgICAgMHhBNDA2OiBcIlNjZW5lQ2FwdHVyZVR5cGVcIixcbiAgICAgICAgMHhBNDA3OiBcIkdhaW5Db250cm9sXCIsXG4gICAgICAgIDB4QTQwODogXCJDb250cmFzdFwiLFxuICAgICAgICAweEE0MDk6IFwiU2F0dXJhdGlvblwiLFxuICAgICAgICAweEE0MEE6IFwiU2hhcnBuZXNzXCIsXG4gICAgICAgIDB4QTQwQjogXCJEZXZpY2VTZXR0aW5nRGVzY3JpcHRpb25cIixcbiAgICAgICAgMHhBNDBDOiBcIlN1YmplY3REaXN0YW5jZVJhbmdlXCIsXG4gICAgICAgIDB4QTQyMDogXCJJbWFnZVVuaXF1ZUlEXCIsXG4gICAgICAgIDB4QTQzMDogXCJPd25lck5hbWVcIixcbiAgICAgICAgMHhBNDMxOiBcIlNlcmlhbE51bWJlclwiLFxuICAgICAgICAweEE0MzI6IFwiTGVuc0luZm9cIixcbiAgICAgICAgMHhBNDMzOiBcIkxlbnNNYWtlXCIsXG4gICAgICAgIDB4QTQzNDogXCJMZW5zTW9kZWxcIixcbiAgICAgICAgMHhBNDM1OiBcIkxlbnNTZXJpYWxOdW1iZXJcIixcbiAgICAgICAgMHhBNDgwOiBcIkdEQUxNZXRhZGF0YVwiLFxuICAgICAgICAweEE0ODE6IFwiR0RBTE5vRGF0YVwiLFxuICAgICAgICAweEE1MDA6IFwiR2FtbWFcIixcbiAgICAgICAgMHhBRkMwOiBcIkV4cGFuZFNvZnR3YXJlXCIsXG4gICAgICAgIDB4QUZDMTogXCJFeHBhbmRMZW5zXCIsXG4gICAgICAgIDB4QUZDMjogXCJFeHBhbmRGaWxtXCIsXG4gICAgICAgIDB4QUZDMzogXCJFeHBhbmRGaWx0ZXJMZW5zXCIsXG4gICAgICAgIDB4QUZDNDogXCJFeHBhbmRTY2FubmVyXCIsXG4gICAgICAgIDB4QUZDNTogXCJFeHBhbmRGbGFzaExhbXBcIixcbiAgICAgICAgMHhCQzAxOiBcIlBpeGVsRm9ybWF0XCIsXG4gICAgICAgIDB4QkMwMjogXCJUcmFuc2Zvcm1hdGlvblwiLFxuICAgICAgICAweEJDMDM6IFwiVW5jb21wcmVzc2VkXCIsXG4gICAgICAgIDB4QkMwNDogXCJJbWFnZVR5cGVcIixcbiAgICAgICAgMHhCQzgwOiBcIkltYWdlV2lkdGhcIixcbiAgICAgICAgMHhCQzgxOiBcIkltYWdlSGVpZ2h0XCIsXG4gICAgICAgIDB4QkM4MjogXCJXaWR0aFJlc29sdXRpb25cIixcbiAgICAgICAgMHhCQzgzOiBcIkhlaWdodFJlc29sdXRpb25cIixcbiAgICAgICAgMHhCQ0MwOiBcIkltYWdlT2Zmc2V0XCIsXG4gICAgICAgIDB4QkNDMTogXCJJbWFnZUJ5dGVDb3VudFwiLFxuICAgICAgICAweEJDQzI6IFwiQWxwaGFPZmZzZXRcIixcbiAgICAgICAgMHhCQ0MzOiBcIkFscGhhQnl0ZUNvdW50XCIsXG4gICAgICAgIDB4QkNDNDogXCJJbWFnZURhdGFEaXNjYXJkXCIsXG4gICAgICAgIDB4QkNDNTogXCJBbHBoYURhdGFEaXNjYXJkXCIsXG4gICAgICAgIDB4QzQyNzogXCJPY2VTY2Fuam9iRGVzY1wiLFxuICAgICAgICAweEM0Mjg6IFwiT2NlQXBwbGljYXRpb25TZWxlY3RvclwiLFxuICAgICAgICAweEM0Mjk6IFwiT2NlSUROdW1iZXJcIixcbiAgICAgICAgMHhDNDJBOiBcIk9jZUltYWdlTG9naWNcIixcbiAgICAgICAgMHhDNDRGOiBcIkFubm90YXRpb25zXCIsXG4gICAgICAgIDB4QzRBNTogXCJQcmludElNXCIsXG4gICAgICAgIDB4QzU4MDogXCJVU1BUT09yaWdpbmFsQ29udGVudFR5cGVcIixcbiAgICAgICAgMHhDNjEyOiBcIkROR1ZlcnNpb25cIixcbiAgICAgICAgMHhDNjEzOiBcIkROR0JhY2t3YXJkVmVyc2lvblwiLFxuICAgICAgICAweEM2MTQ6IFwiVW5pcXVlQ2FtZXJhTW9kZWxcIixcbiAgICAgICAgMHhDNjE1OiBcIkxvY2FsaXplZENhbWVyYU1vZGVsXCIsXG4gICAgICAgIDB4QzYxNjogXCJDRkFQbGFuZUNvbG9yXCIsXG4gICAgICAgIDB4QzYxNzogXCJDRkFMYXlvdXRcIixcbiAgICAgICAgMHhDNjE4OiBcIkxpbmVhcml6YXRpb25UYWJsZVwiLFxuICAgICAgICAweEM2MTk6IFwiQmxhY2tMZXZlbFJlcGVhdERpbVwiLFxuICAgICAgICAweEM2MUE6IFwiQmxhY2tMZXZlbFwiLFxuICAgICAgICAweEM2MUI6IFwiQmxhY2tMZXZlbERlbHRhSFwiLFxuICAgICAgICAweEM2MUM6IFwiQmxhY2tMZXZlbERlbHRhVlwiLFxuICAgICAgICAweEM2MUQ6IFwiV2hpdGVMZXZlbFwiLFxuICAgICAgICAweEM2MUU6IFwiRGVmYXVsdFNjYWxlXCIsXG4gICAgICAgIDB4QzYxRjogXCJEZWZhdWx0Q3JvcE9yaWdpblwiLFxuICAgICAgICAweEM2MjA6IFwiRGVmYXVsdENyb3BTaXplXCIsXG4gICAgICAgIDB4QzYyMTogXCJDb2xvck1hdHJpeDFcIixcbiAgICAgICAgMHhDNjIyOiBcIkNvbG9yTWF0cml4MlwiLFxuICAgICAgICAweEM2MjM6IFwiQ2FtZXJhQ2FsaWJyYXRpb24xXCIsXG4gICAgICAgIDB4QzYyNDogXCJDYW1lcmFDYWxpYnJhdGlvbjJcIixcbiAgICAgICAgMHhDNjI1OiBcIlJlZHVjdGlvbk1hdHJpeDFcIixcbiAgICAgICAgMHhDNjI2OiBcIlJlZHVjdGlvbk1hdHJpeDJcIixcbiAgICAgICAgMHhDNjI3OiBcIkFuYWxvZ0JhbGFuY2VcIixcbiAgICAgICAgMHhDNjI4OiBcIkFzU2hvdE5ldXRyYWxcIixcbiAgICAgICAgMHhDNjI5OiBcIkFzU2hvdFdoaXRlWFlcIixcbiAgICAgICAgMHhDNjJBOiBcIkJhc2VsaW5lRXhwb3N1cmVcIixcbiAgICAgICAgMHhDNjJCOiBcIkJhc2VsaW5lTm9pc2VcIixcbiAgICAgICAgMHhDNjJDOiBcIkJhc2VsaW5lU2hhcnBuZXNzXCIsXG4gICAgICAgIDB4QzYyRDogXCJCYXllckdyZWVuU3BsaXRcIixcbiAgICAgICAgMHhDNjJFOiBcIkxpbmVhclJlc3BvbnNlTGltaXRcIixcbiAgICAgICAgMHhDNjJGOiBcIkNhbWVyYVNlcmlhbE51bWJlclwiLFxuICAgICAgICAweEM2MzA6IFwiRE5HTGVuc0luZm9cIixcbiAgICAgICAgMHhDNjMxOiBcIkNocm9tYUJsdXJSYWRpdXNcIixcbiAgICAgICAgMHhDNjMyOiBcIkFudGlBbGlhc1N0cmVuZ3RoXCIsXG4gICAgICAgIDB4QzYzMzogXCJTaGFkb3dTY2FsZVwiLFxuICAgICAgICAweEM2MzQ6IFwiRE5HUHJpdmF0ZURhdGFcIixcbiAgICAgICAgMHhDNjM1OiBcIk1ha2VyTm90ZVNhZmV0eVwiLFxuICAgICAgICAweEM2NDA6IFwiUmF3SW1hZ2VTZWdtZW50YXRpb25cIixcbiAgICAgICAgMHhDNjVBOiBcIkNhbGlicmF0aW9uSWxsdW1pbmFudDFcIixcbiAgICAgICAgMHhDNjVCOiBcIkNhbGlicmF0aW9uSWxsdW1pbmFudDJcIixcbiAgICAgICAgMHhDNjVDOiBcIkJlc3RRdWFsaXR5U2NhbGVcIixcbiAgICAgICAgMHhDNjVEOiBcIlJhd0RhdGFVbmlxdWVJRFwiLFxuICAgICAgICAweEM2NjA6IFwiQWxpYXNMYXllck1ldGFkYXRhXCIsXG4gICAgICAgIDB4QzY4QjogXCJPcmlnaW5hbFJhd0ZpbGVOYW1lXCIsXG4gICAgICAgIDB4QzY4QzogXCJPcmlnaW5hbFJhd0ZpbGVEYXRhXCIsXG4gICAgICAgIDB4QzY4RDogXCJBY3RpdmVBcmVhXCIsXG4gICAgICAgIDB4QzY4RTogXCJNYXNrZWRBcmVhc1wiLFxuICAgICAgICAweEM2OEY6IFwiQXNTaG90SUNDUHJvZmlsZVwiLFxuICAgICAgICAweEM2OTA6IFwiQXNTaG90UHJlUHJvZmlsZU1hdHJpeFwiLFxuICAgICAgICAweEM2OTE6IFwiQ3VycmVudElDQ1Byb2ZpbGVcIixcbiAgICAgICAgMHhDNjkyOiBcIkN1cnJlbnRQcmVQcm9maWxlTWF0cml4XCIsXG4gICAgICAgIDB4QzZCRjogXCJDb2xvcmltZXRyaWNSZWZlcmVuY2VcIixcbiAgICAgICAgMHhDNkQyOiBcIlBhbmFzb25pY1RpdGxlXCIsXG4gICAgICAgIDB4QzZEMzogXCJQYW5hc29uaWNUaXRsZTJcIixcbiAgICAgICAgMHhDNkYzOiBcIkNhbWVyYUNhbGlicmF0aW9uU2lnXCIsXG4gICAgICAgIDB4QzZGNDogXCJQcm9maWxlQ2FsaWJyYXRpb25TaWdcIixcbiAgICAgICAgMHhDNkY1OiBcIlByb2ZpbGVJRkRcIixcbiAgICAgICAgMHhDNkY2OiBcIkFzU2hvdFByb2ZpbGVOYW1lXCIsXG4gICAgICAgIDB4QzZGNzogXCJOb2lzZVJlZHVjdGlvbkFwcGxpZWRcIixcbiAgICAgICAgMHhDNkY4OiBcIlByb2ZpbGVOYW1lXCIsXG4gICAgICAgIDB4QzZGOTogXCJQcm9maWxlSHVlU2F0TWFwRGltc1wiLFxuICAgICAgICAweEM2RkE6IFwiUHJvZmlsZUh1ZVNhdE1hcERhdGExXCIsXG4gICAgICAgIDB4QzZGQjogXCJQcm9maWxlSHVlU2F0TWFwRGF0YTJcIixcbiAgICAgICAgMHhDNkZDOiBcIlByb2ZpbGVUb25lQ3VydmVcIixcbiAgICAgICAgMHhDNkZEOiBcIlByb2ZpbGVFbWJlZFBvbGljeVwiLFxuICAgICAgICAweEM2RkU6IFwiUHJvZmlsZUNvcHlyaWdodFwiLFxuICAgICAgICAweEM3MTQ6IFwiRm9yd2FyZE1hdHJpeDFcIixcbiAgICAgICAgMHhDNzE1OiBcIkZvcndhcmRNYXRyaXgyXCIsXG4gICAgICAgIDB4QzcxNjogXCJQcmV2aWV3QXBwbGljYXRpb25OYW1lXCIsXG4gICAgICAgIDB4QzcxNzogXCJQcmV2aWV3QXBwbGljYXRpb25WZXJzaW9uXCIsXG4gICAgICAgIDB4QzcxODogXCJQcmV2aWV3U2V0dGluZ3NOYW1lXCIsXG4gICAgICAgIDB4QzcxOTogXCJQcmV2aWV3U2V0dGluZ3NEaWdlc3RcIixcbiAgICAgICAgMHhDNzFBOiBcIlByZXZpZXdDb2xvclNwYWNlXCIsXG4gICAgICAgIDB4QzcxQjogXCJQcmV2aWV3RGF0ZVRpbWVcIixcbiAgICAgICAgMHhDNzFDOiBcIlJhd0ltYWdlRGlnZXN0XCIsXG4gICAgICAgIDB4QzcxRDogXCJPcmlnaW5hbFJhd0ZpbGVEaWdlc3RcIixcbiAgICAgICAgMHhDNzFFOiBcIlN1YlRpbGVCbG9ja1NpemVcIixcbiAgICAgICAgMHhDNzFGOiBcIlJvd0ludGVybGVhdmVGYWN0b3JcIixcbiAgICAgICAgMHhDNzI1OiBcIlByb2ZpbGVMb29rVGFibGVEaW1zXCIsXG4gICAgICAgIDB4QzcyNjogXCJQcm9maWxlTG9va1RhYmxlRGF0YVwiLFxuICAgICAgICAweEM3NDA6IFwiT3Bjb2RlTGlzdDFcIixcbiAgICAgICAgMHhDNzQxOiBcIk9wY29kZUxpc3QyXCIsXG4gICAgICAgIDB4Qzc0RTogXCJPcGNvZGVMaXN0M1wiLFxuICAgICAgICAweEM3NjE6IFwiTm9pc2VQcm9maWxlXCIsXG4gICAgICAgIDB4Qzc2MzogXCJUaW1lQ29kZXNcIixcbiAgICAgICAgMHhDNzY0OiBcIkZyYW1lUmF0ZVwiLFxuICAgICAgICAweEM3NzI6IFwiVFN0b3BcIixcbiAgICAgICAgMHhDNzg5OiBcIlJlZWxOYW1lXCIsXG4gICAgICAgIDB4Qzc5MTogXCJPcmlnaW5hbERlZmF1bHRGaW5hbFNpemVcIixcbiAgICAgICAgMHhDNzkyOiBcIk9yaWdpbmFsQmVzdFF1YWxpdHlTaXplXCIsXG4gICAgICAgIDB4Qzc5MzogXCJPcmlnaW5hbERlZmF1bHRDcm9wU2l6ZVwiLFxuICAgICAgICAweEM3QTE6IFwiQ2FtZXJhTGFiZWxcIixcbiAgICAgICAgMHhDN0EzOiBcIlByb2ZpbGVIdWVTYXRNYXBFbmNvZGluZ1wiLFxuICAgICAgICAweEM3QTQ6IFwiUHJvZmlsZUxvb2tUYWJsZUVuY29kaW5nXCIsXG4gICAgICAgIDB4QzdBNTogXCJCYXNlbGluZUV4cG9zdXJlT2Zmc2V0XCIsXG4gICAgICAgIDB4QzdBNjogXCJEZWZhdWx0QmxhY2tSZW5kZXJcIixcbiAgICAgICAgMHhDN0E3OiBcIk5ld1Jhd0ltYWdlRGlnZXN0XCIsXG4gICAgICAgIDB4QzdBODogXCJSYXdUb1ByZXZpZXdHYWluXCIsXG4gICAgICAgIDB4QzdCNTogXCJEZWZhdWx0VXNlckNyb3BcIixcbiAgICAgICAgMHhFQTFDOiBcIlBhZGRpbmdcIixcbiAgICAgICAgMHhFQTFEOiBcIk9mZnNldFNjaGVtYVwiLFxuICAgICAgICAweEZERTg6IFwiT3duZXJOYW1lXCIsXG4gICAgICAgIDB4RkRFOTogXCJTZXJpYWxOdW1iZXJcIixcbiAgICAgICAgMHhGREVBOiBcIkxlbnNcIixcbiAgICAgICAgMHhGRTAwOiBcIktEQ19JRkRcIixcbiAgICAgICAgMHhGRTRDOiBcIlJhd0ZpbGVcIixcbiAgICAgICAgMHhGRTREOiBcIkNvbnZlcnRlclwiLFxuICAgICAgICAweEZFNEU6IFwiV2hpdGVCYWxhbmNlXCIsXG4gICAgICAgIDB4RkU1MTogXCJFeHBvc3VyZVwiLFxuICAgICAgICAweEZFNTI6IFwiU2hhZG93c1wiLFxuICAgICAgICAweEZFNTM6IFwiQnJpZ2h0bmVzc1wiLFxuICAgICAgICAweEZFNTQ6IFwiQ29udHJhc3RcIixcbiAgICAgICAgMHhGRTU1OiBcIlNhdHVyYXRpb25cIixcbiAgICAgICAgMHhGRTU2OiBcIlNoYXJwbmVzc1wiLFxuICAgICAgICAweEZFNTc6IFwiU21vb3RobmVzc1wiLFxuICAgICAgICAweEZFNTg6IFwiTW9pcmVGaWx0ZXJcIlxuICAgIH07XG4gICAgVGFncy5HUFMgPSB7XG4gICAgICAgIDB4MDAwMDogJ0dQU1ZlcnNpb25JRCcsXG4gICAgICAgIDB4MDAwMTogJ0dQU0xhdGl0dWRlUmVmJyxcbiAgICAgICAgMHgwMDAyOiAnR1BTTGF0aXR1ZGUnLFxuICAgICAgICAweDAwMDM6ICdHUFNMb25naXR1ZGVSZWYnLFxuICAgICAgICAweDAwMDQ6ICdHUFNMb25naXR1ZGUnLFxuICAgICAgICAweDAwMDU6ICdHUFNBbHRpdHVkZVJlZicsXG4gICAgICAgIDB4MDAwNjogJ0dQU0FsdGl0dWRlJyxcbiAgICAgICAgMHgwMDA3OiAnR1BTVGltZVN0YW1wJyxcbiAgICAgICAgMHgwMDA4OiAnR1BTU2F0ZWxsaXRlcycsXG4gICAgICAgIDB4MDAwOTogJ0dQU1N0YXR1cycsXG4gICAgICAgIDB4MDAwQTogJ0dQU01lYXN1cmVNb2RlJyxcbiAgICAgICAgMHgwMDBCOiAnR1BTRE9QJyxcbiAgICAgICAgMHgwMDBDOiAnR1BTU3BlZWRSZWYnLFxuICAgICAgICAweDAwMEQ6ICdHUFNTcGVlZCcsXG4gICAgICAgIDB4MDAwRTogJ0dQU1RyYWNrUmVmJyxcbiAgICAgICAgMHgwMDBGOiAnR1BTVHJhY2snLFxuICAgICAgICAweDAwMTA6ICdHUFNJbWdEaXJlY3Rpb25SZWYnLFxuICAgICAgICAweDAwMTE6ICdHUFNJbWdEaXJlY3Rpb24nLFxuICAgICAgICAweDAwMTI6ICdHUFNNYXBEYXR1bScsXG4gICAgICAgIDB4MDAxMzogJ0dQU0Rlc3RMYXRpdHVkZVJlZicsXG4gICAgICAgIDB4MDAxNDogJ0dQU0Rlc3RMYXRpdHVkZScsXG4gICAgICAgIDB4MDAxNTogJ0dQU0Rlc3RMb25naXR1ZGVSZWYnLFxuICAgICAgICAweDAwMTY6ICdHUFNEZXN0TG9uZ2l0dWRlJyxcbiAgICAgICAgMHgwMDE3OiAnR1BTRGVzdEJlYXJpbmdSZWYnLFxuICAgICAgICAweDAwMTg6ICdHUFNEZXN0QmVhcmluZycsXG4gICAgICAgIDB4MDAxOTogJ0dQU0Rlc3REaXN0YW5jZVJlZicsXG4gICAgICAgIDB4MDAxQTogJ0dQU0Rlc3REaXN0YW5jZScsXG4gICAgICAgIDB4MDAxQjogJ0dQU1Byb2Nlc3NpbmdNZXRob2QnLFxuICAgICAgICAweDAwMUM6ICdHUFNBcmVhSW5mb3JtYXRpb24nLFxuICAgICAgICAweDAwMUQ6ICdHUFNEYXRlU3RhbXAnLFxuICAgICAgICAweDAwMUU6ICdHUFNEaWZmZXJlbnRpYWwnLFxuICAgICAgICAweDAwMUY6ICdHUFNIUG9zaXRpb25pbmdFcnJvcidcbiAgICB9O1xufSkoVGFncyA9IGV4cG9ydHMuVGFncyB8fCAoZXhwb3J0cy5UYWdzID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV4aWYtdGFncy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2ltcGxpZnkgPSB2b2lkIDA7XG52YXIgRXhpZlNlY3Rpb25QYXJzZXJfMSA9IHJlcXVpcmUoXCIuL0V4aWZTZWN0aW9uUGFyc2VyXCIpO1xudmFyIERhdGVVdGlsXzEgPSByZXF1aXJlKFwiLi9EYXRlVXRpbFwiKTtcbnZhciBzaW1wbGlmeTtcbihmdW5jdGlvbiAoc2ltcGxpZnkpIHtcbiAgICB2YXIgZGVncmVlVGFncyA9IFt7XG4gICAgICAgICAgICBzZWN0aW9uOiBFeGlmU2VjdGlvblBhcnNlcl8xLkV4aWZTZWN0aW9ucy5HUFNJRkQsXG4gICAgICAgICAgICB0eXBlOiAweDAwMDIsXG4gICAgICAgICAgICBuYW1lOiAnR1BTTGF0aXR1ZGUnLFxuICAgICAgICAgICAgcmVmVHlwZTogMHgwMDAxLFxuICAgICAgICAgICAgcmVmTmFtZTogJ0dQU0xhdGl0dWRlUmVmJyxcbiAgICAgICAgICAgIHBvc1ZhbDogJ04nXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlY3Rpb246IEV4aWZTZWN0aW9uUGFyc2VyXzEuRXhpZlNlY3Rpb25zLkdQU0lGRCxcbiAgICAgICAgICAgIHR5cGU6IDB4MDAwNCxcbiAgICAgICAgICAgIG5hbWU6ICdHUFNMb25naXR1ZGUnLFxuICAgICAgICAgICAgcmVmVHlwZTogMHgwMDAzLFxuICAgICAgICAgICAgcmVmTmFtZTogJ0dQU0xvbmdpdHVkZVJlZicsXG4gICAgICAgICAgICBwb3NWYWw6ICdFJ1xuICAgICAgICB9XTtcbiAgICB2YXIgZGF0ZVRhZ3MgPSBbe1xuICAgICAgICAgICAgc2VjdGlvbjogRXhpZlNlY3Rpb25QYXJzZXJfMS5FeGlmU2VjdGlvbnMuU3ViSUZELFxuICAgICAgICAgICAgdHlwZTogMHgwMTMyLFxuICAgICAgICAgICAgbmFtZTogJ01vZGlmeURhdGUnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlY3Rpb246IEV4aWZTZWN0aW9uUGFyc2VyXzEuRXhpZlNlY3Rpb25zLlN1YklGRCxcbiAgICAgICAgICAgIHR5cGU6IDB4OTAwMyxcbiAgICAgICAgICAgIG5hbWU6ICdEYXRlVGltZU9yaWdpbmFsJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzZWN0aW9uOiBFeGlmU2VjdGlvblBhcnNlcl8xLkV4aWZTZWN0aW9ucy5TdWJJRkQsXG4gICAgICAgICAgICB0eXBlOiAweDkwMDQsXG4gICAgICAgICAgICBuYW1lOiAnQ3JlYXRlRGF0ZSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc2VjdGlvbjogRXhpZlNlY3Rpb25QYXJzZXJfMS5FeGlmU2VjdGlvbnMuU3ViSUZELFxuICAgICAgICAgICAgdHlwZTogMHgwMTMyLFxuICAgICAgICAgICAgbmFtZTogJ01vZGlmeURhdGUnLFxuICAgICAgICB9XTtcbiAgICBmdW5jdGlvbiBjYXN0RGVncmVlVmFsdWVzKGdldFRhZ1ZhbHVlLCBzZXRUYWdWYWx1ZSkge1xuICAgICAgICBkZWdyZWVUYWdzLmZvckVhY2goZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHZhciBkZWdyZWVWYWwgPSBnZXRUYWdWYWx1ZSh0KTtcbiAgICAgICAgICAgIGlmIChkZWdyZWVWYWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVncmVlUmVmID0gZ2V0VGFnVmFsdWUoeyBzZWN0aW9uOiB0LnNlY3Rpb24sIHR5cGU6IHQucmVmVHlwZSwgbmFtZTogdC5yZWZOYW1lIH0pO1xuICAgICAgICAgICAgICAgIHZhciBkZWdyZWVOdW1SZWYgPSBkZWdyZWVSZWYgPT09IHQucG9zVmFsID8gMSA6IC0xO1xuICAgICAgICAgICAgICAgIHZhciBkZWdyZWUgPSAoZGVncmVlVmFsWzBdICsgKGRlZ3JlZVZhbFsxXSAvIDYwKSArIChkZWdyZWVWYWxbMl0gLyAzNjAwKSkgKiBkZWdyZWVOdW1SZWY7XG4gICAgICAgICAgICAgICAgc2V0VGFnVmFsdWUodCwgZGVncmVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNpbXBsaWZ5LmNhc3REZWdyZWVWYWx1ZXMgPSBjYXN0RGVncmVlVmFsdWVzO1xuICAgIGZ1bmN0aW9uIGNhc3REYXRlVmFsdWVzKGdldFRhZ1ZhbHVlLCBzZXRUYWdWYWx1ZSkge1xuICAgICAgICBkYXRlVGFncy5mb3JFYWNoKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICB2YXIgZGF0ZVN0clZhbCA9IGdldFRhZ1ZhbHVlKHQpO1xuICAgICAgICAgICAgaWYgKGRhdGVTdHJWYWwpIHtcbiAgICAgICAgICAgICAgICAvL3NvbWUgZWFzeSBjaGVja3MgdG8gZGV0ZXJtaW5lIHR3byBjb21tb24gZGF0ZSBmb3JtYXRzXG4gICAgICAgICAgICAgICAgdmFyIHRpbWVzdGFtcCA9IERhdGVVdGlsXzEuRGF0ZVV0aWwucGFyc2VFeGlmRGF0ZShkYXRlU3RyVmFsKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRpbWVzdGFtcCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGFnVmFsdWUodCwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzaW1wbGlmeS5jYXN0RGF0ZVZhbHVlcyA9IGNhc3REYXRlVmFsdWVzO1xuICAgIGZ1bmN0aW9uIHNpbXBsaWZ5VmFsdWUodmFsdWVzLCBmb3JtYXQpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWVzKSkge1xuICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzLm1hcChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9ybWF0ID09PSAxMCB8fCBmb3JtYXQgPT09IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlWzBdIC8gdmFsdWVbMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHZhbHVlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMgPSB2YWx1ZXNbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG4gICAgc2ltcGxpZnkuc2ltcGxpZnlWYWx1ZSA9IHNpbXBsaWZ5VmFsdWU7XG59KShzaW1wbGlmeSA9IGV4cG9ydHMuc2ltcGxpZnkgfHwgKGV4cG9ydHMuc2ltcGxpZnkgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2ltcGxpZnkuanMubWFwIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7RXhpZlBhcnNlckZhY3RvcnksIEV4aWZUYWdzfSBmcm9tIFwidHMtZXhpZi1wYXJzZXJcIjtcblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlRmlsZVNlbGVjdChldnQ6IGFueSkge1xuICAgIGxldCBmaWxlczogRmlsZVtdID0gZXZ0LnRhcmdldC5maWxlczsgLy8gRmlsZUxpc3Qgb2JqZWN0XG4gICAgY29uc3QgZmlsZVBhaXJzOiB7ZmlsZTogRmlsZSwgdGFnczogRXhpZlRhZ3N9W10gPSBbXTtcbiAgICBmb3IgKGxldCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICAgIGxldCBidWZmZXIgPSBhd2FpdCBmaWxlLmFycmF5QnVmZmVyKCk7XG4gICAgICAgIGxldCBwYXJzZXIgPSBFeGlmUGFyc2VyRmFjdG9yeS5jcmVhdGUoYnVmZmVyKTtcbiAgICAgICAgbGV0IG91dHB1dCA9IHBhcnNlci5wYXJzZSgpO1xuICAgICAgICBjb25zdCB0YWdzID0gb3V0cHV0LnRhZ3M7XG4gICAgICAgIGZpbGVQYWlycy5wdXNoKHtmaWxlLCB0YWdzfSlcbiAgICB9XG4gICAgY29uc3QgZmlsdGVyZWRGaWxlUGFpcnMgPSBmaWxlUGFpcnMuZmlsdGVyKCh7ZmlsZSwgdGFnc30pID0+IHRhZ3MuTGVuc01ha2UgPT09IFwiQXBwbGVcIik7XG4gICAgY29uc29sZS5sb2coe2ZpbGVQYWlycywgZmlsdGVyZWRGaWxlUGFpcnN9KTtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgd2luZG93Lm1hcCA9IG1hcDtcblxufVxuXG5kb2N1bWVudC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVzJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgaGFuZGxlRmlsZVNlbGVjdCwgZmFsc2UpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9