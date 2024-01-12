import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase config details here
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const Booking = () => {
  const [user, setUser] = useState(null);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        loadBookings(currentUser.uid);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const loadBookings = (userId) => {
    db.collection('bookings')
      .where('userId', '==', userId)
      .onSnapshot((querySnapshot) => {
        const bookingsData = [];
        querySnapshot.forEach((doc) => {
          bookingsData.push({ id: doc.id, ...doc.data() });
        });
        setBookings(bookingsData);
      });
  };

  const handleBooking = async () => {
    if (!user) {
      // Redirect to login or handle authentication error
      return;
    }
    try {
      const newBookingRef = await db.collection('bookings').add({
        source,
        destination,
        userId: user.uid,
        // Other booking details
      });
      console.log('Booking successful. ID:', newBookingRef.id);
      setSource('');
      setDestination('');
    } catch (error) {
      console.error('Error adding booking:', error);
      // Handle error, show error message to the user
    }
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      setUser(null);
      setBookings([]);
    }).catch((error) => {
      console.error('Sign out error:', error);
      // Handle sign-out error
    });
  };

  return (
    <div>
      {user ? (
        <>
          <h2>Welcome, {user.email}!</h2>
          <button onClick={handleSignOut}>Sign Out</button>
          <div>
            <input
              type="text"
              placeholder="Source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <button onClick={handleBooking}>Book Ticket</button>
          </div>
          <h3>Your Bookings:</h3>
          <ul>
            {bookings.map((booking) => (
              <li key={booking.id}>
                Source: {booking.source}, Destination: {booking.destination}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <button onClick={() => auth.signInAnonymously()}>Sign In Anonymously</button>
      )}
    </div>
  );
};

export default Booking;
