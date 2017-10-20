import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import flash from './flash';
import avatars from './avatars';
import courses from './courses';
import userCourses from './userCourses';
import sections from './sections';
import groups from './groups';
import courseId from './courseId';
import sectionId from './sectionId';
import currentDate from './currentDate';

const rootReducer = combineReducers({
  user,
  users,
  flash,
  avatars,
  courses,
  userCourses,
  sections,
  groups,
  courseId,
  sectionId,
  currentDate,
});

export default rootReducer;
