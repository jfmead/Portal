import React, { Component } from 'react'
import { Form, Segment, Button, Header } from 'semantic-ui-react'
import { addCourse, updateCourse } from '../actions/courses'
import { connect } from 'react-redux';


class CourseForm extends Component {
  state = { course_type: '', term: '', year: ''  }

  componentWillMount(){
    if(this.props.type === 'edit'){
      const { course_type, term, year } = this.props.course;
      this.setState({course_type, term, year});
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { course_type, term, year } = this.state;
    const { type, course, handleClose } = this.props;
    if(type === 'edit'){
      this.props.dispatch(updateCourse(this.state, course.id));
      handleClose();
    }else{
      this.props.dispatch(addCourse(this.state));
      this.props.cancelAdding();
    }
  }

  handleChange = (e) => {
    let { id, value } = e.target;
    this.setState({ [id]: value });
  }

  render() {
    const { course_type, term, year } = this.state;
    const { type } = this.props;
    return(
      <Segment>
        <Header textAlign='center'>{type === 'edit' ? 'Edit Course' : 'Create Course'}</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              required
              label= 'Course Name'
              id='course_type'
              placeholder='Course Name'
              width={6}
              value={course_type}
              onChange={this.handleChange}
            />
            <Form.Input
              required
              label='Term'
              id='term'
              placeholder='Term'
              width={4}
              value={term}
              onChange={this.handleChange}
            />
            <Form.Input
              required
              label='Year'
              id='year'
              placeholder='Year'
              width={4}
              value={year}
              onChange={this.handleChange}
              />
         </Form.Group>
         <Button
           color='purple'
           basic
           >Submit
         </Button>
        </Form>
      </Segment>
      )}
    }

  const mapStateToProps = ( state )  => {
    return { courses: state.courses }
  }

  export default connect(mapStateToProps)(CourseForm);
