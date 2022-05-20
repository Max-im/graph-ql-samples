import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSongs from '../queries/fetchSongs';

class SongList extends Component {
  onDelete(id) {
    this.props.mutate({ variables: { id }})
      .then(() => this.props.data.refetch());
  }

  render() {
    return (
      <div>
        <h3>Song List</h3>

        {this.props.data.loading && 'Loading...'}

        <ul className="collection">
          {this.props.data.songs &&
            this.props.data.songs.map(({ id, title }) => (
              <li className="collection-item" key={id}>
                <Link to={`/songs/${id}`}>{title}</Link>
                <i className="material-icons" onClick={() => this.onDelete(id)}>
                  delete
                </i>
              </li>
            ))}
        </ul>

        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(fetchSongs)(SongList));
