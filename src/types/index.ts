export type PageId =
  | 'home'
  | 'afisha'
  | 'theaters'
  | 'concerts'
  | 'seats'
  | 'my-tickets'
  | 'scanner'
  | 'organizer'
  | 'profile'
  | 'about';

export type EventCategory =
  | 'Konsert'
  | 'Teatr'
  | 'Opera & Balet'
  | 'Klassika'
  | 'Jazz'
  | 'Stand Up'
  | 'Bolalar uchun'
  | 'Ko\'rgazma';

export interface Organizer {
  id: string;
  name: string;
  role: string;
  avatar: string;
  verified: boolean;
  storyVideo?: string;
  storyTitle?: string;
}

export interface SeatingTier {
  price: number;
  desc: string;
  color?: string;
}

export interface SahnaEvent {
  id: string;
  title: string;
  subtitle: string;
  category: EventCategory;
  date: string;
  rawDate: string;
  dayOfWeek: string;
  time: string;
  duration: string;
  language: string;
  ageLimit: string;
  venue: string;
  city: 'Toshkent' | 'Samarqand' | 'Buxoro';
  minPrice: number;
  maxPrice: number;
  image: string;
  gallery?: string[];
  description: string;
  organizer: Organizer;
  status: 'available' | 'few_left' | 'sold_out' | 'free';
  fewLeftCount?: number;
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  isUpcomingSoon?: boolean;
  countdownSeconds?: number;
  seatingTiers: {
    vip: SeatingTier;
    premium: SeatingTier;
    standart: SeatingTier;
  };
  program?: string[];
  cast?: { role: string; actor: string }[];
}

export interface Theater {
  id: string;
  name: string;
  shortName: string;
  type: string;
  city: string;
  founded: number;
  capacity: number;
  director: string;
  address: string;
  phone: string;
  image: string;
  description: string;
  features: string[];
  repertoireEventIds: string[];
}

export interface ConcertVenue {
  id: string;
  name: string;
  type: string;
  capacity: number;
  address: string;
  image: string;
  description: string;
  upcomingEventCount: number;
}

export interface Seat {
  id: string;
  sector: 'VIP Loja' | 'Parter' | 'Amfiteatr' | 'Balkon';
  row: number;
  number: number;
  price: number;
  status: 'available' | 'selected' | 'reserved' | 'sold';
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  eventId: string;
  eventTitle: string;
  eventCategory: string;
  venue: string;
  date: string;
  time: string;
  sector: string;
  row: number;
  seat: number;
  price: number;
  buyerName: string;
  buyerPhone: string;
  purchaseDate: string;
  status: 'active' | 'used' | 'cancelled';
  qrCodeValue: string;
}

export interface Story {
  id: string;
  organizerName: string;
  organizerRole: string;
  avatar: string;
  videoPoster: string;
  title: string;
  duration: string;
  eventId: string;
}
