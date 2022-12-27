import { IconButton } from "@mui/material";
import { ICity, ICityWithForecast } from "interfaces";
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { memo } from "react";

interface ICardCityWithForecast extends ICityWithForecast {
    handleOpenCheckers: (param: ICity) => void;
}

const CardCityWithForecast = memo(({location, current, handleOpenCheckers}: ICardCityWithForecast) => {
    return (
        <div className="card-city --with-forecast">
            <div className="card-city__info">
                <img src={current.condition.icon} alt={current.condition.text}/>
                <div className="card-city__forecast">
                    <div className="card-city__forecast__temperature">
                        {current.temp_f} °F
                        <small>Temperature</small>
                    </div>
                    <div className="card-city__forecast__real-feel">
                        {current.feelslike_f} °F
                        <small>Real feel</small>
                    </div>
                    <div className="card-city__forecast__humidity">
                        %{current.humidity}
                        <small>Humidity</small>
                    </div>
                </div>
            </div>
            <div className="card-city__body">
                <h3 className="card-city__name">{location.name}</h3>
                <span className="card-city__country">{location.country} - {location.region}</span>
            </div>
            <IconButton color="primary" onClick={() => handleOpenCheckers(location)}>
                <VisibilityRoundedIcon />
            </IconButton >
        </div>
    );
});

export { CardCityWithForecast }