import {Button} from '@/components/ui/button.jsx';
import {Link} from 'react-router-dom';

function Hero() {
  return (
      <div className="flex flex-col items-center mx-56 gap-9">
        <h1
            className="font-extrabold test-[50px] text-center">

          <span className="text-[#42ddf5]">Plan your perfect trip effortlessly with our AI: </span>
          <br/>
          Journey Planner personalized itineraries, smart recommendations,
          and real-time
          updates all in one place. Your dream adventure starts here!</h1>
        <p className="text-xl text-gray-800 text-center">Tailored itineraries
          based on your preferences, from destinations to activities. It
          optimizes routes, suggests top attractions, and keeps everything
          organized for a stress-free trip!</p>

        <Link to={'/create-trip'}>
          <Button> Get Started, it's free</Button>
        </Link>
        <br/>

        <img src="/Journey%20planner.png" className="-mt-10 rounded shadow"/>
      </div>

  );
};

export default Hero;
