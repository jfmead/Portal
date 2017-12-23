import React, { Component } from 'react';
import { Container, Header, Icon, Grid, Table, Button } from 'semantic-ui-react';
import { Switch, Route, Link } from 'react-router-dom';
import CreateAssignment from './CreateAssignment';

class Assignment extends Component {


  render() {
    return(
      <div> 
        This is the Assignment Component (Landing Page).
        <Link to={'api/assignments'}>Create New Assignment</Link>
      </div>
      
    )
  }

  render() {
    return (
      <Container>
        <Header as="h1" textAlign='center' style={styles.lecture_notes}>All Assignments</Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={14}>
            </Grid.Column>
            <Grid.Column width={2}>
              <Link to={'assignment/create'}>
                <Button icon labelPosition='left'>
                  <Icon name='add' />
                  Assignment
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
                    <Table.HeaderCell width={4}>Created By</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>First Assignment</Table.Cell>
                    <Table.Cell>December 21, 2017</Table.Cell>
                    <Table.Cell>Jace P. Gold</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const styles = {
  lecture_notes: {
    paddingTop: '2%',
  }
}

export default Assignment;