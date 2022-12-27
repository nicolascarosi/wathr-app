/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import { ICity } from "interfaces";
import { useEffect, useState } from "react";
import { useAppSelector } from "store/hooks";

interface ICardCity extends ICity {
    addFavourite: () => void;
    removeFavourite: () => void;
}

const CardCity = ({id, name, country, region, addFavourite, removeFavourite}: ICardCity) => {

    const { favourites } = useAppSelector(state => state.cities);
    
    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {
        setIsFavourite(favourites.some((elem: ICity) => elem.id === id));
    }, [])

    const toggleFavourite = () => {
        if (!isFavourite) addFavourite();
        else removeFavourite();

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
}

export { CardCity }