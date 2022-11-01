const {
  getTotalCountries,
  getMostOficialLanguagesWIthMainLangAs,
  getTotalLanguagesByCountry,
  getHighestNumberOfLanguages,
  getMostFrequentLanguageByCountry,
} = require("./index.ts");
const data = require("./data/countries.json");

jest.mock("./index");

describe("Country totals", () => {
  it("Should return the total of countries found", () => {
    const result = getTotalCountries(data);

    expect(result).toBe(5);
  });

  it("Should return 0 if empty data is sent", () => {
    const result = getTotalCountries([]);

    expect(result).toBe(0);
  });
});

describe("Show the countries where specified language is spoken at", () => {
  it("Should return the country acronym where DE is mostly spoken at", () => {
    const result = getMostOficialLanguagesWIthMainLangAs(data, "de");

    expect(result).toBe("BE");
  });

  it("Should return as not found if unknown country is mentioned or not in the list", () => {
    const result = getMostOficialLanguagesWIthMainLangAs(data, "br");

    expect(result).toBe("not found");
  });
});

describe("Show total languages by country", () => {
  it("Should show a list of countries and the total of languages spoken there", () => {
    const result = getTotalLanguagesByCountry(data);

    expect(result).toStrictEqual([
      { country: "BE", languagesSpoken: "nl,fr,de", totalLanguagesSpoken: 3 },
      { country: "NL", languagesSpoken: "nl,fy", totalLanguagesSpoken: 2 },
      { country: "US", languagesSpoken: "en", totalLanguagesSpoken: 1 },
      { country: "DE", languagesSpoken: "de", totalLanguagesSpoken: 1 },
      { country: "ES", languagesSpoken: "es", totalLanguagesSpoken: 1 },
    ]);
  });

  it("Should return an empty array if no data is given", () => {
    const result = getTotalLanguagesByCountry([]);

    expect(result).toStrictEqual([]);
  });
});

describe("Show sorting by most languages in a single country", () => {
  it("Should sort a list and order by highest number of languages by country", () => {
    const result = getHighestNumberOfLanguages(data);

    expect(result).toStrictEqual([
      { country: "BE", totalLanguagesSpoken: 3 },
      { country: "NL", totalLanguagesSpoken: 2 },
      { country: "US", totalLanguagesSpoken: 1 },
      { country: "DE", totalLanguagesSpoken: 1 },
      { country: "ES", totalLanguagesSpoken: 1 },
    ]);
  })

  it("Shoud return an empty array if no data is given", () => {
    const result = getHighestNumberOfLanguages([]);

    expect(result).toStrictEqual([]);
  })
})

describe('Sort languages by frequency', () => {
  it("Should return a list ordered by most frequent languages in data", () =>{
    const result = getMostFrequentLanguageByCountry(data);

    expect(result).toStrictEqual([
      { language: "nl", total: 2 },
      { language: "de", total: 2 },
    ]);
  });

  it("Should return an empty array if no data is given", () =>{
    const result = getMostFrequentLanguageByCountry([]);

    expect(result).toStrictEqual([]);
  })
})
