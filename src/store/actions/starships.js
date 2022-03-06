export const SET_STARSHIPS = 'SET_STARSHIPS'
export const DELETE_STARSHIP = 'DELETE_STARSHIP'
export const CHANGE_BELOVED_STATUS = 'CHANGE_BELOVED_STATUS'

export function setStarship(starship) {
    return { type: SET_STARSHIPS, starship };
}

export function deleteStarship(id) {
    return { type: DELETE_STARSHIP, id };
}

export function changeBelovedStatus(id) {
    return { type: CHANGE_BELOVED_STATUS, id};
}