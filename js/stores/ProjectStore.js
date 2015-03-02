import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/constants';
import events from 'events';
import assign from 'object-assign';

let { EventEmitter } = events;

let ActionTypes = Constants.ActionTypes;
let CHANGE_EVENT = 'change';

var _projects = {};

function _addProjects(rawProjects) {
  rawProjects.forEach(function(project) {
    if (!_projects[project._id]) {
      _projects[project._id] = project;
    }
  });
}

var ProjectStore = assign({}, EventEmitter.prototype, {

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function(id) {
    return _projects[id];
  },

  getAll: function() {
    return _projects;
  },

  /**
   * @param {string} threadID
   */
  getAllForPage: function(page) {
    var projects = [];

    for (var id in _projects) {
      projects.push(_projects[id]);
    }
    return projects;
  },

});

ProjectStore.dispatchToken = AppDispatcher.register( (payload) => {
  let action = payload.action;

  switch(action.type) {

    case ActionTypes.CLICK_THREAD:
      AppDispatcher.waitFor([ThreadStore.dispatchToken]);
      _markAllInThreadRead(ThreadStore.getCurrentID());
      ProjectStore.emitChange();
      break;

    case ActionTypes.CREATE_MESSAGE:
      var message = ChatMessageUtils.getCreatedMessageData(
        action.text,
        action.currentThreadID
      );
      _projects[message.id] = message;
      ProjectStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_PROJECTS:
      _addProjects(action.rawProjects);
      ProjectStore.emitChange();
      break;

    default:
      // do nothing
  }

});

export default ProjectStore;