/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import { useCitiesData } from "hooks";
import { ICity } from "interfaces";
import { memo, useEffect, useState } from "react";
import { useAppSelector } from "store/hooks";

const CardCity = memo(({id, name, country, region}: ICity) => {

    const { favourites } = useAppSelector(state => state.cities);

    const { addFavourite, removeFavourite } = useCitiesData();
    
    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {
        setIsFavourite(favourites.some((elem: ICity) => elem.id === id));
    }, [])

    const toggleFavourite = () => {
        let city: ICity = {
            id,
            name,
            country,
            region
        }
        if (!isFavourite) addFavourite(city);
        else removeFavourite(city);

        setIsFavourite(!isFavourite);
    };

    return (
        <div className="card-city">
            <div className="card-city__body">
                <h3 className="card-city__name">{name}</h3>
                <span className="card-city__country">{country} - {region}</span>
            </div>
            <div className="card-city__actions">
            {!isFavourite ?
                <Button variant="contained" fullWidth onClick={toggleFavourite}>
                    Add favourite
                </Button>
            :
                <Button variant="contained" color="error" fullWidth onClick={toggleFavourite}>
                    Remove favourite
                </Button>
            }
            </div>
        </div>
    );
});

export { CardCity }