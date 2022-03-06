import React, {useEffect, useState} from 'react';
import Input from "./common/Input";
import Button from './common/Button';
import {nanoid} from "nanoid";
import { useSelector, useDispatch } from 'react-redux';
import { getAllStarships } from '../store/selectors/starships';
import { setStarship } from '../store/actions/starships';
import {starshipsColumns} from "../services/spaceshipsService";

const initialStarshipsData = starshipsColumns.reduce((columns, columnName) => {
    columns[columnName] = '';
    return columns;
}, {})

const StarshipForm = ({history, match}) => {
    const [formErrors, setFormErrors] = useState({});

    const dispatch = useDispatch();
    const starships = useSelector(state => getAllStarships(state));

    const [starshipsData, setStarshipsData] = useState({...initialStarshipsData});
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const starshipId = match.params.id;
        if (starshipId === "new") return;
        const existingStarshipsData = starships.find(starship => starship.id === starshipId)
        setStarshipsData(existingStarshipsData)
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
        const errors = validate(starshipsData);

        if (Object.keys(errors).length) {
            return;
        }

        if (editMode) {
            const newStarshipsList = starships.map(starship => starship.id === starshipsData.id ? starshipsData : starship);
            dispatch(setStarship(newStarshipsList))
        } else {
            starships.push({...starshipsData, beloved: false, id: nanoid()});
            dispatch(setStarship(starships));
        }
        history.push('/starships')
    }

    const handleChange = (event) => {
        const {currentTarget: input} = event;
        const data = {...starshipsData};
        const errors = {...formErrors};
        if (errors[input.name]) {
            delete errors[input.name];
        }

        data[input.name] = input.value;
        setStarshipsData(data);
        setFormErrors(errors)
    }

    return (
        <form>
            {starshipsColumns.map(starshipColName => (
                <Input
                    key={starshipColName}
                    name={starshipColName}
                    label={starshipColName[0].toUpperCase() + starshipColName.slice(1)}
                    value={starshipsData[starshipColName]}
                    type={starshipColName === 'beloved' ? 'checkbox' : 'input'}
                    error={formErrors[starshipColName]}
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

export default StarshipForm;
