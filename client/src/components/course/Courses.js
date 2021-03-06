import React from 'react';
import CourseCard from './CourseCard';
import CourseForm from './CourseForm';
import { connect } from 'react-redux';
import { getCourses } from '../../actions/courses';
import {
  Container,
  Menu,
  Card,
} from 'semantic-ui-react';
import { HomeBody, HomeWrapper } from '../../styles/home-images.js';


class Courses extends React.Component {
  state = {
    courses: [],
    isAdding: false,
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getCourses());
  }

  renderCourses = () => {
    const { courses } = this.props;
    if(courses) {
      return courses.map( course =>
        <CourseCard key={ course.id } course={ course } />
      )
    }
  }

  render() {
    const { isAdding } = this.state;
    return(
      <div>
        <Menu>
          <Menu.Item
            disabled={ isAdding }
            name='Add Course'
            active={ 'nope' === 'editorials' }
            onClick={ () => this.setState({ isAdding: true }) }
          />
          { isAdding &&
            <Menu.Item
              name='Cancel Create Course'
              active={'nope' === 'editorials'}
              onClick={ () => this.setState({ isAdding: false }) }
            />
          }
        </Menu>
        { isAdding && <CourseForm cancelAdding={ () => this.setState({ isAdding: false }) } /> }
        <HomeBody style={{paddingTop: '80px'}}>
          <HomeWrapper style={ styles.scrollable_section }>
            <Container>
              <Card.Group stackable columns='3'>
                { this.renderCourses() }
              </Card.Group>
            </Container>
          </HomeWrapper>
        </HomeBody>
      </div>
    )
  }
}

const styles = {
  scrollable_section: {
    maxHeight: '100vh',
    overflowY: 'scroll',
    padding: '2%',
  },
}

const mapStateToProps = (state) => {
  return { courses: state.courses }
}

export default connect(mapStateToProps)(Courses);
