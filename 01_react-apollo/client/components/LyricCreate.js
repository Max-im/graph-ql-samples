import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  onSubmit(e) {
    e.preventDefault();
    this.props
      .mutate({
        variables: { content: this.state.content, songId: this.props.songId },
        // refetchQueries: [{ query: fetchSong, variables: {id: this.props.songId} }],
      })
      .then(() => this.setState({content: ''}))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Add a Lyric:</label>
          <input
            value={this.state.content}
            onChange={(e) => this.setState({ content: e.target.value })}
            type="text"
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
