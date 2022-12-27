export interface ICity {
    id: number;
    name: string;
    country: string;
    region: string;
    checkers?: IChecker;
}

export interface ICityWithForecast {
    current: {
        condition: {
            icon: string;
            text: string;
        }
        humidity: number;
        temp_f: number;
        feelslike_f: number;
    }
    location: ICity;
}

export interface IChecker {
    max_temp: string;
}