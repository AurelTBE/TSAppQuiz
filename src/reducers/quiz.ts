import { AnyAction } from 'redux';
import { IQuizListItem } from './../models/index';
import { TYPES } from './../actions/action-types';

export interface IQuizInitialState {
    quizListItem: IQuizListItem[]
    currentQuizItemIndex: number,
    countCorrectAnswers: number
}
const quizInitialState: IQuizInitialState = {
    quizListItem: [],
    currentQuizItemIndex: 0,
    countCorrectAnswers: 0
}

export const QuizReducer = (state = quizInitialState, action: AnyAction): IQuizInitialState => {
    switch(action.type){
        case TYPES.getQuizListItems:
            return {
                ...state,
                quizListItem: action.payload
            }
        case TYPES.incrementScore:
            return {
                ...state,
                countCorrectAnswers: state.countCorrectAnswers + 1
            }
        case TYPES.setNextQuestion:
            return {
                ...state,
                currentQuizItemIndex: state.currentQuizItemIndex + 1
            }
        case TYPES.restart:
            return {
                ...state,
                countCorrectAnswers: 0,
                currentQuizItemIndex: 0
            }
        default:
            return state
    }
}