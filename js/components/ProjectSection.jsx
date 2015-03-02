import React from 'react';
import ProjectListItem from './ProjectListItem';
import ProjectStore from '../stores/ProjectStore';

function getStateFromStores() {
  return {
    projects: ProjectStore.getAllForPage()
  };
}

function getProjectListItem(project) {
  return (
    <ProjectListItem
      key={project._id}
      project={project}
    />
  );
}

export default class ProjectSection extends React.Component {

  constructor() {
    this.state = getStateFromStores();
  }

  componentDidMount() {
    this._scrollToBottom();
    ProjectStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ProjectStore.removeChangeListener(this._onChange);
  }

  render() {
    var projectListItems = this.state.projects.map(getProjectListItem);
    return (
      <div className="project-section">
        <ul className="project-list" ref="projectList">
          {projectListItems}
        </ul>
      </div>
    );
  }

  componentDidUpdate() {
    this._scrollToBottom();
  }

  _scrollToBottom() {
    var ul = this.refs.projectList.getDOMNode();
    ul.scrollTop = ul.scrollHeight;
  }

  /**
   * Event handler for 'change' events coming from the ProjectStore
   */
  _onChange() {
    this.setState(getStateFromStores());
  }

}