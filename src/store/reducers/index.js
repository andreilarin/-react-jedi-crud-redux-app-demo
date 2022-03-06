import { combineReducers } from 'redux'
import people from './people'
import planets from './planets'
import starships from './starships'


export default combineReducers({
    people, planets, starships
  })