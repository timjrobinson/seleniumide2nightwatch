convert = {
    base: "",

    open: {
        parse: function (details) {
            return "url(" + this.base + details + ")";
        }
    },

    clickAndWait: {
        parse: function () {

        }
    },

    check: {
        parse: function () {

        }
    }
};

module.exports = convert;

