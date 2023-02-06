import React from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../utils/routes';
import { Image, Flex, Heading, Text } from '@chakra-ui/react';
import { DEFAULT_TRIP_COVER_URL } from '../../utils/constants';

const TripItem = ({ trip }) => {
  const navigate = useNavigate();
  return (
    <Flex
      bg='white'
      display='inline-flex'
      direction='column'
      borderRadius={20}
      overflow='hidden'
      w='350px'
      onClick={() => navigate(ROUTES.TRIPS + '/' + trip.id)}
      style={{
        transition: 'transform .2s',
      }}
      _hover={{
        cursor: 'pointer',
        transform: 'scale(1.02)',
      }}
    >
      <Image
        h='250px'
        w='350px'
        objectFit='cover'
        src={trip.image_url ?? DEFAULT_TRIP_COVER_URL}
        alt={trip.location?.country}
      />
      <Flex direction='column' m={6} gap={2}>
        <Heading fontSize='21px'> {trip.name}</Heading>
        {trip.description && <Text fontSize='md'>{trip.description}</Text>}
      </Flex>
    </Flex>
  );
};

export default TripItem;
