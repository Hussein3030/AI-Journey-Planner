import React, { useEffect, useState } from 'react';
import { LuSend } from "react-icons/lu";
import { Button } from '@/components/ui/button.jsx';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobleApi.jsx';

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    if (trip?.userSelection?.location?.label) {
      fetchPhoto(trip.userSelection.location.label);
    }
  }, [trip]);

  const fetchPhoto = async (locationLabel) => {
    try {
      const data = { textQuery: locationLabel };
      const result = await GetPlaceDetails(data);
      const photoName = result?.data?.places?.[0]?.photos?.[0]?.name;

      if (photoName) {
        const url = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoUrl(url);
      } else {
        console.warn('Photo not found for location:', locationLabel);
        setPhotoUrl('/placeholder.jpg'); // Fallback image
      }
    } catch (error) {
      console.error('Error fetching photo:', error);
      setPhotoUrl('/placeholder.jpg'); // Fallback image
    }
  };

  return (
      <div>
        <img
            src={photoUrl || '/placeholder.jpg'} // Ensure fallback for undefined photoUrl
            className='h-[550px] w-full object-cover rounded '
            alt="Location"
        />

        <div className='flex justify-between items-center'>
          <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
            <div className='flex gap-5'>
              <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
                🗓️ {trip?.userSelection?.noOfDays} Day
              </h2>
              <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
                💸 {trip?.userSelection?.budget} Budget
              </h2>
              <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
                🍷 No. of travelers: {trip?.userSelection?.Travelers}
              </h2>
            </div>
          </div>
          <Button><LuSend /></Button>
        </div>
      </div>
  );
}

export default InfoSection;
