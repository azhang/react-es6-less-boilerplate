import AppDispatcher from '../dispatcher/AppDispatcher';
import { ActionTypes } from '../constants/Constants';

export default {

  clickProject(projectID) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CLICK_PROJECT,
      projectID: projectID
    })
  }

}