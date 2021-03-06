(function (_) {
    var SVG_CHESSBOARD_CSS_URL = 'url("data:image/svg+xml;base64,' +
        btoa('<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8" fill="white"/><rect width="4" height="4" fill="#CDCDCD"/><rect x="4" y="4" width="4" height="4" fill="#CDCDCD"/></svg>') +
        '")';

    /**
     * A base class for patterns like color, gradients, etc.
     * @mixin IFGradient
     * @constructor
     */
    function IFPattern() {
    }

    /**
     * Pattern's mime-type
     * @type {string}
     */
    IFPattern.MIME_TYPE = "application/infinity+pattern";

    IFPattern.inherit = function (identifier, patternClass, patternSuperClass) {
        IFObject.inherit(patternClass, patternSuperClass ? patternSuperClass : IFPattern);
        IFPattern._idClassMap[identifier] = patternClass;
    };

    IFPattern._idClassMap = {};

    /**
     * Convert a pattern into a CSS-Compatible background string
     * @param {IFPattern} pattern
     * @returns {*}
     */
    IFPattern.asCSSBackground = function (pattern) {
        var result = SVG_CHESSBOARD_CSS_URL;
        if (pattern) {
            result = pattern.asCSSBackground() + ',' + result;
        }
        return result;
    };

    /**
     * Serialize a pattern
     * @param {IFPattern} pattern
     * @returns {String}
     */
    IFPattern.serialize = function (pattern) {
        if (pattern) {
            for (var id in IFPattern._idClassMap) {
                if (pattern.constructor === IFPattern._idClassMap[id]) {
                    return id + '#' + pattern.serialize();
                }
            }

            throw new Error('Unregistered Pattern Class.');
        }
        return null;
    };

    /**
     * Deserialize a pattern string
     * @param {String} string
     * @returns {IFPattern}
     */
    IFPattern.deserialize = function (string) {
        if (string) {
            var hash = string.indexOf('#');
            if (hash > 0) {
                var id = string.substr(0, hash);
                if (id && id.length > 0) {
                    var clazz = IFPattern._idClassMap[id];
                    if (!clazz) {
                        throw new Error('Unregistered Pattern Class.');
                    }

                    var pattern = new clazz();
                    pattern.deserialize(string.substr(hash + 1));
                    return pattern;
                }
            }
        }
        return null;
    };

    /**
     * Called to convert this pattern into a css compatible background
     * @returns {string}
     */
    IFPattern.prototype.asCSSBackground = function () {
        throw new Error('Not Supported');
    };

    /**
     * Called to serialize the pattern into a string
     * @return {String} the serialized string
     */
    IFPattern.prototype.serialize = function () {
        return '';
    };

    /**
     * Called to deserialize the pattern from a string
     * @param {String} string the string to deserialize the pattern from
     */
    IFPattern.prototype.deserialize = function (string) {
        // NO-OP
    };

    _.IFPattern = IFPattern;
})(this);