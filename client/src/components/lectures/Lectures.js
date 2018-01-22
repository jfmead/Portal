import React, { Component } from 'react';
import { Segment, Header, Table, Button, Icon, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

class Lectures extends Component {
  state = { lectures: [] }

  componentDidMount() {
    axios.get('/api/lectures')
      .then(res => {
        this.setState({ lectures: res.data })
      })
      .catch(err => {
        console.log(err);
      });
  }

  displayLectures = () => {
    const { id } = this.props.match.params
    return this.state.lectures.map(lecture => {
      let date = moment(lecture.created_at).format('MMMM D, YYYY')
      return (
        <Table.Row key={lecture.id}>
          <Table.Cell>
            <Link to={`/courses/${id}/lectures/${lecture.id}`}>{lecture.title}</Link>
          </Table.Cell>
          <Table.Cell>{date}</Table.Cell>
        </Table.Row>
      )
    })
  }

  render() {
    const { id } = this.props.match.params
    return (
      <Segment basic>
        <Header as='h2'style={styles.pageTitle}>Lectures</Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={14}>
            </Grid.Column>
            <Grid.Column width={2}>
              <Link to={`/courses/${id}/lectures/create`}>
                <Button
                  basic
                  icon
                  labelPosition='left'>
                  <Icon name='add' />
                  Lecture
                </Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Table singleLine>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width={6}>Name</Table.HeaderCell>
                    <Table.HeaderCell width={4}>Created At</Table.HeaderCell>
                    <Table.HeaderCell width={4}>Course</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.displayLectures()}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

const styles = {
  pageTitle: {
    paddingTop: '2%',
  },
}

export default Lectures;
