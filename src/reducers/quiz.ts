import { TYPES } from './../actions/action-types';
export const QuizReducer = (state = {}, action: any): any => {
    switch(action.type){
        case TYPES.getQuizListItems:
            return {
                ...state,
                quizListItem: action.payload
            }
        default:
            return state
    }
}