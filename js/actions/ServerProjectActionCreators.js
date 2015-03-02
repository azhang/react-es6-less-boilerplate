import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/constants';

let ActionTypes = Constants.ActionTypes;

export default {

  receiveAll(rawProjects) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RAW_PROJECTS,
      rawProjects: rawProjects
    });
  },

  receiveCreatedProject(createdProject) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RAW_CREATED_PROJECTS,
      rawProject: createdProject
    });
  }

}