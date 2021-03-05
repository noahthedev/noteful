import React from 'react'
import config from '../config'
import ApiContext from '../ApiContext'
import PropTypes from 'prop-types'
import ValidationError from '../ValidationError'
import './AddNote.css'

export default class AddNote extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      content: '',
      folder: ''
    }
  }

  static contextType = ApiContext;

  updateName = (noteName) => {
    this.setState({name: noteName})
  }

  updateContent = (noteContent) => {
    this.setState({content: noteContent})
  }

  updateFolder = (noteFolder) => {
    this.setState({folder: noteFolder})
  }

  validateName = () => {
    if (this.state.name.trim().length === 0) {
      return 'name is required'
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const url = `${config.API_ENDPOINT}/notes`;
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        content: this.state.content,
        folderId: this.state.folder
      })
    }

    fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new Error ('Something went wrong, please try again later.')
        }
        this.props.history.goBack();
        this.context.getData();
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {

    const options = this.context.folders.map((folder, i) => {
      return <option value={folder.id} key={i}>{folder.name}</option>
    })

    return (
      <form className="addNote" onSubmit={e => this.handleSubmit(e)}>
        <h2>Add Note</h2>
        <input
          required
          autoFocus
          type='text'
          placeholder='note name'
          onChange={e => this.updateName(e.target.value)}
        />
        <ValidationError message={this.validateName()}/>
        <br/>
        <textarea
          required
          type='text'
          placeholder='note content' 
          onChange={e => this.updateContent(e.target.value)}
        />
        <br/>
        <select required onChange={e => this.updateFolder(e.target.value)}>
          <option value='none'>Select one...</option>
          {options}
        </select>
        <br/>
        <button type="submit">
          Save
        </button>
      </form>
    )
  }
}

AddNote.propTypes = {
  history: PropTypes.object
}