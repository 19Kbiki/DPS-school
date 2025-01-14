export const navBarItems = [
    { name: "Home", url: "/" },
    { name: "About", url: "/#about" },
    { name: "FAQ", url: "/#faq" },
]

export const heroSections = {
    title: {
        centreTagline: { top: "The great memories of school", main: "MEMORY LANE 2K25", bottom: "Nostalgia Feeling" },
        subTitle: "Where the great memories of school come to life.",
        footer: "Siliguri, 5th April 2025"
    },
    backgroundImage: "",
    buttons: [
        { type: "primary", name: "Register Now", url: "/register" },
        { type: "secondary", name: "Read more", url: "/#about" },
    ]
}

export const aboutSection = {
    title: { main: "ABOUT THE EVENT" },
    mobile: [`
       Step into cherished memories at our Alumni Meetup, where past bonds come alive. Reconnect with classmates, 
           reminisce about school days, and celebrate personal milestones. With fun activities and a warm atmosphere, 
        this event blends nostalgia with excitement. Join us for a day of joy, camaraderie, and unforgettable moments!`
    ],
    desktop: [
        `Step into the cherished moments of the past with our Alumni Meetup, a celebration of the bonds and memories
        forged during school days. This event is a journey down Memory Lane, where the laughter, friendships, and 
        stories of the good old days come alive.`,
        `Reconnect with classmates, reminisce about shared experiences, and celebrate the milestones you’ve achieved 
        since those formative years. Whether it's revisiting tales from the classroom or celebrating the achievements 
        of your batch, this meetup is an opportunity to relive the great memories of school and create new ones.`,
        `With a thoughtfully curated itinerary, engaging activities, and a warm atmosphere, this event promises a 
        perfect blend of nostalgia and excitement. Take your first steps towards rekindling old connections and 
        making this gathering an unforgettable experience.`,
        `Join us for a day filled with joy, camaraderie, and heartfelt moments!`
    ]
}

export const memoryLaneExpSection = {
    title: { main: "MEMORY LANE EXPERIENCE" },
    cards: [
        {
            title: "Meet and Greet",
            content: "Introductions, casual conversations, icebreakers, warm welcomes, handshakes, first impressions."
        }, {
            title: "Games and Fun",
            content: "Team challenges, friendly competition, laughter, creative activities, bonding moments"
        }, {
            title: "Drinks and Dance",
            content: "Cocktails, music, dancing, laughter, energy, celebration, friends, fun, party vibes."
        }
    ]
}

export const locationsSection = {
    title: "LOCATION",
    hotelName: "Siliguri",
    hotelAddress: "Hill Cart Rd, Ward 6, Siliguri, West Bengal 734001",
    roomName: "Conference Room",
    roomAddress: "Address, Siliguri, 560103",
    image: ""
}

export const midBanner = {
    image: "",
    tagline: {
        title: "Delhi Public School, Siliguri",
        subTitle: `-"service before self"`
    }
}

export const itinerarySection = {
    title: { main: "ITINERARY" },
    items: [
        "5:30 PM: Registration and collection of name tags & coupons",
        "6:00 PM: Welcome speech by the core committee",
        "6:00 - 8:00 PM: Fun activities including musical chairs, housie, and trivia",
        "8:00 PM: Award ceremony with spot voting for categories such as Best Dressed and Best Looking",
        "9:00 PM: Dinner service begins",
    ]
}

export const faqSection = {
    title: { main: "FAQ" },
    description: "No, but we are planning to visit school next day for photo session. Timings will be provided after " +
        "confirmation from school",

    items: [
        {
            q: "is school involved?",
            a: " No, but we are planning to visit school next day for photo session. Timings will be provided after " +
                "confirmation from school"

        },

        {
            q: "What is the reporting time?",
            a: " The reporting time is 5:00 PM IST "
        },
        {
            q: "Is stay arranged for the event?",
            a: "Yes, stay is arranged. You need to select the Event and Stay option during registration. A Core Team member will contact you with further details."
        },
        {
            q: "Is transportation arranged from NJP Station or Bagdogra Airport?",
            a: " No, transportation is not arranged from these locations."
        },
        {
            q: "Who are the points of contact?",
            a: "Sourabh Dutta: +91 9632321371 , Akul Saurabh: +91 9968336459"
        },
    ]
}