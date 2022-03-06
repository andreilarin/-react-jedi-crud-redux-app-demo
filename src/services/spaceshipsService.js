import {nanoid} from "nanoid";

export const starshipsColumns = [
    'name',
    'model',
    'manufacturer',
    'cost_in_credits',
    'length',
]

export const getStarships = async () => {
    const starshipsResponse = await (await fetch('https://swapi.dev/api/starships')).json();

    return starshipsResponse.results.map(({name, model, manufacturer, cost_in_credits, length}) => ({
        name,
        model,
        manufacturer,
        cost_in_credits,
        length,
        beloved: false,
        id: nanoid()
    }))
}