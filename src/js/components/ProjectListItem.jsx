import React from 'react';
import classnames from 'classnames';
import ProjectActionCreators from '../actions/ProjectActionCreators';

export default class ProjectListItem extends React.Component {

  render() {
    var project = this.props.project;
    return (
      <li className={classnames({
        'project-list-item': true,
        'active': project._id === this.props.currentProjectID
      })}
      onClick={this._onClick.bind(this)} >
        <h5 className="project-title">{project.title}</h5>
        <span className="project-creator-displayname">{project._creator.displayName}</span>
        <div className="project-s_description">{project.s_description}</div>
      </li>
    );
  }

  _onClick() {
    ProjectActionCreators.clickProject(this.props.project._id);
  }

}

ProjectListItem.propTypes = {
  project: React.PropTypes.object
};
