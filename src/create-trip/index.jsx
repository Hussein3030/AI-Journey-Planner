
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input.jsx';
import {
  AI_Prompt,
  SelectBudgetOptions,
  SelectTravelesList,
} from '@/constants/option.jsx';
import {Button} from '@/components/ui/button.jsx';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {toast} from 'sonner';
import {chatSession} from '@/service/AIModel.jsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { FcGoogle } from "react-icons/fc";
import {useGoogleLogin} from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import {db} from '@/service/firebaseConfig.jsx';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {useNavigate} from 'react-router-dom';

function CreateTrip() {

  const [place, setPlace] = useState();
  const [formDate, setFormDate] = useState([]);
  const [openDailog, setOpenDailog] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const handleInputChange=(name,value)=>{

    setFormDate({
      ...formDate,
      [name]: value
    })
  }

  useEffect(()=>{
    console.log(formDate);
  }, [formDate])

  const login=useGoogleLogin({
    onSuccess:(codeResp)=> GetUserProfile(codeResp),
    onError:(error)=> console.log(error)
  })

  const OnGenerateTrip= async ()=>{


    const user= localStorage.getItem('user');

    if(!user){
      setOpenDailog(true)
      return;
    }

    if(formDate?.noOfDays>5&&! formDate?.location|| !formDate?.budget||!formDate.Travelers){
      toast("Please fill all details.")
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_Prompt
    .replace('{location}', formDate?.location?.label)
    .replace('{totalDays}', formDate?.noOfDays)
    .replace('{traveler}', formDate?.Travelers)
    .replace('{budget}', formDate?.budget)
    .replace('{totalDays}', formDate?.noOfDays)

    const result =await chatSession.sendMessage(FINAL_PROMPT)

    console.log('Here is the:' + result?.response?.text())
    setLoading(false);
    SaveAiTrip(result?.response?.text())
  }


  const SaveAiTrip=async (TripData)=>{

    setLoading(true);
    const user =JSON.parse(localStorage.getItem('user'))
    const docId=Date.now().toString()
    await setDoc(doc(db, "AITrips", docId), {
      userSelection:formDate,
      tripData:JSON.parse(TripData),
      userEmail:user?.email,
      id:docId,
    });
    setLoading(false);
    navigate('/view-trip/'+docId);
  }

  const GetUserProfile= (tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then((resp)=>{
      console.log(resp)
      localStorage.setItem('user', JSON.stringify(resp.data))
      setOpenDailog(false);
      OnGenerateTrip()
    })
  }

  return (
      <div>
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 text-center">
          <h2 className="font-bold text-3xl">Tell us your travel plan ✈️</h2>
          <p className="mt-3 text-gray-500 text-xl">Simply share your basic details, and our journey planner will craft a personalized travel plan tailored to your preferences.</p>

          <div className="mt-20 flex flex-col gap-10">
            <div>
              <h2 className="text-xl my-3 font-medium">What is your destination?</h2>
              <GooglePlacesAutocomplete
                  apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                  selectProps={{place, onChange: (v) => {setPlace(v);handleInputChange('location', v)}}}
              />
            </div>

            <div>
              <h2 className="text-xl my-3 font-medium">How many days are you
                planing your trip?</h2>
              <Input placeholder={'Ex.5'} type='number'
                     onChange={(e)=>handleInputChange('noOfDays', e.target.value)}
              />

            </div>
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
            <div className='grid  grid-cols-3 gap-5 mt-5'>
              {SelectBudgetOptions.map((item, index) => (
                  <div key={index}
                       onClick={()=>handleInputChange('budget', item.title)}
                       className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                     ${formDate?.budget==item.title&&'shadow-lg border-black'}
                     `}>
                    <h2 className='text-4xl'>{item.icon}</h2>
                    <h2 className='font-bold text-lg'>{item.title}</h2>
                    <h2 className='text-sm text-gray-600'>{item.Description}</h2>
                  </div>
              ))}
            </div>
          </div>

          <div className='p-2'>
            <h2 className="text-xl my-3 font-medium ">Who do you plan to travel with?</h2>
            <div className='grid  grid-cols-3 gap-5 mt-5'>
              {SelectTravelesList.map((item, index) => (
                  <div key={index}
                       onClick={()=>handleInputChange('Travelers', item.people)}
                       className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                     ${formDate?.Travelers==item.people&&'shadow-lg border-black'}
                     `}>
                    <h2 className='text-4xl'>{item.icon}</h2>
                    <h2 className='font-bold text-lg'>{item.title}</h2>
                    <h2 className='text-sm text-gray-600'>{item.Description}</h2>
                  </div>
              ))}
            </div>
          </div>
        </div>

        <div className='p-10 text-center'>
          <Button
              disabled={loading}
              onClick={OnGenerateTrip}>
            {loading?
                <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/>:'Generate trip'
            }
            </Button>
        </div>

        <Dialog open={openDailog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src='/logo.svg'/>
                <h2 className='font-bold text-lg mt-5'>Sign in with Google</h2>
                <p>sign in to the app with Google authentication!</p>

                <Button

                        onClick={login}
                        className='w-full mt-5 flex gap-4 item-center'>

                  <FcGoogle className='h-7 w-7'/>
                  Sign In with Google

                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

      </div>
  )
}

export default CreateTrip;
