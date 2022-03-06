import React, {useEffect} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";

import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import PeoplePage from "./components/pages/PeoplePage";
import PlanetsPage from "./components/pages/PlanetsPage";
import StarshipsPage from "./components/pages/StarshipsPage";
import PeopleForm from "./components/PeopleForm";
import PlanetForm from "./components/PlanetForm";
import StarshipForm from "./components/StarshipForm";
import Navbar from "./components/Navbar";
import NotFound from "./components/common/NotFound";

import {getPeople} from "./services/peopleService";
import { setPeople } from './store/actions/people';
import { useDispatch } from 'react-redux';
import {getPlanets} from "./services/planetsService";
import {setPlanets} from "./store/actions/planets";
import {setStarship} from "./store/actions/starships";
import {getStarships} from "./services/spaceshipsService";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            const peopleResponse = await getPeople()
            dispatch(setPeople(peopleResponse));

            const planetsResponse = await getPlanets()
            dispatch(setPlanets(planetsResponse));

            const starshipsResponse = await getStarships()
            dispatch(setStarship(starshipsResponse));
        }

        fetchData()
    }, [])

    return (
        <>
            <Navbar/>
            <main className="container">
                <Switch>
                    <Route path="/people/:id" render={props => <PeopleForm {...props}  />}/>
                    <Route path="/people" render={props => <PeoplePage {...props} />} />
                    <Route path="/planets/:id" render={props => <PlanetForm {...props} />} />
                    <Route path="/planets" render={props => <PlanetsPage {...props} />} />
                    <Route path="/starships/:id" render={props => <StarshipForm {...props} />} />
                    <Route path="/starships" render={props => <StarshipsPage {...props} />} />
                    <Route path="/not-found" component={NotFound}/>
                    <Redirect exact from="/" to="/people" component={PeoplePage}/>
                    <Redirect to="/not-found"/>
                </Switch>
            </main>
        </>

    );
}

export default App;
