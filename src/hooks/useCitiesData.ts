/* eslint-disable react-hooks/exhaustive-deps */
import { citiesActions } from "store/cities/cities";
import { IChecker, ICity, ICityWithForecast } from "interfaces"
import { useAppDispatch, useAppSelector } from "store/hooks";
import { weatherService } from "services/weather.service";
import { useState } from "react";
import { generalParamsActions } from "store/general/general-params";

const useCitiesData = () => {

    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();
    const { favourites } = useAppSelector(state => state.cities);

    const getFavourites = () => favourites;
    const setFavourites = (newFavourites: ICityWithForecast[]) => dispatch(citiesActions.setFavourites(newFavourites));

    const addFavourite = async (city: ICity) => {
        const newFavourites: ICityWithForecast[] = [...favourites];
        const cityWithForecast: ICityWithForecast = await weatherService.getByName(city.name);
        
        newFavourites.unshift(cityWithForecast);
        setFavourites(newFavourites);
    }

    const removeFavourite = (city: ICity) => {
        const newFavourites: ICityWithForecast[] = [...favourites];
        const index = newFavourites.findIndex((elem: ICityWithForecast) => elem.location.name === city.name);
        if (index > -1) {
            newFavourites.splice(index, 1);
        }

        setFavourites(newFavourites);
    }

    const removeAllFavourites = () => setFavourites([]);

    const addChecker = (checkers: IChecker, city: ICity | null) => {
        if (!city) return
        let newFavourites: ICityWithForecast[] = [...favourites];
        newFavourites = newFavourites.map((elem: ICityWithForecast) => {
            if (elem.location.name === city.name) {
                return ({
                    ...elem,
                    location: {
                        ...elem.location,
                        checkers
                    }
                })
            }
            else return elem
        });
        setFavourites(newFavourites);
    }

    const checkAlerts = (cities: ICityWithForecast[]) => {
        cities.forEach((city: ICityWithForecast) => {
            if (city.location.checkers) {
                if (city.current.temp_f > +city.location.checkers.max_temp) {
                    dispatch(generalParamsActions.setAlertMessage({status: "error", message: `${city.location.name} is hotter than ${city.location.checkers.max_temp} °F`}))
                }
            }
        })
    }

    const refreshForecast = async () => {
        const favouritesCopy: ICityWithForecast[] = [...favourites];
        let newFavourites: ICityWithForecast[];
        removeAllFavourites();
        setLoading(true);

        newFavourites = await Promise.all(favouritesCopy.map(async (favourite: ICityWithForecast) => {
            let cityWithForecast: ICityWithForecast = await weatherService.getByName(favourite.location.name);
            cityWithForecast.location.checkers = favourite.location.checkers;

            return cityWithForecast;
        }));
        
        setLoading(false);
        setFavourites(newFavourites);
        checkAlerts(newFavourites);
    }

    return {
        getFavourites,
        addFavourite,
        removeFavourite,
        addChecker,
        refreshForecast,
        loading
    }

}

export { useCitiesData }