import React, { useState, useEffect } from 'react';
import { PageId, SahnaEvent, Story, Ticket, Seat } from './types';
import { initialEvents, initialTickets, theatersData, concertVenuesData, stories } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StoryModal } from './components/StoryModal';
import { EventDetailModal } from './components/EventDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { CartDrawer } from './components/CartDrawer';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { HomePage } from './pages/HomePage';
import { AfishaPage } from './pages/AfishaPage';
import { TheatersPage } from './pages/TheatersPage';
import { ConcertsPage } from './pages/ConcertsPage';
import { SeatSelectionPage } from './pages/SeatSelectionPage';
import { MyTicketsPage } from './pages/MyTicketsPage';
import { ScannerPage } from './pages/ScannerPage';
import { OrganizerPage } from './pages/OrganizerPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [events, setEvents] = useState<SahnaEvent[]>(() => {
    try {
      const saved = localStorage.getItem('sahna_events');
      return saved ? JSON.parse(saved) : initialEvents;
    } catch {
      return initialEvents;
    }
  });

  const [tickets, setTickets] = useState<Ticket[]>(() => {
    try {
      const saved = localStorage.getItem('sahna_tickets');
      return saved ? JSON.parse(saved) : initialTickets;
    } catch {
      return initialTickets;
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sahna_favorites');
      return saved ? JSON.parse(saved) : ['simfoniya-mavsum-ochilishi', 'oqqush-koli-baleti'];
    } catch {
      return ['simfoniya-mavsum-ochilishi', 'oqqush-koli-baleti'];
    }
  });

  const [cartSeats, setCartSeats] = useState<{ event: SahnaEvent; seat: Seat }[]>([]);
  const [selectedCity, setSelectedCity] = useState<'Toshkent' | 'Samarqand' | 'Buxoro'>('Toshkent');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Active selections
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [detailEvent, setDetailEvent] = useState<SahnaEvent | null>(null);
  const [activeSeatEvent, setActiveSeatEvent] = useState<SahnaEvent | null>(null);
  const [checkoutSeats, setCheckoutSeats] = useState<Seat[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('sahna_events', JSON.stringify(events));
    } catch {}
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem('sahna_tickets', JSON.stringify(tickets));
    } catch {}
  }, [tickets]);

  useEffect(() => {
    try {
      localStorage.setItem('sahna_favorites', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleFavorite = (event: SahnaEvent) => {
    if (favorites.includes(event.id)) {
      setFavorites(favorites.filter((id) => id !== event.id));
      showToast(`"${event.title}" sevimlilardan olib tashlandi`);
    } else {
      setFavorites([...favorites, event.id]);
      showToast(`"${event.title}" sevimlilarga qo'shildi ❤️`);
    }
  };

  const handleSelectSeats = (event: SahnaEvent) => {
    setActiveSeatEvent(event);
    setCurrentPage('seats');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToCheckout = (selectedSeats: Seat[]) => {
    if (!activeSeatEvent) return;
    setCheckoutSeats(selectedSeats);
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = (newTickets: Ticket[]) => {
    setTickets((prev) => [...newTickets, ...prev]);
    setIsCheckoutOpen(false);
    setActiveSeatEvent(null);
    setCheckoutSeats([]);
    // Remove from cart if any
    setCartSeats([]);
    setCurrentPage('my-tickets');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRefundTicket = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: 'cancelled' } : t))
    );
    showToast('Chipta bekor qilindi va 100% pul qaytarish jarayoni boshlandi');
  };

  const handleMarkTicketUsed = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: 'used' } : t))
    );
  };

  const handleAddNewEvent = (newEvent: SahnaEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  const activeTicketsCount = tickets.filter((t) => t.status === 'active').length;
  const favoriteEvents = events.filter((e) => favorites.includes(e.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0907] text-[#f4efe8] selection:bg-[#c99b45]/30 selection:text-[#f3d99d]">
      {/* Universal Header */}
      <Header
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        favoritesCount={favorites.length}
        cartCount={cartSeats.length}
        activeTicketsCount={activeTicketsCount}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
      />

      {/* Main Pages Switcher */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            events={events}
            stories={stories}
            theaters={theatersData}
            onSelectEvent={(e) => setDetailEvent(e)}
            onSelectSeats={handleSelectSeats}
            onOpenStory={(s) => setActiveStory(s)}
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentPage === 'afisha' && (
          <AfishaPage
            events={events}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectEvent={(e) => setDetailEvent(e)}
            onSelectSeats={handleSelectSeats}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentPage === 'theaters' && (
          <TheatersPage
            theaters={theatersData}
            events={events}
            onSelectEvent={(e) => setDetailEvent(e)}
            onSelectSeats={handleSelectSeats}
          />
        )}

        {currentPage === 'concerts' && (
          <ConcertsPage
            venues={concertVenuesData}
            events={events}
            onSelectEvent={(e) => setDetailEvent(e)}
            onSelectSeats={handleSelectSeats}
          />
        )}

        {currentPage === 'seats' && activeSeatEvent && (
          <SeatSelectionPage
            event={activeSeatEvent}
            onBack={() => {
              setCurrentPage('afisha');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onProceedToCheckout={handleProceedToCheckout}
          />
        )}

        {currentPage === 'my-tickets' && (
          <MyTicketsPage
            tickets={tickets}
            onRefundTicket={handleRefundTicket}
            onNavigateToAfisha={() => {
              setCurrentPage('afisha');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'scanner' && (
          <ScannerPage
            tickets={tickets}
            onMarkTicketUsed={handleMarkTicketUsed}
          />
        )}

        {currentPage === 'organizer' && (
          <OrganizerPage
            events={events}
            onAddNewEvent={handleAddNewEvent}
            onNavigateToScanner={() => {
              setCurrentPage('scanner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'profile' && (
          <ProfilePage
            tickets={tickets}
            onNavigate={(p) => {
              setCurrentPage(p);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'about' && <AboutPage />}
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modals & Overlays */}
      <StoryModal
        story={activeStory}
        onClose={() => setActiveStory(null)}
        onBookEvent={(eventId) => {
          const ev = events.find((e) => e.id === eventId);
          if (ev) handleSelectSeats(ev);
        }}
        events={events}
      />

      <EventDetailModal
        event={detailEvent}
        onClose={() => setDetailEvent(null)}
        onSelectSeats={handleSelectSeats}
        isFavorite={detailEvent ? favorites.includes(detailEvent.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {activeSeatEvent && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          event={activeSeatEvent}
          selectedSeats={checkoutSeats}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartSeats={cartSeats}
        onRemoveItem={(seatId) => setCartSeats(cartSeats.filter((i) => i.seat.id !== seatId))}
        onCheckout={() => {
          if (cartSeats.length > 0) {
            setActiveSeatEvent(cartSeats[0].event);
            setCheckoutSeats(cartSeats.map((c) => c.seat));
            setIsCheckoutOpen(true);
          }
        }}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favoriteEvents}
        onRemoveFavorite={(eventId) => setFavorites(favorites.filter((id) => id !== eventId))}
        onBookEvent={(eventId) => {
          const ev = events.find((e) => e.id === eventId);
          if (ev) handleSelectSeats(ev);
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-2xl bg-[#d4af37] text-black text-xs font-bold shadow-2xl animate-in slide-in-from-bottom-2">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
