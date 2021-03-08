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
        <label htmlFor='note_name' className='hidden'>note name</label>
        <input
          required
          autoFocus
          id='note_name'
          type='text'
          placeholder='note name'
          onChange={e => this.updateName(e.target.value)}
        />
        <ValidationError message={this.validateName()}/>
        <br/>
        <label htmlFor='note_content' className='hidden'>note content</label>
        <textarea
          required
          id='note_content'
          type='text'
          placeholder='note content' 
          onChange={e => this.updateContent(e.target.value)}
        />
        <br/>
        <label htmlFor='note_folder' class='hidden'>Select a Folder</label>
        <select
          required
          id='note_folder'
          onChange={e => this.updateFolder(e.target.value)}
        >
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