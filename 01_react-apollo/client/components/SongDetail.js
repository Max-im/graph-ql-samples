import React, { Component, useEffect } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
  render() {
    const song = this.props.data.song;
    const loading = this.props.data.loading;
    return (
      <div>
        <Link to="/">Back</Link>
        {loading && 'Loading...'}
        {song && (
          <div>
            <h3>{song.title}</h3>
            <LyricList lyrics={song.lyrics} />
            <LyricCreate songId={song.id} />
          </div>
        )}
      </div>
    );
  }
}

export default graphql(fetchSong, {
  options: (props) => ({ variables: { id: props.params.id } }),
})(SongDetail);
