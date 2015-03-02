import keyMirror from 'keymirror';

export default {

  ActionTypes: keyMirror({
    CLICK_PROJECT: null,
    CREATE_PROJECT: null,
    RECEIVE_RAW_CREATED_PROJECT: null,
    RECEIVE_RAW_PROJECTS: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
