import React from 'react';
import CourseForm from './CourseForm';
import { Button, Modal } from 'semantic-ui-react';

class EditCourseModal extends React.Component {
  state = { modalOpen: false };

  toggleModal = (e) => {
    const { modalOpen } = this.state
    this.setState({ modalOpen: !modalOpen })
  }

  render(){
    const { course } = this.props;
    const { modalOpen } = this.state;
    return(
      <Modal
        open={ modalOpen }
        onClose={() => this.toggleModal()}
        trigger={
          <Button basic color='blue' onClick={() => this.toggleModal() }>Edit</Button>
        }
      >
        <CourseForm type='edit' course={course} toggleModal={this.toggleModal}/>
      </Modal>
    );
  }
}

export default EditCourseModal;