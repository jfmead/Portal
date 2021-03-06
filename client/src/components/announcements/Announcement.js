import React from 'react';
import {PageTitle, BoldText } from '../../styles/styledComponents';
import AnnouncementForm from './AnnouncementForm';
import { connect } from 'react-redux';
import { Button, Segment } from 'semantic-ui-react';
import { deleteAnnouncement } from '../../actions/announcements';


class Announcement extends React.Component {
  state = { editing: false };

  toggleEdit = () => this.setState({editing: !this.state.editing});

  handleDelete = () => {
    const { announcement, course, dispatch } = this.props;
    if (window.confirm("Are You Sure?"))
      dispatch(deleteAnnouncement(course.id, announcement.id));
  }

  render() {
    const { announcement: { title, body } } = this.props;
    const { editing } = this.state;
    if(editing) {
      return <AnnouncementForm announcement={this.props.announcement} toggleEdit={this.toggleEdit} editing />
    } else {
      return(
        <Segment fluid>
          <PageTitle>{title}</PageTitle>
          <BoldText>{body}</BoldText>
          { this.props.user.is_admin &&
            <Segment basic>
              <Button basic onClick={this.toggleEdit}>Edit</Button>
              <Button basic onClick={this.handleDelete}>Delete</Button>
            </Segment>
          }
        </Segment>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    announcements: state.announcements,
    course: state.course,
    user: state.user,
  }
}

export default connect(mapStateToProps)(Announcement);