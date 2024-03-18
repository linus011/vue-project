import _ from 'lodash';

export const lodashMixin = {
    /** Converts obj keys to camelCase */
    $camelCaseKeys(object) {
        return _.mapKeys(object, (_value, key) => _.camelCase(key));
    },

    /** Pauses code for x milliseconds */
    $pause(milliseconds) {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
};

_.mixin(lodashMixin);
window._ = _;
