"use strict";
exports.__esModule = true;
exports.getMostFrequentLanguageByCountry = exports.getHighestNumberOfLanguages = exports.getTotalLanguagesByCountry = exports.getMostOficialLanguagesWIthMainLangAs = exports.getTotalCountries = void 0;
var data = require("./data/countries.json");
var sortByMostLanguagesSpoken = function (a, b) {
    return b.languages.length - a.languages.length;
};
var getTotalCountries = function (countries) { return (countries === null || countries === void 0 ? void 0 : countries.length) || 0; };
exports.getTotalCountries = getTotalCountries;
var getMostOficialLanguagesWIthMainLangAs = function (countries, language) {
    var _a;
    var countriesThatSpeakLanguage = countries.filter(function (country) {
        return country.languages.includes(language);
    });
    var orderedCountriesByMostLanguages = countriesThatSpeakLanguage.sort(sortByMostLanguagesSpoken);
    return ((_a = orderedCountriesByMostLanguages[0]) === null || _a === void 0 ? void 0 : _a.country) || "not found";
};
exports.getMostOficialLanguagesWIthMainLangAs = getMostOficialLanguagesWIthMainLangAs;
var getTotalLanguagesByCountry = function (countries) {
    return countries.map(function (item) { return ({
        country: item.country,
        languagesSpoken: item.languages.join(','),
        totalLanguagesSpoken: item.languages.length
    }); });
};
exports.getTotalLanguagesByCountry = getTotalLanguagesByCountry;
var getHighestNumberOfLanguages = function (countries) {
    var orderedCountriesByLanguage = countries.sort(sortByMostLanguagesSpoken);
    return orderedCountriesByLanguage.map(function (item) { return ({
        country: item.country,
        totalLanguagesSpoken: item.languages.length
    }); });
};
exports.getHighestNumberOfLanguages = getHighestNumberOfLanguages;
var getMostFrequentLanguageByCountry = function (countries) {
    if (!countries)
        return [];
    var languages = [];
    countries.forEach(function (country) { return (languages = languages.concat(country.languages)); });
    var languageCounting = [];
    languages.forEach(function (language) {
        var hasLanguage = languageCounting.filter(function (i) { return i.language === language; });
        if (hasLanguage.length === 0) {
            languageCounting.push({
                language: language,
                total: 1
            });
        }
        else {
            var index = languageCounting.findIndex(function (i) { return i.language === language; });
            languageCounting[index].total++;
        }
    });
    var highest = Math.max.apply(Math, languageCounting.map(function (o) { return o.total; }));
    return languageCounting.filter(function (i) { return i.total === highest; });
};
exports.getMostFrequentLanguageByCountry = getMostFrequentLanguageByCountry;
var foundData = {
    totalOfCountries: (0, exports.getTotalCountries)(data),
    countryWithMostOficialLangAsDE: (0, exports.getMostOficialLanguagesWIthMainLangAs)(data, "de"),
    totalOfLanguagesByCountry: (0, exports.getTotalLanguagesByCountry)(data),
    highestNumberOfLanguagesSpoken: (0, exports.getHighestNumberOfLanguages)(data),
    mostFrequentLanguages: (0, exports.getMostFrequentLanguageByCountry)(data)
};
console.log(foundData);
