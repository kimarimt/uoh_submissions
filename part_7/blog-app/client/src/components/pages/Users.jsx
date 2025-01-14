import { useUsers } from '../../hooks/user'

const Users = () => {
  const { data: users, isPending, error } = useUsers()

  return (
    <>
      {error && <p>{error.message}</p>}
      {isPending && <p>Users loading...</p>}
      {users && (
        <>
          <h2>Users</h2>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Blogs Created</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.blogs.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  )
}

export default Users
