import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchEpisodeRequest } from '../../store/modules/actions';
import { getEpisode, getEpisodeError, getEpisodeLoading } from '../../store/modules/selectors';
import DetailsPage from '../Shared/DetailsPage/DetailsPage';
import ErrorMessage from '../Shared/ErrorMessage';
import PageSpinner from '../Shared/PageSpinner';

const EpisodeDetailsPage = () => {
  const dispatch = useDispatch();
  const { episodeId } = useParams();

  const episode = useSelector(getEpisode(episodeId));
  const isLoading = useSelector(getEpisodeLoading(episodeId));
  const error = useSelector(getEpisodeError(episodeId));

  useEffect(() => {
    dispatch(fetchEpisodeRequest(episodeId));
  }, [episodeId]);

  if (isLoading) {
    return <PageSpinner />;
  }

  if (error) {
    return <ErrorMessage>Failed to load episode data</ErrorMessage>;
  }

  return (
    <DetailsPage
      summary={episode.summary}
      name={episode.name}
      imageUrl={episode.image?.medium}
    />
  );
};

export default EpisodeDetailsPage;
