import keyMirror from 'keymirror';

export const ActionTypes = keyMirror({
  CLICK_PROJECT: null,
  CREATE_PROJECT: null,
  RECEIVE_RAW_CREATED_PROJECT: null,
  RECEIVE_RAW_PROJECTS: null
});

export const PayloadSources = keyMirror({
  SERVER_ACTION: null,
  VIEW_ACTION: null
});