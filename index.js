"use strict";
exports.__esModule = true;
var data = require("./data/countries.json");
var sortByMostLanguagesSpoken = function (a, b) {
    return b.languages.length - a.languages.length;
};
var getTotalCountries = function (countries) { return (countries === null || countries === void 0 ? void 0 : countries.length) || 0; };
var getMostOficialLanguagesWIthMainLangAs = function (countries, language) {
    var countriesThatSpeakLanguage = countries.filter(function (country) {
        return country.languages.includes(language);
    });
    var orderedCountriesByMostLanguages = countriesThatSpeakLanguage.sort(sortByMostLanguagesSpoken);
    return orderedCountriesByMostLanguages[0].country || "not found";
};
var getTotalLanguagesByCountry = function (countries) {
    return countries.map(function (item) { return ({
        country: item.country,
        languagesSpoken: item.languages.join(','),
        totalLanguagesSpoken: item.languages.length
    }); });
};
var getHighestNumberOfLanguages = function (countries) {
    var orderedCountriesByLanguage = countries.sort(sortByMostLanguagesSpoken);
    return orderedCountriesByLanguage.map(function (item) { return ({
        country: item.country,
        totalLanguagesSpoken: item.languages.length
    }); });
};
var getMostFrequentLanguageByCountry = function (countries) {
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
var foundData = {
    totalOfCountries: getTotalCountries(data),
    countryWithMostOficialLangAsDE: getMostOficialLanguagesWIthMainLangAs(data, "de"),
    totalOfLanguagesByCountry: getTotalLanguagesByCountry(data),
    highestNumberOfLanguagesSpoken: getHighestNumberOfLanguages(data),
    mostFrequentLanguages: getMostFrequentLanguageByCountry(data)
};
console.log(foundData);
