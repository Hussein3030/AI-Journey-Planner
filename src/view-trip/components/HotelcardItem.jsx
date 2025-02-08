import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobleApi.jsx';

function HotelCardItem({ hotel, index }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (hotel) {
      GetPlacePhoto();
    }
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
    };

    const result = await GetPlaceDetails(data).then((resp) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
          '{NAME}',
          resp.data.places[0].photos[3]?.name || ''
      );
      setPhotoUrl(PhotoUrl); // Fixed: Use PhotoUrl here
    }).catch(error => {
      console.error('Error fetching place details:', error);
    });
  };

  return (
      <Link
          to={
              'https://www.google.com/maps/search/?api=1&query=' +
              hotel?.hostname +
              ', ' +
              hotel?.hotelAddress
          }
          target="_blank"
      >
        <div key={index} className="hover:scale-105 transition-all cursor-pointer">
          <img
              src={photoUrl || '/placeholder.jpg'} // Use a placeholder if photoUrl is not loaded
              className="rounded-xl h-[180px] w-full object-cover"
              alt={`Hotel ${index + 1}`}
          />
          <div className="my-2 flex flex-col gap-2">
            <h2 className="font-medium">{hotel?.hotelName}</h2>
            <h2 className="text-xs text-gray-500">📍{hotel?.hotelAddress}</h2>
            <h2 className="text-sm text-gray-500">💵{hotel?.price}</h2>
            <h2 className="text-sm text-gray-500">⭐{hotel?.rating}</h2>
          </div>
        </div>
      </Link>
  );
}

export default HotelCardItem;
