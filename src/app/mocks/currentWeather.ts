// GET /currentconditions/v1/213225?apikey=MVu5tD8P1Pzp0kGZfdIhuIVuqGrxtYns

export const currentWeather = [
  {
    LocalObservationDateTime: '2019-07-23T16:40:00+03:00',
    EpochTime: 1563889200,
    WeatherText: 'Sunny',
    WeatherIcon: 1,
    HasPrecipitation: false,
    PrecipitationType: null,
    IsDayTime: true,
    Temperature: {
      Metric: {
        Value: 29.8,
        Unit: 'C',
        UnitType: 17
      },
      Imperial: {
        Value: 86,
        Unit: 'F',
        UnitType: 18
      }
    },
    MobileLink:
      'http://m.accuweather.com/en/il/jerusalem/213225/current-weather/213225?lang=en-us',
    Link:
      'http://www.accuweather.com/en/il/jerusalem/213225/current-weather/213225?lang=en-us'
  }
];
