import { toJson } from 'unsplash-js/native'
import { unsplash } from '../services/unsplash'

// Action Types

export const ADD_USERS = 'ADD_USERS'
export const SET_USERS = 'SET_USERS'
export const SET_PHOTOS = 'SET_PHOTOS'

// Action Creators

export const getUsers = (keyword) => {
  return (dispatch, getState) => {
    unsplash.search.users(keyword, 1)
    .then(toJson)
    .then(json => {
      dispatch({
        type: SET_USERS,
        users: json.results
      })
    });
  };
}

export const getUserPhotos = (username) => {
  return (dispatch, getState) => {
    unsplash.users.photos(username)
    .then(toJson)
    .then(json => {
      // console.log('user photo: ', json[0]);
      dispatch({
        type: SET_PHOTOS,
        photos: json
      })
    });
  }
}

// reducer

const initialState = {
  users: [],
  userPhotos: []
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users
      };

    case ADD_USERS:
      return {
        ...state,
        users: [
          ...state.users,
          action.users
        ]
      };
    
    case SET_PHOTOS:
      return {
        ...state,
        userPhotos: action.photos
      }

    default:
      return state
  }
}

export default rootReducer
