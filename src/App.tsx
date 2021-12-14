import React, { Component } from "react";
import { Container, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { StyledButtonTrue, StyledButtonFalse } from "./style";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { IStore } from "./reducers";
import { getQuizListItem, giveAnswer } from "./actions/quiz"
import { IQuizList, IQuizListItem } from "./models";
import { getCurrentQuizListItem } from "./selectors/quiz";

interface OwnProps {

}

interface StateProps {
  currentQuizListItem?: IQuizListItem,
  currentQuizListItemIndex: number,
  quizListLength: number,
  score: number
}

interface DispatchProps {
  getQuizListItem: typeof getQuizListItem,
  giveAnswer: typeof giveAnswer
}

type Props = OwnProps & StateProps & DispatchProps

export class App extends Component<Props> {
  componentDidMount(){
    this.props.getQuizListItem(10, "easy")
  }
  private renderHeader = () => {
    return (<Grid container direction="row" justify="space-between" alignItems="flex-start">
      <Box mt={10} fontWeight="fontWeightBold" fontSize={40} >
        <div style={{ color: "#e55fff" }}>Easy</div>
        <div style={{ color: "#2858fb" }} >Quizy</div>
      </Box>
      <Box mt={10} fontSize={20} className="txt"> Score : {this.props.score} / {this.props.quizListLength}</Box>
    </Grid>)
  }

  private renderQuestionInfo = () => {
    const { quizListLength, currentQuizListItemIndex, currentQuizListItem } = this.props
    return (<Grid container direction="column" alignItems="center" justify="center" style={{ minHeight: '40vh' }}>
      <div className="txt question_number">Question N° {currentQuizListItemIndex + 1} / {quizListLength} </div>
      <div className="txt question_number"> Category {currentQuizListItem!.category} </div>
      <div className="txt" dangerouslySetInnerHTML={{__html: currentQuizListItem!.question}} />
    </Grid>)
  }

  private answerQuestion = (answer: "True"|"False") => () => {
    const isCorrectAnswer = answer === this.props.currentQuizListItem!.correct_answer
    const isLastQuestion = this.props.currentQuizListItemIndex === this.props.quizListLength - 1
    this.props.giveAnswer(isCorrectAnswer, isLastQuestion)
  }

  private renderButton = () => {
    return (
      <Grid container direction="row" alignItems="center" justify="space-evenly" >
        <StyledButtonTrue onClick={this.answerQuestion("True")}>TRUE</StyledButtonTrue>
        <StyledButtonFalse onClick={this.answerQuestion("False")}>FALSE</StyledButtonFalse>
      </Grid>
    )
  }

  render() {
    return (
      <Container maxWidth="lg" >
        {this.renderHeader()}
        {this.props.currentQuizListItem && this.renderQuestionInfo()}
        {this.renderButton()}
      </Container >
    );
  }
}

const mapStateToProps = (state: IStore): StateProps => {
  return {
    currentQuizListItem: getCurrentQuizListItem(state),
    currentQuizListItemIndex: state.quiz.currentQuizItemIndex,
    quizListLength: state.quiz.quizListItem.length,
    score: state.quiz.score
  }
}

const mapDispatchToProps: any = {
  getQuizListItem,
  giveAnswer
} 

export default connect<StateProps, DispatchProps, OwnProps, IStore>(mapStateToProps, mapDispatchToProps)(App)

