import React from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import PropTypes from 'prop-types'
import './AddFolder.css'

export default class AddFolder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {name: ''};
  }

  static contextType = ApiContext

  updateName = (folderName) => {
    this.setState({name: folderName})
  }

  handleSubmit = e => {
    e.preventDefault();
    const url = `${config.API_ENDPOINT}/folders`;
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: this.state.name})
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
    return (
      <form className='add_folder_form' onSubmit={e => this.handleSubmit(e)}>
        <h2>Add New Folder</h2>
        <input
        autoFocus 
        required
        type='text'
        placeholder='folder name' 
        onChange={e => this.updateName(e.target.value)}
        />
        <br/>
        <button className='add_folder_button' type='submit'>
          Save
        </button>  
      </form>
    )
  }
}

AddFolder.propTypes = {
  history: PropTypes.object
}