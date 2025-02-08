import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {GetPlaceDetails, PHOTO_REF_URL} from '@/service/GlobleApi.jsx';


function PlaceCardItem({place}) {

  const [photoUrl,setPhotoUrl] =useState();


  useEffect(() =>{
    place&&GetPlacePhoto();
  },[place])

  const GetPlacePhoto = async ()=>{
    const data ={
      textQuery:place.placeName
    }
    const result=await GetPlaceDetails(data).then(resp=>{
      const photoUrl=PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);

      setPhotoUrl(photoUrl);
    })
  }


  return (

      <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName} target='_blank'>
      <div className='border rotate-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer rounded'>
        <img src={photoUrl?photoUrl:'/futuristic-ai-travel.jpg'} className='w-[130px] h-[130px] rotate-xl object-cover'/>
        <div>
          <h2 className='font-bold text-lg'>{place.placeName}</h2>
          <p className='text-sm text-gray-600'>{place.placeDetails}</p>
          <h2 className='mt-2'>🕐{place.travelTime}</h2>

        </div>
      </div>
      </Link>
  );
}

export default PlaceCardItem;