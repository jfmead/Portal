import React from 'react';
import PortalLogo from '../../assets/images/portal-logo-med-02.png';
import { connect } from 'react-redux';
import { getCoursesByStudent } from '../../actions/courses';
import { Link, withRouter } from 'react-router-dom';
import {
  Dropdown,
  Image,
  Menu,
} from 'semantic-ui-react';
import UserAccount from './UserAccount';


class NavBar extends React.Component {
  state = { activeItem: 'Course Home' };

  componentDidMount = () => {
    const { dispatch, user: { id } } = this.props;
    if(id)
    dispatch(getCoursesByStudent(id))
  }

  renderCourseSections = () => {
    const { userCourses } = this.props;
    return userCourses.map( course =>
      <Dropdown.Item
        key={course.id}
        as={Link}
        to={`/courses/${course.id}`}
        style={styles.navSecondaryText}
        name={course.course_type}
        text={course.course_type}
        onClick={this.handleItemClick}
      />
    )
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  rightNavs = () => {
    const { user: { id, is_admin } } = this.props;

    if (id) {
      if (is_admin) {
        return(
          <Menu.Menu style={styles.navbarPrimary} position='right'>
            <Menu.Item
              as={Link}
              to='/courses'
              style={styles.navText}
              name="Courses"
              active={this.state.activeItem === 'Courses'}
              onClick={this.handleItemClick}
            />
            <Menu.Item style={styles.menuStyle}>
              <UserAccount />
            </Menu.Item>
          </Menu.Menu>
        );
      }

      return(
        <Menu.Menu style={styles.navbarPrimary} position='right'>
           <Dropdown item text='My Courses' style={styles.navText}>
            <Dropdown.Menu style={styles.dropdown}>
              { this.renderCourseSections() }
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item style={styles.menuStyle}>
            <UserAccount />
          </Menu.Item>

        </Menu.Menu>
      )
    }

    return (
      <Menu.Menu style={styles.navbarPrimary} position='right'>
        <Menu.Item
          as={Link}
          to='/login'
          style={styles.navText}
          name="Login"
          active={this.state.activeItem === 'Login'}
          onClick={this.handleItemClick}
        />
      </Menu.Menu>
    );
  }

  render() {
    return (
      <div style={styles.navbarWrap}>
        <Menu style={styles.navbarPrimary} pointing secondary>
          <Menu.Item
            as={Link}
            to='/'
            style={styles.navText}
            name="Home"
            active={this.state.activeItem === 'Home'}
            onClick={this.handleItemClick}
          >
            <Image src={PortalLogo} height='55px' style={styles.portalLogo} />
          </Menu.Item>
          { this.rightNavs() }
        </Menu>
      </div>
    );
  }
}

const styles = {
  navbarWrap: {
    position: 'fixed',
    width: '100%',
    zIndex: '10',
  },
  dropdown: {
    // backgroundColor: '#DDD',
    width: '21vw',
    overflow: 'auto',
  },
  navText: {
    color: '#fff',
    paddingBottom: '1.178rem',
    border: 'none',
  },
  navbarPrimary: {
    background: 'linear-gradient(#9575CD, #614d7b)',
    border: 'none',
  },
  menuStyle: {
    paddingBottom: '0px',
  },
  portalLogo: {
    padding: '5px 15px 7px',
  }
}

const mapStateToProps = state => {
  return { user: state.user, userCourses: state.userCourses };
};

export default withRouter(connect(mapStateToProps)(NavBar));
