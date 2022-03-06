export const SET_PLANETS = 'SET_PLANETS'
export const DELETE_PLANET = 'DELETE_PLANET'
export const CHANGE_BELOVED_STATUS = 'CHANGE_BELOVED_STATUS'

export function setPlanets(planet) {
    return { type: SET_PLANETS, planet };
}

export function deletePlanet(id) {
    return { type: DELETE_PLANET, id };
}

export function changeBelovedStatus(id) {
    return { type: CHANGE_BELOVED_STATUS, id};
}