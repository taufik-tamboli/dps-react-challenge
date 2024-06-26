import axios from "axios";
import { useEffect, useState } from "react";
import User from "../models/User";


// This is a custom hook which i created to use with useEffect to fetch user data when the component mounts.
  const useUserInfo = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const response = await axios.get('https://dummyjson.com/users');
          setUsers(response.data.users);
          setError(null);
        } catch (error) {
          console.error('Error fetching users:', error);
          setError(error instanceof Error ? error : new Error('An error occurred'));
        } finally {
          setLoading(false);
        }
      };
  
      fetchUsers();
    }, []);
  
    return { users, loading, error };
  };
  
  export default useUserInfo;