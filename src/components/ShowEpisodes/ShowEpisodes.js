import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  getShowEpisodes,
  getShowEpisodesError,
  getShowEpisodesLoading
} from '../../store/modules/selectors';
import PageSpinner from '../Shared/PageSpinner/PageSpinner';
import ErrorMessage from '../Shared/ErrorMessage';

import s from './ShowEpisodes.scss';

const ShowEpisodes = () => {
  const { showId } = useParams();

  const episodes = useSelector(getShowEpisodes(showId));
  const isLoading = useSelector(getShowEpisodesLoading(showId));
  const error = useSelector(getShowEpisodesError(showId));

  const renderEpisode = episode => (
    <tr key={episode.id}>
      <td>{episode.number}</td>
      <td>
        <Link to={`/episodes/${episode.id}`}>
          {episode.name}
        </Link>
      </td>
      <td>{moment(episode.airdate, 'YYYY-MM-DD').format('LL')}</td>
    </tr>
  );

  if (isLoading) {
    return <PageSpinner />;
  }

  if (error) {
    return <ErrorMessage>Failed to load episodes list</ErrorMessage>;
  }

  return (
    <div>
      <table className={s.table}>
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {episodes.map(renderEpisode)}
        </tbody>
      </table>
    </div>
  );
};

export default ShowEpisodes;
