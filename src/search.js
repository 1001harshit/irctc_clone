// SearchTrains.js
import React from 'react';
import { Link } from 'react-router-dom';

const SearchTrains = () => {
  return (
    <div>
      <h2>Search Trains</h2>
      {/* Your search form goes here */}
      <form>
        {/* Form fields go here */}
        <button type="submit">Search</button>
      </form>

      {/* Navigation bar */}
      <nav>
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          {/* Add more navigation items as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default SearchTrains;
