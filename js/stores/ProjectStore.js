import AppDispatcher from '../dispatcher/AppDispatcher';
import { ActionTypes } from '../constants/Constants';
import events from 'events';

let { EventEmitter } = events;

let CHANGE_EVENT = 'change';

let _projects = {};
let _currentID = {};

function _addProjects(rawProjects) {
  rawProjects.forEach(function(project) {
    if (!_projects[project._id]) {
      _projects[project._id] = project;
    }
  });
}

class ProjectStore extends EventEmitter {

  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register((payload) => {
      let action = payload.action;

      switch(action.type) {

        case ActionTypes.CLICK_PROJECT:
          console.log(action);
          _currentID = action.projectID;
          this.emitChange();
          break;

        case ActionTypes.CREATE_MESSAGE:
          var message = ChatMessageUtils.getCreatedMessageData(
            action.text,
            action.currentThreadID
          );
          _projects[message.id] = message;
          this.emitChange();
          break;

        case ActionTypes.RECEIVE_RAW_PROJECTS:
          _addProjects(action.rawProjects);
          this.emitChange();
          break;

        default:
          // do nothing
      }

    });
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  get(id) {
    return _projects[id];
  }

  getAll() {
    return _projects;
  }

  /**
   * @param {string} threadID
   */
  getAllForPage(page) {
    var projects = [];

    for (var id in _projects) {
      projects.push(_projects[id]);
    }
    return projects;
  }

  getCurrentID() {
    return _currentID;
  }

  getCurrent() {
    return this.get(this.getCurrentID());
  }
}

export default new ProjectStore;