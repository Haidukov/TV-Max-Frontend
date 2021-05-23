/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchShowRequest } from '../../store/modules/actions';
import {
  getShow,
  getShowError,
  getShowLoading
} from '../../store/modules/selectors';
import DetailsPage from '../Shared/DetailsPage/DetailsPage';
import ErrorMessage from '../Shared/ErrorMessage';
import PageSpinner from '../Shared/PageSpinner';

const ShowDetails = () => {
  const { showId } = useParams();
  const dispatch = useDispatch();

  const show = useSelector(getShow(showId));
  const isLoading = useSelector(getShowLoading(showId));
  const error = useSelector(getShowError(showId));

  useEffect(() => {
    dispatch(fetchShowRequest(showId));
  }, []);

  if (isLoading) {
    return <PageSpinner />;
  }

  if (error) {
    return <ErrorMessage>Failed to load show data</ErrorMessage>;
  }

  return (
    <DetailsPage
      name={show.name}
      imageUrl={show.image?.medium}
      summary={show.summary}
    />
  );
};

export default ShowDetails;
