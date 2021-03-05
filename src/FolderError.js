import React from 'react'
import PropTypes from 'prop-types'

class FolderError extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError () {
    return {hasError: true}
  }

  render () {
    if (this.state.hasError) {
      return (
        <h2>An error has occurred, could not display folders</h2>
      )
    }
    return this.props.children
  }
}

FolderError.propTypes = {
  children: PropTypes.array
}

export default FolderError
