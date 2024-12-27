import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig.jsx';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import InfoSection from '@/view-trip/components/InfoSection.jsx';
import Hotels from '@/view-trip/components/Hotels.jsx';
import PlacesToVisit from '@/view-trip/components/PlacesToVisit.jsx';
import Footer from '@/view-trip/components/Footer.jsx';

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null); // Changed from [] to null since it's an object

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  const GetTripData = async () => {
    try {
      const docRef = doc(db, 'AITrips', tripId);
      const docSnap = await getDoc(docRef); // Fixed variable name

      if (docSnap.exists()) {
        console.log('Document: ', docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log('No Document');
        toast('No trip found');
      }
    } catch (error) {
      console.error('Error fetching trip:', error);
      toast('Error fetching trip data');
    }
  };

  return (
      <div className='p-10 md:px-20 lg:px-44 xl:px-56'>

        {trip && <InfoSection trip={trip} />} {/* Only render when trip data exists */}

        {/*Recommendation Hotel*/}
        <Hotels trip={trip}/>

        {/*Daily plan*/}
        <PlacesToVisit trip={trip}/>

        {/* Footer*/}
        <Footer trip={trip}/>
      </div>
  );
}

export default Viewtrip;