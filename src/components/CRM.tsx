
import useUserInfo from '../hooks/useUserInfo';


const CRM = () => {
    const { users, loading, error } = useUserInfo();
    console.log(users) //- fetched the data successfully from - https://dummyjson.com/users

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <></>
  );

}


export default CRM;