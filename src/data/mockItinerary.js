export const tokyoMockData = {
  destination: "Tokyo, Japan",
  duration: 7,
  budget: "$2,000 USD",
  style: "Couple",
  vibes: ["Adventure", "Food & Cuisine", "Off-the-beaten-path"],
  constraints: ["Vegetarian-friendly", "Avoid tourist traps"],
  days: [
    {
      day: 1,
      title: "Arrival & The Geisha District",
      focus: "Landing softly and soaking in historic elegance.",
      activities: [
        {
          time: "Afternoon",
          icon: "flight",
          title: "Arrival at HND/NRT",
          description: "Arrive at airport (mid-day flight). Take the Airport Limousine Bus or Narita Express to the city. Check into a boutique hotel or modern ryokan in Kagurazaka (e.g., Boutique Hotel Ryokan or Unplan Kagurazaka)."
        },
        {
          time: "Evening",
          icon: "walk",
          title: "Explore Kagurazaka",
          description: "Explore the winding, cobblestone alleys of Kagurazaka, historically a geisha district. The area is filled with hidden shrines and traditional architecture."
        },
        {
          time: "Dinner",
          icon: "food",
          title: "Kagurazaka Kado",
          description: "A traditional Japanese house offering vegetarian-friendly seasonal dishes in a deeply atmospheric, local setting."
        }
      ],
      tips: "Jet lag is real. Keep tonight strictly to walking your local neighborhood."
    },
    {
      day: 2,
      title: "West Tokyo Indie Culture",
      focus: "Vintage shopping, records, and bohemian Tokyo.",
      activities: [
        {
          time: "Morning",
          icon: "walk",
          title: "Shimokitazawa",
          description: "Take the subway to Shimokitazawa. Skip Harajuku (too touristy) and explore 'Shimokita' for high-end vintage clothing, indie cafes, and record stores."
        },
        {
          time: "Afternoon",
          icon: "train",
          title: "Koenji",
          description: "Walk or take a short train to Koenji. Even grittier and more authentic than Shimokita, Koenji is the heart of Tokyo's underground music and art scene."
        },
        {
          time: "Evening",
          icon: "nature",
          title: "Inokashira Park",
          description: "Head to Kichijoji and walk through the beautiful Inokashira Park at dusk."
        },
        {
          time: "Dinner",
          icon: "food",
          title: "Deva Deva Cafe",
          description: "Located in Kichijoji (Excellent vegan burgers and organic bowls) or find a cozy spot in Harmonica Yokocho."
        }
      ],
      tips: "Stores in West Tokyo don't open until 11:00 AM or 12:00 PM. Have a slow morning coffee before heading out."
    },
    {
      day: 3,
      title: "The Urban Mountain Adventure",
      focus: "Nature, hiking, and traditional temple food.",
      activities: [
        {
          time: "Morning",
          icon: "mountain",
          title: "Mount Takao (Trail 6)",
          description: "Take the early Keio Line out to Takaosanguchi Station. Avoid Trail 1. Take Trail 6 (Biwa Waterfall Trail)—it's unpaved, follows a stream, and feels like a real woodland adventure."
        },
        {
          time: "Afternoon",
          icon: "relax",
          title: "Summit & Onsen",
          description: "Reach the summit for views of Mt. Fuji (clear days only). Descend and soak your tired muscles at Keio Takaosan Onsen Gokurakuyu (a natural hot spring)."
        },
        {
          time: "Dinner",
          icon: "food",
          title: "Ukai Toriyama",
          description: "Near Mt. Takao. Reserve in advance and specify vegetarian/vegan; they will prepare a stunning multi-course vegetable meal in private traditional pavilions."
        }
      ],
      tips: "Avoid doing this on a weekend. Go on a Tuesday or Wednesday to avoid local crowds."
    },
    {
      day: 4,
      title: "\"Shitamachi\" & Craftsmanship",
      focus: "Traditional Tokyo, away from the neon lights.",
      activities: [
        {
          time: "Morning",
          icon: "walk",
          title: "Yanesen (Old Town)",
          description: "Explore Yanesen (Yanaka, Nezu, and Sendagi). Walk down Yanaka Ginza shopping street."
        },
        {
          time: "Afternoon",
          icon: "temple",
          title: "Nezu Shrine",
          description: "Visit Nezu Shrine. It has a stunning tunnel of vermilion torii gates just like Kyoto's Fushimi Inari, but with a fraction of the tourists."
        },
        {
          time: "Evening",
          icon: "shop",
          title: "Kappabashi Kitchen Town",
          description: "This is where Tokyo's chefs buy their gear. Buy a world-class Japanese chef's knife as a souvenir."
        },
        {
          time: "Dinner",
          icon: "food",
          title: "T's Tantan",
          description: "Inside Ueno or Tokyo Station. World-famous, mind-blowing vegan ramen with a rich sesame broth."
        }
      ],
      tips: "Kappabashi stores close early; prioritize shopping before 4:30 PM."
    },
    {
      day: 5,
      title: "Modern Art & High-End Zen",
      focus: "Immersive art and world-class Buddhist cuisine.",
      activities: [
        {
          time: "Morning",
          icon: "art",
          title: "TeamLab Planets",
          description: "Book the very first time slot (9:00 AM) to beat the crowds for this incredible immersive art experience."
        },
        {
          time: "Lunch",
          icon: "food",
          title: "Vegan Ramen UZU",
          description: "Located right outside TeamLab in a spectacular mirrored outdoor art space."
        },
        {
          time: "Afternoon",
          icon: "boat",
          title: "Sumida River Cruise",
          description: "Take the water bus (Tokyo Cruise) up the Sumida River for a unique perspective of the city."
        },
        {
          time: "Dinner",
          icon: "star",
          title: "Daigo (2 Michelin Stars)",
          description: "An incredible, unforgettable experience of Shojin Ryori (traditional Buddhist vegetarian cuisine). Reservations required months in advance."
        }
      ],
      tips: "If TeamLab is sold out, visit the Nezu Museum in Aoyama instead for brilliant pre-modern Japanese art."
    },
    {
      day: 6,
      title: "The Hidden Ravine & Aesthetic Tokyo",
      focus: "Pure hidden gems and modern architecture.",
      activities: [
        {
          time: "Morning",
          icon: "nature",
          title: "Todoroki Valley",
          description: "The only natural ravine in the 23 wards of Tokyo. Step down from a city street into a lush canopy with a river and traditional tea house."
        },
        {
          time: "Afternoon",
          icon: "building",
          title: "Daikanyama",
          description: "Train to Daikanyama. Incredibly sleek architecture. Visit Daikanyama T-Site, frequently voted one of the most beautiful bookstores in the world."
        },
        {
          time: "Evening",
          icon: "walk",
          title: "Nakameguro",
          description: "Walk down to Nakameguro along the Meguro River."
        },
        {
          time: "Dinner",
          icon: "food",
          title: "Alaska Zwei",
          description: "A very popular, cozy 100% vegan cafe/restaurant with a local vibe in Nakameguro."
        }
      ],
      tips: "Todoroki Valley is a true hidden gem that the average tourist completely misses."
    },
    {
      day: 7,
      title: "Departure & Slow Morning",
      focus: "Last-minute aesthetics and relaxed farewell.",
      activities: [
        {
          time: "Morning",
          icon: "coffee",
          title: "Omotesando Backstreets",
          description: "Sleep in. Explore the sophisticated back-alleys (Ura-Harajuku) for independent boutiques and coffee. Skip Takeshita Street."
        },
        {
          time: "Lunch",
          icon: "food",
          title: "Brown Rice",
          description: "By Neal's Yard Remedies. Beautiful, whole-food vegetarian Japanese set meals."
        },
        {
          time: "Afternoon",
          icon: "flight",
          title: "Departure",
          description: "Head back to the hotel, grab your luggage, and take the express train to the airport."
        }
      ],
      tips: "Enjoy your last day! Make sure your Suica card balance is refunded or save it for your next trip."
    }
  ]
};
