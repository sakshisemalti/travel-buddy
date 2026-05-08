import type { Itinerary, CityId, MoodId, TravelStyle } from './types';

interface MockParams { city: CityId | null; mood: MoodId | null; duration: number; budget: number; style: TravelStyle; }

// Each city has unique day-by-day plans so no two days repeat
const CITY_DAYS: Record<string, Array<{
  title: string; focus: string;
  activities: Array<{ time: string; icon: string; title: string; description: string }>;
  eateries: Array<{ name: string; type: 'dhaba' | 'street_food' | 'thali' | 'chai_stall' | 'cafe'; specialty: string; rating: number; neighbourhood: string }>;
  map_stops: Array<{ id: string; name: string; type: 'activity' | 'restaurant'; lat: number; lng: number }>;
}>> = {
  delhi: [
    {
      title: 'Old Delhi & Mughal Lanes',
      focus: 'Lose yourself in 400-year-old lanes and Mughal food culture.',
      activities: [
        { time: 'Morning', icon: 'walk', title: 'Chandni Chowk at Dawn', description: 'Arrive before 8am when the lanes are quiet. Walk from Fatehpuri Mosque end to Lal Qila. The light is golden and the chai wallahs are just setting up.' },
        { time: 'Afternoon', icon: 'temple', title: 'Jama Masjid & Matia Mahal', description: 'Climb the southern minaret for a rooftop view of Old Delhi. Then dive into Matia Mahal lane for the best nihari in the city.' },
        { time: 'Evening', icon: 'shop', title: 'Kinari Bazaar', description: 'The wedding decoration market glitters at dusk. Ribbons, sequins, and tinsel spill onto the street. Purely a visual feast.' },
      ],
      eateries: [
        { name: "Karim's, Gali Kababian", type: 'dhaba', specialty: 'Mutton Burra & Nihari', rating: 4.7, neighbourhood: 'Jama Masjid' },
        { name: 'Natraj Dahi Bhalle Wala', type: 'street_food', specialty: 'Dahi Bhalle & Aloo Tikki', rating: 4.5, neighbourhood: 'Chandni Chowk' },
      ],
      map_stops: [
        { id: 'd1-s1', name: 'Chandni Chowk', type: 'activity', lat: 28.6507, lng: 77.2334 },
        { id: 'd1-s2', name: 'Jama Masjid', type: 'activity', lat: 28.6507, lng: 77.2373 },
        { id: 'd1-s3', name: "Karim's", type: 'restaurant', lat: 28.6499, lng: 77.2368 },
        { id: 'd1-s4', name: 'Kinari Bazaar', type: 'activity', lat: 28.6512, lng: 77.2320 },
        { id: 'd1-s5', name: 'Natraj Dahi Bhalle', type: 'restaurant', lat: 28.6508, lng: 77.2330 },
      ],
    },
    {
      title: 'Hauz Khas & South Delhi Arts',
      focus: 'Medieval ruins meet indie cafes and street art.',
      activities: [
        { time: 'Morning', icon: 'nature', title: 'Hauz Khas Lake & Deer Park', description: 'Walk the 14th-century reservoir at 7am before the crowds. Deer graze freely in the adjacent park. Bring a book.' },
        { time: 'Afternoon', icon: 'art', title: 'Hauz Khas Village Galleries', description: 'The village lanes are packed with independent art galleries, vintage stores, and design studios. Most are free to enter.' },
        { time: 'Evening', icon: 'building', title: 'Siri Fort Ruins at Sunset', description: 'The forgotten second city of Delhi. Almost no tourists. Crumbling walls and wild grass — a completely different Delhi.' },
      ],
      eateries: [
        { name: 'Naivedyam', type: 'thali', specialty: 'South Indian Thali', rating: 4.6, neighbourhood: 'Hauz Khas' },
        { name: 'Jughead Café', type: 'cafe', specialty: 'Cold brew & banana bread', rating: 4.4, neighbourhood: 'Hauz Khas Village' },
      ],
      map_stops: [
        { id: 'd2-s1', name: 'Hauz Khas Lake', type: 'activity', lat: 28.5535, lng: 77.2006 },
        { id: 'd2-s2', name: 'Hauz Khas Village', type: 'activity', lat: 28.5494, lng: 77.2001 },
        { id: 'd2-s3', name: 'Naivedyam', type: 'restaurant', lat: 28.5490, lng: 77.2010 },
        { id: 'd2-s4', name: 'Siri Fort', type: 'activity', lat: 28.5560, lng: 77.2170 },
        { id: 'd2-s5', name: 'Jughead Café', type: 'restaurant', lat: 28.5500, lng: 77.2005 },
      ],
    },
    {
      title: 'Lodi Colony & Nizamuddin',
      focus: 'Sufi music, Mughal tombs, and the best street art in Delhi.',
      activities: [
        { time: 'Morning', icon: 'art', title: 'Lodi Art District', description: 'The entire Lodi Colony neighbourhood is an open-air mural gallery. 50+ murals by international artists cover every wall. Walk freely.' },
        { time: 'Afternoon', icon: 'temple', title: 'Nizamuddin Dargah', description: 'The shrine of Sufi saint Hazrat Nizamuddin. Visit the inner sanctum, watch devotees offer flowers, and feel the spiritual weight of 700 years.' },
        { time: 'Evening', icon: 'music', title: 'Qawwali at Nizamuddin', description: 'Every Thursday evening, qawwali singers perform at the dargah from 5–8pm. Sit on the marble floor and let the music wash over you.' },
      ],
      eateries: [
        { name: 'Ghalib Kabab Corner', type: 'street_food', specialty: 'Seekh Kebab & Roomali Roti', rating: 4.5, neighbourhood: 'Nizamuddin West' },
        { name: 'Khan Chacha', type: 'dhaba', specialty: 'Chicken Tikka Roll', rating: 4.6, neighbourhood: 'Khan Market' },
      ],
      map_stops: [
        { id: 'd3-s1', name: 'Lodi Art District', type: 'activity', lat: 28.5931, lng: 77.2197 },
        { id: 'd3-s2', name: 'Nizamuddin Dargah', type: 'activity', lat: 28.5931, lng: 77.2461 },
        { id: 'd3-s3', name: 'Ghalib Kabab Corner', type: 'restaurant', lat: 28.5925, lng: 77.2455 },
        { id: 'd3-s4', name: 'Qawwali Stage', type: 'activity', lat: 28.5928, lng: 77.2463 },
        { id: 'd3-s5', name: 'Khan Chacha', type: 'restaurant', lat: 28.5997, lng: 77.2268 },
      ],
    },
    {
      title: 'Sarojini & Mehrauli',
      focus: 'Bargain fashion, ancient ruins, and village life inside the city.',
      activities: [
        { time: 'Morning', icon: 'shop', title: 'Sarojini Nagar Market', description: 'Delhi\'s best export surplus market. Arrive by 9am for first pick. Branded clothes at 1/10th the price. Bargain hard — it\'s expected.' },
        { time: 'Afternoon', icon: 'building', title: 'Mehrauli Archaeological Park', description: 'A 2km walk through 1000 years of ruins — tombs, mosques, and stepwells hidden in a forest. Almost no tourists. Completely free.' },
        { time: 'Evening', icon: 'coffee', title: 'Qutub Minar at Dusk', description: 'The 73m minaret glows amber at sunset. The surrounding complex is quieter after 5pm. Worth the entry fee for the light alone.' },
      ],
      eateries: [
        { name: 'Andhra Bhavan Canteen', type: 'thali', specialty: 'Andhra Thali with Gongura', rating: 4.7, neighbourhood: 'Ashoka Road' },
        { name: 'Café Lota', type: 'cafe', specialty: 'Rajma Chawal & Filter Coffee', rating: 4.5, neighbourhood: 'Pragati Maidan' },
      ],
      map_stops: [
        { id: 'd4-s1', name: 'Sarojini Nagar', type: 'activity', lat: 28.5757, lng: 77.1888 },
        { id: 'd4-s2', name: 'Mehrauli Park', type: 'activity', lat: 28.5244, lng: 77.1855 },
        { id: 'd4-s3', name: 'Andhra Bhavan', type: 'restaurant', lat: 28.6139, lng: 77.2090 },
        { id: 'd4-s4', name: 'Qutub Minar', type: 'activity', lat: 28.5245, lng: 77.1855 },
        { id: 'd4-s5', name: 'Café Lota', type: 'restaurant', lat: 28.6127, lng: 77.2773 },
      ],
    },
  ],
  mumbai: [
    {
      title: 'Dharavi & Mahim',
      focus: 'The real Mumbai — industry, community, and resilience.',
      activities: [
        { time: 'Morning', icon: 'walk', title: 'Dharavi Kumbharwada', description: 'The potter\'s quarter of Dharavi. Families have made clay pots here for generations. Walk through at 8am when the kilns are firing.' },
        { time: 'Afternoon', icon: 'shop', title: 'Chor Bazaar', description: 'Mumbai\'s famous thieves\' market. Antiques, vintage cameras, old Bollywood posters, and things you can\'t name. Haggle for everything.' },
        { time: 'Evening', icon: 'nature', title: 'Mahim Beach at Sunset', description: 'Not a swimming beach — a people-watching beach. Fishermen pull in nets, kids fly kites, and the city skyline turns pink.' },
      ],
      eateries: [
        { name: 'Kyani & Co', type: 'cafe', specialty: 'Bun Maska & Irani Chai', rating: 4.6, neighbourhood: 'Marine Lines' },
        { name: 'Sarvi Restaurant', type: 'dhaba', specialty: 'Nalli Nihari & Sheermal', rating: 4.5, neighbourhood: 'Nagpada' },
      ],
      map_stops: [
        { id: 'd1-s1', name: 'Dharavi Kumbharwada', type: 'activity', x: 45, y: 55 },
        { id: 'd1-s2', name: 'Chor Bazaar', type: 'activity', x: 35, y: 42 },
        { id: 'd1-s3', name: 'Kyani & Co', type: 'restaurant', x: 38, y: 35 },
        { id: 'd1-s4', name: 'Mahim Beach', type: 'activity', x: 30, y: 50 },
        { id: 'd1-s5', name: 'Sarvi Restaurant', type: 'restaurant', x: 42, y: 48 },
      ],
    },
    {
      title: 'Bandra & Versova',
      focus: 'Bohemian Mumbai — street art, fishing villages, and sea air.',
      activities: [
        { time: 'Morning', icon: 'art', title: 'Bandra Street Art Walk', description: 'The lanes around Chapel Road and St Andrews are covered in murals. Pick up a map from any café and walk the 2km art trail.' },
        { time: 'Afternoon', icon: 'walk', title: 'Versova Fishing Village', description: 'A working Koli fishing village inside Mumbai. Boats come in at 3pm. Buy fresh catch directly from fishermen on the beach.' },
        { time: 'Evening', icon: 'building', title: 'Bandra Fort at Dusk', description: 'The 17th-century Portuguese fort overlooks the sea link. Couples, artists, and old men with transistor radios gather here every evening.' },
      ],
      eateries: [
        { name: 'Elco Pani Puri Centre', type: 'street_food', specialty: 'Pani Puri & Ragda Pattice', rating: 4.7, neighbourhood: 'Bandra West' },
        { name: 'Prithvi Café', type: 'cafe', specialty: 'Masala Chai & Keema Pav', rating: 4.5, neighbourhood: 'Juhu' },
      ],
      map_stops: [
        { id: 'd2-s1', name: 'Bandra Art Walk', type: 'activity', x: 28, y: 38 },
        { id: 'd2-s2', name: 'Versova Village', type: 'activity', x: 18, y: 30 },
        { id: 'd2-s3', name: 'Elco Pani Puri', type: 'restaurant', x: 27, y: 40 },
        { id: 'd2-s4', name: 'Bandra Fort', type: 'activity', x: 25, y: 42 },
        { id: 'd2-s5', name: 'Prithvi Café', type: 'restaurant', x: 22, y: 32 },
      ],
    },
    {
      title: 'Fort & Colaba Heritage',
      focus: 'Colonial architecture, bookshops, and the original Bombay.',
      activities: [
        { time: 'Morning', icon: 'building', title: 'CST & Fort Heritage Walk', description: 'The UNESCO-listed CST station is best photographed at 7am before the crowds. Walk south through the Fort precinct — every building is a story.' },
        { time: 'Afternoon', icon: 'shop', title: 'Colaba Causeway', description: 'Mumbai\'s most eclectic street market. Antiques, silver jewellery, leather bags, and street food all on one long road.' },
        { time: 'Evening', icon: 'coffee', title: 'Strand Book Stall', description: 'Mumbai\'s oldest bookshop, open since 1948. Tiny, packed floor to ceiling, and staffed by people who have read everything.' },
      ],
      eateries: [
        { name: 'Britannia & Co', type: 'cafe', specialty: 'Berry Pulao & Caramel Custard', rating: 4.8, neighbourhood: 'Ballard Estate' },
        { name: 'Bademiyan', type: 'street_food', specialty: 'Seekh Kebab & Chicken Tikka', rating: 4.6, neighbourhood: 'Colaba' },
      ],
      map_stops: [
        { id: 'd3-s1', name: 'CST Station', type: 'activity', x: 52, y: 72 },
        { id: 'd3-s2', name: 'Fort Precinct', type: 'activity', x: 50, y: 75 },
        { id: 'd3-s3', name: 'Britannia & Co', type: 'restaurant', x: 54, y: 70 },
        { id: 'd3-s4', name: 'Colaba Causeway', type: 'activity', x: 48, y: 80 },
        { id: 'd3-s5', name: 'Bademiyan', type: 'restaurant', x: 47, y: 82 },
      ],
    },
  ],
  jaipur: [
    {
      title: 'Walled City & Johari Bazaar',
      focus: 'Pink walls, gem traders, and the original Jaipur.',
      activities: [
        { time: 'Morning', icon: 'walk', title: 'Johari Bazaar at Opening Time', description: 'The jewellery market opens at 9am. Watch gem cutters work in tiny workshops above the shops. The craftsmanship is extraordinary.' },
        { time: 'Afternoon', icon: 'building', title: 'Hawa Mahal from the Back', description: 'Everyone photographs the front. Enter from the back lane — you can climb all five floors and look out through the 953 windows.' },
        { time: 'Evening', icon: 'temple', title: 'Govind Dev Ji Temple at Aarti', description: 'The evening aarti at 5:30pm draws thousands of devotees. The energy is electric. Stand at the back and watch.' },
      ],
      eateries: [
        { name: 'Rawat Mishtan Bhandar', type: 'street_food', specialty: 'Pyaaz Kachori & Mirchi Bada', rating: 4.8, neighbourhood: 'Station Road' },
        { name: 'Laxmi Misthan Bhandar', type: 'thali', specialty: 'Dal Baati Churma Thali', rating: 4.6, neighbourhood: 'Johari Bazaar' },
      ],
      map_stops: [
        { id: 'd1-s1', name: 'Johari Bazaar', type: 'activity', x: 52, y: 45 },
        { id: 'd1-s2', name: 'Hawa Mahal', type: 'activity', x: 54, y: 42 },
        { id: 'd1-s3', name: 'Rawat Mishtan', type: 'restaurant', x: 48, y: 50 },
        { id: 'd1-s4', name: 'Govind Dev Ji', type: 'activity', x: 50, y: 40 },
        { id: 'd1-s5', name: 'LMB Restaurant', type: 'restaurant', x: 53, y: 44 },
      ],
    },
    {
      title: 'Amber & Nahargarh Hills',
      focus: 'Hilltop forts, village life, and panoramic views.',
      activities: [
        { time: 'Morning', icon: 'mountain', title: 'Nahargarh Fort at Sunrise', description: 'Drive up before 6:30am. The fort is empty and the view of Jaipur waking up below is one of the best in Rajasthan.' },
        { time: 'Afternoon', icon: 'building', title: 'Amber Fort Village', description: 'Skip the main fort entrance and walk through the village below. Local families sell chai, and the fort walls loom above you.' },
        { time: 'Evening', icon: 'art', title: 'Anokhi Museum of Hand Printing', description: 'A beautiful haveli converted into a museum of block printing. Watch artisans work and buy directly from the workshop.' },
      ],
      eateries: [
        { name: 'Suvarna Mahal (Rambagh)', type: 'thali', specialty: 'Rajasthani Royal Thali', rating: 4.7, neighbourhood: 'Bhawani Singh Road' },
        { name: 'Tapri Central', type: 'cafe', specialty: 'Masala Chai & Maggi', rating: 4.5, neighbourhood: 'C-Scheme' },
      ],
      map_stops: [
        { id: 'd2-s1', name: 'Nahargarh Fort', type: 'activity', x: 35, y: 28 },
        { id: 'd2-s2', name: 'Amber Village', type: 'activity', x: 62, y: 22 },
        { id: 'd2-s3', name: 'Suvarna Mahal', type: 'restaurant', x: 45, y: 55 },
        { id: 'd2-s4', name: 'Anokhi Museum', type: 'activity', x: 60, y: 25 },
        { id: 'd2-s5', name: 'Tapri Central', type: 'restaurant', x: 50, y: 60 },
      ],
    },
  ],
};

// Fallback for cities without detailed mock data
const GENERIC_DAYS = (cityName: string) => [
  {
    title: 'Arrival & First Impressions',
    focus: `Land, settle in, and feel the pulse of ${cityName}.`,
    activities: [
      { time: 'Afternoon', icon: 'walk', title: `${cityName} Old Quarter Walk`, description: `Walk the oldest neighbourhood in ${cityName}. Ask a local shopkeeper for their favourite chai stall.` },
      { time: 'Evening', icon: 'food', title: 'Street Food Exploration', description: `Follow the crowds to the evening street food market. Order whatever looks busiest — that\'s always the best stall.` },
    ],
    eateries: [
      { name: 'Local Dhaba', type: 'dhaba' as const, specialty: 'Regional thali', rating: 4.4, neighbourhood: 'Old City' },
      { name: 'Chai Corner', type: 'chai_stall' as const, specialty: 'Cutting chai & biscuits', rating: 4.3, neighbourhood: 'Market area' },
    ],
    map_stops: [
      { id: 'd1-s1', name: 'Old Quarter', type: 'activity' as const, x: 30, y: 40 },
      { id: 'd1-s2', name: 'Street Food Market', type: 'activity' as const, x: 45, y: 50 },
      { id: 'd1-s3', name: 'Local Dhaba', type: 'restaurant' as const, x: 40, y: 45 },
    ],
  },
  {
    title: 'Culture & Hidden Gems',
    focus: 'Go deeper into the city\'s character.',
    activities: [
      { time: 'Morning', icon: 'temple', title: 'Local Temple or Heritage Site', description: `Visit the most significant heritage site in ${cityName} before the tourist rush at 9am.` },
      { time: 'Afternoon', icon: 'art', title: 'Local Art or Craft Market', description: 'Find the neighbourhood where artisans work. Watch them, talk to them, buy directly.' },
      { time: 'Evening', icon: 'building', title: 'Rooftop Sunset Spot', description: `Ask your hotel or a local for the best rooftop view in ${cityName}. Locals always know.` },
    ],
    eateries: [
      { name: 'Heritage Restaurant', type: 'thali' as const, specialty: 'Regional thali', rating: 4.5, neighbourhood: 'Heritage area' },
      { name: 'Artisan Café', type: 'cafe' as const, specialty: 'Local filter coffee', rating: 4.4, neighbourhood: 'Craft district' },
    ],
    map_stops: [
      { id: 'd2-s1', name: 'Heritage Site', type: 'activity' as const, x: 35, y: 35 },
      { id: 'd2-s2', name: 'Craft Market', type: 'activity' as const, x: 55, y: 55 },
      { id: 'd2-s3', name: 'Heritage Restaurant', type: 'restaurant' as const, x: 45, y: 42 },
      { id: 'd2-s4', name: 'Rooftop Spot', type: 'activity' as const, x: 60, y: 40 },
      { id: 'd2-s5', name: 'Artisan Café', type: 'restaurant' as const, x: 57, y: 57 },
    ],
  },
];

export function buildMockItinerary(params: MockParams): Itinerary {
  const { city, mood, duration, budget, style } = params;
  const cityKey = (city ?? 'delhi') as string;
  const cityName = cityKey.charAt(0).toUpperCase() + cityKey.slice(1);

  const dayTemplates = CITY_DAYS[cityKey] ?? GENERIC_DAYS(cityName);

  const days = Array.from({ length: duration }, (_, i) => {
    const tpl = dayTemplates[i % dayTemplates.length];
    return {
      day: i + 1,
      title: tpl.title,
      focus: tpl.focus,
      activities: tpl.activities,
      eateries: tpl.eateries,
      local_events: [
        { name: 'Evening Aarti', type: 'religious', time: 'Evening', description: 'A centuries-old ritual performed at the main ghat or temple every single evening.' },
      ],
      disruption_note: 'Check weather before heading out — monsoon months (Jun–Sep) can cause flash flooding in low-lying areas.',
      map_stops: tpl.map_stops.map(s => ({ ...s, id: `d${i + 1}-${s.id.split('-')[1]}` })),
    };
  });

  return {
    destination: cityName,
    city: (city ?? 'delhi'),
    duration,
    budget,
    mood: (mood ?? 'curious'),
    style,
    days,
  };
}
