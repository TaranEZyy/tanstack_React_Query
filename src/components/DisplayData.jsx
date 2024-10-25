import { useQuery, useQueryClient } from '@tanstack/react-query';

function Users() {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // Check the query cache
//   const queryCache = queryClient.getQueryCache();
//   const cachedData = queryClient.getQueryData(['users']); // Get cached data

//   console.log('Is data cached?', cachedData !== undefined);
//   console.log('Cached data:', cachedData);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Users List</h1>
      <div>
        {data.map(user => (
          <button style={{padding:"10px",margin:"3px",backgroundColor:"pink"}} key={user.id}>{user.name}</button> 
        ))}
      </div>
    </div>
  );
}

export default Users;
