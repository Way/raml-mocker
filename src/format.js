'use strict';
var _ = require('lodash');
var Faker = require('Faker');

var defaultFormats = {
    'email': function (Faker) {
        return Faker.Internet.email();
    },
    'hostname': function (Faker) {
        return Faker.Internet.domainName();
    },
    'ipv4': function (Faker) {
        return Faker.Internet.ip();
    },
    'uri': function (Faker) {
        return Faker.random.avatar_uri();
    },
    'date': function (Faker) {
        return Faker.Date.recent();
    },
    'timestamp': function (Faker) {
        return new Date(Faker.Date.recent(20)).getTime();
    },
    'url': function (Faker) {
        return Faker.Image.imageUrl();
    }
};

var FormatMocker = function (formats) {
    if (_.isUndefined(formats)) {
        formats = {};
    }
    formats = _.defaults(formats, defaultFormats);
    return {
        format: function (format, schema) {
            var result;
            if (typeof (formats[format]) === 'function') {
                result = formats[format](Faker, schema);
            }
            return result;
        }
    };
};

module.exports = FormatMocker;
