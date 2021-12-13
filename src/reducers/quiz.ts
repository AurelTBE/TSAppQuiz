import { AnyAction } from 'redux';
import { IQuizListItem, Action } from './../models/index';
import { TYPES } from './../actions/action-types';

export interface IQuizInitialState {
    quizListItem: IQuizListItem[]
}
const quizInitialState: IQuizInitialState = {
    quizListItem: []
}
export const QuizReducer = (state = quizInitialState, action: AnyAction): IQuizInitialState => {
    switch(action.type){
        case TYPES.getQuizListItems:
            return {
                ...state,
                quizListItem: (action as Action<IQuizListItem[]>).payload
            }
        default:
            return state
    }
}