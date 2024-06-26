
import { useMemo, useState } from 'react';
import useUserInfo from '../hooks/useUserInfo';
import UserTable from './UserTable';


const CRM = () => {
    const { users, loading, error } = useUserInfo();
    const [nameFilter, setNameFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');

  
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
        .includes(nameFilter.toLowerCase());
      const cityMatch = !cityFilter || user.address.city === cityFilter;
      
      return nameMatch && cityMatch;
    });
  }, [users, nameFilter, cityFilter]);

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
        </div>
        <div className="row mt-4 mb-3">
          <div className='col-md-8 offset-md-2 border border-3 border-secondary rounded-5 bg-light '>
            <UserTable 
              users={filteredUsers} 
            />
          </div>
      </div>
    </div>
  );

}


export default CRM;