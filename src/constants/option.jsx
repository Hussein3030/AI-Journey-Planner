export const SelectTravelesList=[
  {
    id:1,
    title:'Just me',
    Description:'Solo travelers in exploration',
    icon:'✈',
    people:'1'
  },

  {
    id:2,
    title:'A Couple',
    Description:'2 travelers in tandem',
    icon:'🥂',
    people:'2 People'
  },
  {
    id:3,
    title:'Family',
    Description:'A group of fun adventurous',
    icon:'🏠',
    people:'3-5 People'
  },

  {
    id:4,
    title:'Friends',
    Description:'A bunch of thrill adventurous people',
    icon:'🏞️',
    people:'5-10 People'
  },
]

export const SelectBudgetOptions=[
  {
    id:1,
    title:'Cheap',
    Description:'Stay conscious of cost',
    icon:'💵',
  },

  {
    id:2,
    title:'Moderate',
    Description:'Keep cost on average',
    icon:'💰',
  },

  {
    id:3,
    title:'Luxury',
    Description:'Cost is not an issue',
    icon:'💲',
  },
]

export const AI_Prompt='Generate travel plan for location: {location} for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image URL, geo coordinates, rating, descriptions, and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format'