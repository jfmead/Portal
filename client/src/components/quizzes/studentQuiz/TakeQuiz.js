import React from 'react';
import { Segment, Header, List, Button, Grid, Sticky } from 'semantic-ui-react';
import { connect } from 'react-redux';
import EssayQuestion from './EssayQuestion';
import MultipleChoice from './MultipleChoice';
import MultipleAnswer from './MultipleAnswer';
import TrueFalse from './TrueFalse';
import { PageTitle } from '../../../styles/styledComponents';


class TakeQuiz extends React.Component {
  state = { ready: false }

  ready = () => {
    this.setState({ready: !this.state.ready})
  }

  handleContextRef = contextRef => this.setState({ contextRef })

  displayList = () => {
    const { questions } = this.props
    return questions.map((q, i) => (

        <List.Item key={q.id} >
        <a href={`#${q.id}`} >
          Question: {(i + 1) }
       </a>
        </List.Item>
    ))
  }

  displayQuestions = () => {
    const { questions } = this.props
    return questions.map( q => {
      if(q.multiple_choice) {
        if(q.true_false) {
          return (
            <Header as='a' id={q.id} key={q.id}>
              <TrueFalse key={q.id} question={q}/>
            </Header>
          )
        } else if(q.multiple_correct) {
          return (
            <Header as='a' id={q.id} key={q.id}>
              <MultipleAnswer key={q.id} id={q.id} question={q}/>
            </Header>
          )
        } else {
          return (
            <Header as='a' id={q.id} key={q.id}>
              <MultipleChoice key={q.id} id={q.id} question={q}/>
            </Header>
          )
        }
      } else {
        return (
          <Header as='a' id={q.id} key={q.id}>
            <EssayQuestion key={q.id} id={q.id} question={q}/>
          </Header>
         )
      }
    })
  }

  render() {
    const { quiz } = this.props
    if (!this.state.ready){
      return(
      <div>
        <Button basic onClick={ this.ready }>Click to Start Quiz</Button>
      </div>
      )
    } else {
      return(
        <Segment basic>
          <div ref={this.handleContextRef}>
          <Grid>
            <Grid.Column width={13}>
             <PageTitle>{quiz.title}</PageTitle>
              {this.displayQuestions()}
            </Grid.Column>
            <Grid.Column width={3}>
            <Sticky context={this.state.contextRef}>
             {this.displayList()}
             </Sticky>
            </Grid.Column>
          </Grid>
          <Button basic>Submit</Button>
          <Button basic>Save Quiz</Button>
          </div>
        </Segment>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    quiz: state.singleQuiz,
    questions: state.quizQuestions,
    responses: state.quizResponses
  }
}

export default connect(mapStateToProps)(TakeQuiz)
