import ServerProjectActionCreators from '../actions/ServerProjectActionCreators';

module.exports = {

  getAllProjects: function() {
    // simulate retrieving data from a database
    var rawProjects = JSON.parse(localStorage.getItem('projects'));

    // simulate success callback
    ServerProjectActionCreators.receiveAll(rawProjects);
  }

};
