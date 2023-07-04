import React, { useEffect, useState } from 'react';
import Container from '../Shared/Container/Container';
import Card from './Card';
import Loader from '../Shared/Loader/Loader';
import { useSearchParams } from 'react-router-dom';
import Heading from '../Heading/Heading';

const Rooms = () => {
  const [params, setParams] = useSearchParams();
  const category = params.get("category");
  // console.log(category);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("./rooms.json")
      .then((res) => res.json())
      .then((data) => {
        if (category) {
          const filtered = data.filter((room) => room.category === category); 
          setRooms(filtered);
        }
        else {
          setRooms(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category]);
  
  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      {rooms && rooms.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {rooms.map((room, index) => (
            <Card key={index} room={room} />
          ))}
        </div>
      ) : (
        <div className="pt-12">
          <Heading
            title="No Rooms Available in This Category!"
            subTitle="Please Select Other Category"
            center={true}
          />
        </div>
      )}
    </Container>
  );
};

export default Rooms;