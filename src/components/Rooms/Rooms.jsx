import React, { useEffect, useState } from 'react';
import Container from '../Shared/Container/Container';
import Card from './Card';
import Loader from '../Shared/Loader/Loader';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('./rooms.json')
      .then(res => res.json())
      .then(data => {
        setRooms(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])
  
  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <div className="pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {rooms.map((room, index) => (
          <Card key={index} room={room} />
        ))}
      </div>
    </Container>
  );
};

export default Rooms;