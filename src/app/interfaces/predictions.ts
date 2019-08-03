export interface IPredictions {
  DailyForecasts: IDailyForecasts;
}

interface IDailyForecasts {
  Date: string;
  Day: any;
  Temperature: any;
}
