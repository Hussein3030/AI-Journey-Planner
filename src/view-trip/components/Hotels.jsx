import { Link } from 'react-router-dom'
import HotelCardItem from '@/view-trip/components/HotelcardItem.jsx';

function Hotels({trip}) {

  return (
      <div>
        <h2 className='font-bold text-xl mt-5'>Hotels Recommendations:</h2>
        <br/>
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
          {trip?.tripData?.hotelOptions?.map((hotel, index) => (  // Changed from hotels to hotelOptions
              <HotelCardItem key={index} hotel={hotel} index={index}/>
          ))}
        </div>
      </div>
  );
}

export default Hotels;