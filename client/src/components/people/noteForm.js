import React from 'react';
import { connect } from 'react-redux';
import {
  Message,
  Divider,
  Button,
  Form,
  Segment,
  Image,
  Card,
} from 'semantic-ui-react';

import { addNote } from '../../actions/notes';
import { PageSubTitle } from '../../styles/styledComponents';

class NoteForm extends React.Component {
  state = { title: '', content: '', visible: false, noteTime:false }

  handleSubmit = (e) => {
    const { userId } = this.props
    e.preventDefault();
    let { title, content, visible } = this.state
    let note = { title, content, visible }
    this.setState({ title: '', content: '', visible: false, noteTime: false })
    this.props.dispatch(addNote(note, userId))

  }

  handleChecked = (e) => {
    this.setState({ visible: !this.state.visible })
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  noteEdit = () => {
    const { user } = this.props
    const { title, content } = this.state
    return(
      // <Message noteid={note.id} />
      <Segment style={{borderRadius: '0px', backgroundColor: 'white', margin: '0px'}} onSubmit={this.handleSubmit}>
        <Card.Content>
          <Button
            basic
            onClick={ () => this.setState({ noteTime: !this.state.noteTime })}
            floated='right'
          >
            Cancel
          </Button>
          <Button basic floated='right' type='submit'>
            Submit
          </Button>
          <Image floated='left' size='mini' spaced='left' verticalAlign='top' bordered src={user.image} /> { }
            <PageSubTitle>
             {`${user.first_name} ${user.last_name}`}
            </PageSubTitle>
          <Card.Header as='h3'>
            <Form.Input
              autoFocus
              style={{paddingBottom: '2%'}}
              name='title'
              value={title}
              width={7}
              placeholder='Note Title'
              required
              onChange={this.handleChange}
            />
            <Form.Field
              label='Visible to student?'
              control='input'
              type='checkbox'
              onChange={this.handleChecked}
            />
          </Card.Header>
          <Divider fitted />
          <Card.Description>
            <Form.TextArea
              style={{ minHeight: 75, width: '100%' }}
              name='content'
              value={content}
              placeholder='Leave a note.'
              required
              onChange={this.handleChange}
            />
          </Card.Description>
        </Card.Content>
      </Segment>
    )
  }

  render () {
    const { noteTime } = this.state

    return(
      <Segment basic>
        { noteTime ? this.noteEdit()
          :
          <Button basic onClick={() => this.setState({noteTime: !noteTime})}>Add A Note</Button>
        }
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(NoteForm);
