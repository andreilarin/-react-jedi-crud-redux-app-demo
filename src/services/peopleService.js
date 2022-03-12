import {nanoid} from "nanoid";

export const peopleColumns = [
    'name',
    'height',
    'mass',
    'gender',
    'birth_year',
]

export const getPeople = async () => {
    const peopleResponse = await (await fetch('https://swapi.dev/api/people')).json();

    return peopleResponse.results.map(({name, height, mass, gender, birth_year}) => ({
        name,
        height,
        mass,
        gender,
        birth_year,
        beloved: false,
        id: nanoid()
    }))
}
