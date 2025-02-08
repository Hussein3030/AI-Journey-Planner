import PlaceCardItem from '@/view-trip/components/PlaceCardItem.jsx';

function PlacesToVisit({ trip }) {

  // Check if trip or tripData is null or undefined
  if (!trip || !trip.tripData || !trip.tripData.itinerary) {
    return <div>Loading...</div>; // Or display an error message
  }

  return (
      <div>
        <h2 className="font-bold text-lg">Places To Visit</h2>
        <div>
          {Object.entries(trip.tripData.itinerary).map(([dayKey, item], index) => {
            return (
                <div key={index} className='mt-3'>
                  <h2 className="font-medium text-lg">{dayKey}</h2>
                  <div className='grid md:grid-cols-2 gap-5'>
                    {item.places?.map((place, index) => {
                      return (
                          <div key={index} className="my-3">
                            <h2 className="font-medium text-sm text-blue-500">{place.bestTimeToVisit}</h2>
                            <PlaceCardItem place={place} />
                          </div>
                      );
                    })}
                  </div>
                </div>
            );
          })}
        </div>
      </div>
  );
}

export default PlacesToVisit;
