const data = require("./data/countries.json");

interface Country {
  country: string;
  languages: string[];
}

const sortByMostLanguagesSpoken = (a: Country, b: Country) =>
  b.languages.length - a.languages.length;

export const getTotalCountries = (countries: Country[]) => countries?.length || 0;

export const getMostOficialLanguagesWIthMainLangAs = (
  countries: Country[],
  language: string
) => {
  const countriesThatSpeakLanguage = countries.filter((country) =>
    country.languages.includes(language)
  );
  const orderedCountriesByMostLanguages = countriesThatSpeakLanguage.sort(
    sortByMostLanguagesSpoken
  );

  return orderedCountriesByMostLanguages[0]?.country || "not found";
};

export const getTotalLanguagesByCountry = (countries: Country[]) =>
  countries.map((item) => ({
    country: item.country,
    languagesSpoken: item.languages.join(','),
    totalLanguagesSpoken: item.languages.length,
  }));

export const getHighestNumberOfLanguages = (countries: Country[]) => {
  const orderedCountriesByLanguage = countries.sort(sortByMostLanguagesSpoken);

  return orderedCountriesByLanguage.map((item) => ({
    country: item.country,
    totalLanguagesSpoken: item.languages.length,
  }));
};

export const getMostFrequentLanguageByCountry = (countries: Country[]) => {
  if(!countries) return [];

  let languages: string[] = [];

  countries.forEach(
    (country) => (languages = languages.concat(country.languages))
  );

  const languageCounting: {
    language: string;
    total: number;
  }[] = [];

  languages.forEach((language) => {
    const hasLanguage = languageCounting.filter((i) => i.language === language);

    if (hasLanguage.length === 0) {
      languageCounting.push({
        language,
        total: 1,
      });
    } else {
      const index = languageCounting.findIndex((i) => i.language === language);

      languageCounting[index].total++;
    }
  });

  const highest = Math.max(...languageCounting.map((o) => o.total));

  return languageCounting.filter(i => i.total === highest);
}

const foundData = {
  totalOfCountries: getTotalCountries(data),
  countryWithMostOficialLangAsDE: getMostOficialLanguagesWIthMainLangAs(
    data,
    "de"
  ),
  totalOfLanguagesByCountry: getTotalLanguagesByCountry(data),
  highestNumberOfLanguagesSpoken: getHighestNumberOfLanguages(data),
  mostFrequentLanguages: getMostFrequentLanguageByCountry(data)
};

console.log(foundData);
