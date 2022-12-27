import { Button, Grid } from "@mui/material";
import { CardContainer, InputSearch, LoginButton, LogoutButton, CardCityWithForecast, ModalCheckers, CardCity } from "components";
import { useCitiesData } from "hooks";
import { ICity, ICityWithForecast } from "interfaces";
import { useState } from "react";
import { weatherService } from "services/weather.service";
import { useAppSelector } from "store/hooks";

const Home = () => {

    const [cities, setCities] = useState([]);
    const [openCheckers, setOpenCheckers] = useState(false);
    const [selectedCity, setSelectedCity] = useState<ICity | null>(null);

    const { full_name } = useAppSelector(state => state.user);

    const { getFavourites, addFavourite, removeFavourite, refreshForecast, loading } = useCitiesData();

    const favourites = getFavourites();

    const getCities = async (query: string) => {
        const result: any = await weatherService.get(query);
        setCities(result);
    };

    const handleClickSearch = (query: string) => {
        getCities(query);
    }

    const handleOpenCheckers = (city: ICity) => {
        setSelectedCity(city);
        setOpenCheckers(true);
    };

    const handleCloseCheckers = () => {
        setSelectedCity(null);
        setOpenCheckers(false);
    };
    
    return (
        <div className="page-home">
            <div className="container">
                {!full_name ? 
                    <LoginButton />
                :
                    <>
                        <div className="main-title">
                            <h1>Welcome back {full_name}!</h1>
                            <LogoutButton />
                        </div>
                        <Grid container spacing={2} p={'20px 0'}>
                            <Grid item xs={8}>
                                <InputSearch handleClickSearch={handleClickSearch}/>
                                <CardContainer title="Search results">
                                    {cities.length > 0 ?
                                        <>
                                            {cities.map((city: ICity) => (
                                                <CardCity key={`city-${city.id}`} {...city} addFavourite={() => addFavourite(city)} removeFavourite={() => removeFavourite(city)}/>
                                            ))}
                                        </>
                                    : 
                                        <span>No results</span>
                                    }
                                </CardContainer>
                            </Grid>
                            <Grid item xs={4}>
                                <CardContainer title="Favourites cities" loading={loading}>
                                    {favourites.map((city: ICityWithForecast) => (
                                        <CardCityWithForecast key={`favourite-${city.location.name}`} {...city} handleOpenCheckers={handleOpenCheckers}/>
                                    ))}
                                    {favourites.length > 0 ? 
                                        <Button variant="contained" fullWidth onClick={refreshForecast}>
                                            Refresh
                                        </Button>
                                    : null}
                                </CardContainer>
                            </Grid>
                        </Grid>
                        {openCheckers ? 
                            <ModalCheckers open={openCheckers} handleClose={handleCloseCheckers} city={selectedCity} /> 
                        : null}
                    </>
                }
            </div>
        </div>
    )
}

export { Home };