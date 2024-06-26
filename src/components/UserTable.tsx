import React from 'react';
import User from '../models/User';


interface UserTableProps {
  users: User[];
  highlightOldest: boolean;
  oldestUsers: Record<string, string>;
}

const UserTable: React.FC<UserTableProps> = ({ users, highlightOldest, oldestUsers }) => {
    return (
        <div className="table-responsive-md px-5">
        <table className="table table-striped  caption-top">
        <caption className="text-dark">No of Users: <span className="badge text-primary fs-6">{users.length}</span></caption>
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Birthday</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {users.map(user => (
              <tr
                key={user.id}
                className={
                  highlightOldest && user.birthDate === oldestUsers[user.address.city]
                    ? 'table-primary'
                    : ''
                }
              >
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.address.city}</td>
                <td>{user.birthDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      );
};

export default UserTable;