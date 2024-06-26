
import { useEffect, useMemo, useState } from 'react';
import useUserInfo from '../hooks/useUserInfo';
import UserTable from './UserTable';


const CRM = () => {

    const { users, loading, error } = useUserInfo();
    const [nameFilter, setNameFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [highlightOldest, setHighlightOldest] = useState(false);
    const [debouncedNameFilter, setDebouncedNameFilter] = useState('');

  
  /* Created a memoized list of unique cities
 The cities array contains unique, sorted city names of the users.
 */
  const cities = useMemo(() => {
    const citySet = new Set(users.map(user => user.address.city));
    return Array.from(citySet).sort();
  }, [users]);


  /* filter for the user list
  filteredUsers is a memoized array that created and applies to first or last name.
  */
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const nameMatch = (user.firstName + ' ' + user.lastName)
        .toLowerCase()
        .includes(debouncedNameFilter.toLowerCase());
      const cityMatch = !cityFilter || user.address.city === cityFilter;
      
      return nameMatch && cityMatch;
    });
  }, [users, debouncedNameFilter, cityFilter]);

  /* Found the oldest user for each city and stores the oldest birthdate for each city.
  */
  const oldestUsers = useMemo(() => {
    const cityOldest: Record<string, string> = {};
    filteredUsers.forEach(user => {
      const city = user.address.city;
      if (!cityOldest[city] || new Date(user.birthDate) < new Date(cityOldest[city])) {
        cityOldest[city] = user.birthDate;
      }
    });
    return cityOldest;
  }, [filteredUsers]);

  /* custom debounce effect added */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedNameFilter(nameFilter);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [nameFilter]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mt-4 mb-5 border border-3 border-light bg-dark rounded-5">
        <div className="row mt-5">
          <div className="col-md-3 offset-md-2 ">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              onChange={e => setNameFilter(e.target.value)}
            />
          </div>
          <div className="col-md-3">
          <select className="form-select" onChange={e => setCityFilter(e.target.value)}>
            <option value="">Select city</option>
            {cities.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3 pt-2">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="highlightOldest"
              checked={highlightOldest}
              onChange={e => setHighlightOldest(e.target.checked)}
            />
            <label className="form-check-label text-white" htmlFor="highlightOldest" style={{marginLeft:"-5rem"}}>
              Highlight oldest per city
            </label>
          </div>
        </div>
        </div>
        <div className="row mt-4 mb-3">
          <div className='col-md-8 offset-md-2 border border-3 border-secondary rounded-5 bg-light '>
            <UserTable 
              users={filteredUsers} 
              highlightOldest={highlightOldest} 
              oldestUsers={oldestUsers} 
            />
          </div>
      </div>
    </div>
  );

}


export default CRM;
