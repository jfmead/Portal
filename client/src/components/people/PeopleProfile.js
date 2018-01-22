import React from 'react';
import BadgeForm from './BadgeForm';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../../actions/userId';
import { setHeaders } from '../../actions/headers';
import { setFlash } from '../../actions/flash';
import {
  Card,
  Divider,
  Grid,
  Header,
  Segment,
  Image,
  Button,
  Icon,
  Dropdown,
  Form,
} from 'semantic-ui-react';
import Badge from './Badge';
import NoteForm from './noteForm';
import NoteList from './NoteList';
import { isStudent } from '../../utils/permissions'

class PeopleProfile extends React.Component {
  state = { user: {}, showForm: false, badges: [], options: [] }

  componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props
    axios.get(`/api/users/${id}/user_badges`)
      .then( res => {
        this.setState({ badges: res.data })
        dispatch(setHeaders(res.headers))
      })
      .catch( err => {
        dispatch(setFlash('Failed to get badges.', 'red'))
      })
    this.props.dispatch(getUser(id))
  }

  // toggleForm = () => {
  //   const {showForm} = this.state
  //   this.setState({showForm: !showForm})
  // }

  toggleForm = () => this.setState({showForm: !this.state.showForm});

  displayBadges = () => {
    const { badges } = this.state
    return badges.map( badge => {
      return(
        <Badge
          key={badge.user_badge_id}
          badge={badge.badge}
          badgeId={badge.user_badge_id}
          deleteBadge={this.deleteBadge}
        />
      )
    })
  }

  handleChange = (e, { value }) => {
    this.setState({ options: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { options } = this.state
    const { dispatch, match: { params: { id } } } = this.props
    let newBadges = this.state.badges
    options.forEach( option => {
      axios.post(`/api/users/${id}/user_badges`, { badge_id: badges[option] })
        .then( res => {
          newBadges.push(res.data)
          dispatch(setHeaders(res.headers))
        })
        .then( () => {
          this.setState({ options: [], badges: newBadges })
        })
        .catch( err => {
          dispatch(setFlash('Failed to add badge.', 'red'))
        })
    })
  }


  deleteBadge = (badgeId) => {
    const { dispatch, match: { params: { id } } } = this.props
    const newBadges = this.state.badges.filter( badge => badgeId !== badge.user_badge_id )
    axios.delete(`/api/users/${id}/user_badges/${badgeId}`)
      .then( res => {
        this.setState({ badges: newBadges })
        dispatch(setHeaders(res.headers))
      })
      .catch( err => {
        dispatch(setFlash('Failed to delete badge', 'red'))
      })
  }

  dropdownOptions = () => {
    return badgeOptions.filter( badgeOption => {
      let hasBadge = false
      this.state.badges.forEach( badge => {
        if (badgeOption.value === badge.badge.icon)
          hasBadge = true
      })
      return !hasBadge
    })
  }
  whoCanSeeNotes = () => {
    const { current_user, permission, match: { params: { id } } } = this.props
    if(!isStudent(permission) || current_user.id === parseInt(id))
      return <NoteList userId={id}/>
  }

  render () {
    const { user, match: { params: { id } }, permission } = this.props
    const { options } = this.state
    const fullName = `${user.first_name} ${user.last_name}`
    return (
      <Segment basic>
        <Grid className='container'>
          <Grid.Row>
            <Grid.Column width={5}>
              <Image
                circular='true'
                bordered
                src={user.image}
              />
            </Grid.Column>
            <Grid.Column width={11}>
              <Header as='h2'>{fullName}</Header>
              <Header as='h3'>{user.email}</Header>
              <Divider />
              <Form onSubmit={this.handleSubmit}>
                <Dropdown
                  multiple
                  selection
                  placeholder='Add Badges'
                  options={this.dropdownOptions()}
                  onChange={this.handleChange}
                  value={options}
                />
                <Button basic type='submit' onClick={this.addBadge}>
                  <Icon name='add' />
                </Button>
              </Form>
              {this.state.showForm ? <BadgeForm /> : null }
              {/* do some sort of conditional rendering */}
              {/* terneries are nice for this */}
              <Grid>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Segment basic>
                      <Card.Group itemsPerRow={5}>
                        { this.displayBadges() }
                      </Card.Group>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as='h3'>Bio</Header>
              <Divider />
              {user.bio}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              {!isStudent(permission) && <NoteForm userId={id}/>}
            </Grid.Column>
          </Grid.Row>
          { this.whoCanSeeNotes() }
        </Grid>
      </Segment>
    )
  }
}

const badgeOptions = [
  { text: 'Leadership', value: 'leader' },
  { text: 'Team Player', value: 'teamwork' },
  { text: 'Coding Aptitude', value: 'coder' },
  { text: '95% Attendance', value: 'attendance' },
  { text: '100% Homework', value: 'homework' },
]

const badges = {
  'teamwork': 1,
  'leader': 2,
  'coder': 3,
  'attendance': 4,
  'homework': 5,
}

const mapStateToProps = (state) => {
  return {
    user: state.userId,
    current_user: state.user,
    permission: state.permissions,
   }
}

export default connect(mapStateToProps)(PeopleProfile);
