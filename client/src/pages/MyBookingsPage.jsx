import React, { useState } from 'react'; 
import { RefreshCw } from 'lucide-react';

//import BookingStats from '../components/MyBookingsPage/BookingStats';
import BookingFilters from '../components/MyBookingsPage/BookingFilters';
import BookingCard from '../components/MyBookingsPage/BookingCard';
import EmptyState from '../components/MyBookingsPage/EmptyState';

import { USER_BOOKINGS } from '../components/MyBookingsPage/constants';
import { filterBookings } from '../components/MyBookingsPage/utils';

const MyBookingsPage = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState(USER_BOOKINGS);  //TODO: replace with API data

  // Calculate filtered bookings and stats
  const filteredBookings = filterBookings(bookings, searchTerm, statusFilter);
  //const stats = calculateBookingStats(bookings);

  // Refresh the local demo dataset. Replace this with an authenticated API call
  // when the booking dashboard is connected to the production backend.
  const handleRefresh = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setBookings(USER_BOOKINGS);
    setLoading(false);
  };

  return (
    <div className="pt-25 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
              <p className="text-gray-600">Manage and track your hotel reservations</p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                loading
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
              }`}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* Stats Cards */}
          {/* <BookingStats stats={stats} /> */}

          {/* Filters */}
          <BookingFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <EmptyState searchTerm={searchTerm} statusFilter={statusFilter} />
          ) : (
            filteredBookings.map(booking => (
              <BookingCard
                key={booking.id}
                booking={booking}
              />
            ))
          )}
        </div>

        {/* Load More (for future pagination) */}
        {filteredBookings.length > 0 && (
          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200">
              Load More Bookings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
