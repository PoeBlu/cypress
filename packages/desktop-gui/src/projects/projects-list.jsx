import _ from 'lodash'
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Loader from 'react-loader'

import projectsApi from './projects-api'
import projectsStore from './projects-store'
import { Link, routes } from '../lib/routing'

const ProjectListItem = observer(({ project, onSelect, onRemove }) => (
  <li>
    <Link className='project' to={routes.specs(project)} onClick={onSelect}>
      <span className='project-name'>{project.displayName}</span>
      <span className='project-path'>{project.displayPath}</span>
    </Link>
    <button onClick={(e) => {
      e.stopPropagation()
      onRemove()
    }}>
      <i className='fa fa-remove' />
    </button>
  </li>
))

@observer
class ProjectsList extends Component {
  componentDidMount () {
    projectsApi.loadProjects()
  }

  render () {
    if (!projectsStore.isLoading && !projectsStore.projects.length) return null

    return (
      <div className='projects-list'>
        <h3>Recent Projects</h3>
        {this._content()}
      </div>
    )
  }

  _content () {
    if (projectsStore.isLoading) return <Loader color='#888' scale={0.5}/>

    return (
      <ul>
        {_.map(projectsStore.projects, (project) => (
          <ProjectListItem
            key={project.path}
            project={project}
            onSelect={() => this.props.onSelect(project)}
            onRemove={() => projectsApi.removeProject(project)}
          />
        ))}
      </ul>
    )
  }
}

export default ProjectsList
