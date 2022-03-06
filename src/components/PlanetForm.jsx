import React, {useEffect, useState} from 'react';
import Input from "./common/Input";
import Button from './common/Button';
import {nanoid} from "nanoid";
import { useSelector, useDispatch } from 'react-redux';
import { getAllPlanets } from '../store/selectors/planets';
import { setPlanets } from '../store/actions/planets';


import {planetsColumns} from "../services/planetsService";

const initialPlanetsData = planetsColumns.reduce((columns, columnName) => {
    columns[columnName] = '';
    return columns;
}, {})

const PlanetForm = ({history, match}) => {
    const [formErrors, setFormErrors] = useState({});

    const dispatch = useDispatch();
    const planets = useSelector(state => getAllPlanets(state));

    const [planetData, setPlanetData] = useState({...initialPlanetsData});
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const planetId = match.params.id;
        if (planetId === "new") return;
        const existingPlanetData = planets.find(planet => planet.id === planetId)
        setPlanetData(existingPlanetData)
        setEditMode(true);
    }, [])

    const validate = (data) => { // super simple validation
        let errors = {};
        Object.entries(data).map(([propKey, propVal]) => {
            if (!propVal && !propKey.includes('beloved')) {
                errors = {...errors, [propKey]: 'Field should not be empty'};
            }
        })
        setFormErrors(errors);
        return errors
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const errors = validate(planetData);

        if (Object.keys(errors).length) {
            return;
        }

        if (editMode) {
            const newPlanetList = planets.map(planet => planet.id === planetData.id ? planetData : planet);
            dispatch(setPlanets(newPlanetList))
        } else {
            planets.push({...planetData, beloved: false, id: nanoid()});
            dispatch(setPlanets(planets));
        }
        history.push('/planets')
    }

    const handleChange = (event) => {
        const {currentTarget: input} = event;
        const data = {...planetData};
        const errors = {...formErrors};
        if (errors[input.name]) {
            delete errors[input.name];
        }

        data[input.name] = input.value;
        setPlanetData(data);
        setFormErrors(errors)
    }

    return (
        <form>
            {planetsColumns.map(planetColName => (
                <Input
                    key={planetColName}
                    name={planetColName}
                    label={planetColName[0].toUpperCase() + planetColName.slice(1)}
                    value={planetData[planetColName]}
                    type={planetColName === 'beloved' ? 'checkbox' : 'input'}
                    error={formErrors[planetColName]}
                    onChange={event => handleChange(event)}
                />
            ))}
            <Button
                onClick={event => onSubmit(event)}
                label="Save"
                disabled={Object.keys(formErrors).length}
                classes="btn btn-dark"
            />
        </form>
    );
};

export default PlanetForm;
