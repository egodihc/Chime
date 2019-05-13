import { BLUE } from '../../utility/theme';
import { CHANGE_THEME } from '../constants';

const initialState = {
    theme: BLUE
}


export const reducer = (state = initialState, action) => {

    switch (action.type) {
        case CHANGE_THEME: {
            return {
                ...state,
                theme: action.payload
            }
        }
    }
}