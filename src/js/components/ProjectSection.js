import React from 'react';
import ProjectListItem from './ProjectListItem';
import ProjectStore from '../stores/ProjectStore';

function getStateFromStores() {
  return {
    projects: ProjectStore.getAllForPage(),
    currentProjectID: ProjectStore.getCurrentID()
  };
}

function getProjectListItem(project) {
  return (
    <ProjectListItem
      key={project._id}
      project={project}
      currentProjectID={this.state.currentProjectID}
    />
  );
}

export default class ProjectSection extends React.Component {

  constructor() {
    super();
    this.state = getStateFromStores();
  }

  componentDidMount() {
    this._scrollToBottom();
    ProjectStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    ProjectStore.removeChangeListener(this._onChange);
  }

  render() {
    var projectListItems = this.state.projects.map(getProjectListItem.bind(this));
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
    var ul = React.findDOMNode(this.refs.projectList);
    ul.scrollTop = ul.scrollHeight;
  }

  /**
   * Event handler for 'change' events coming from the ProjectStore
   */
  _onChange() {
    this.setState(getStateFromStores());
  }

}
