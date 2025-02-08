import {useEffect, useState} from 'react';
import {GetPlaceDetails, PHOTO_REF_URL} from '@/service/GlobleApi.jsx';
import { Link } from 'react-router-dom'

function UserTripCardItem({trip}) {

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
      <Link to={'/view-trip/'+trip?.id}>
      <div className='hover:scale-105 transition-all'>
        <img className='object-cover rounded-xl h-[220px]' src={photoUrl?photoUrl:'/futuristic-ai-travel.jpg'}/>
        <div>
          <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
          <h2 className='text-sm text-gray-600'>{trip?.userSelection.noOfDays} days trip with {trip?.userSelection?.budget} budget</h2>
        </div>
      </div>
      </Link>
  );
}

export default UserTripCardItem