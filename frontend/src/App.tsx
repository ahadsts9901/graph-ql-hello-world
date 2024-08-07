import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';


const App = () => {

  const query = gql`
    query GetTodosWithUser {
      getTodos {
        id
        title
        completed
        user {
          id
          username
          email
        }
      }
    }
  `
  const { data, error, loading } = useQuery(query)

  useEffect(() => {
    if (error) console.error(error)
  }, [])

  if (loading) return <h1>Loading...</h1>

  console.log(data)

  return (
    <table border={1} style={{
      borderCollapse: "collapse"
    }}>
      <tbody>
        <tr>
          <th style={{ padding: "0.2em" }}>id</th>
          <th style={{ padding: "0.2em" }}>todo</th>
          <th style={{ padding: "0.2em" }}>is completed</th>
          <th style={{ padding: "0.2em" }}>user id</th>
          <th style={{ padding: "0.2em" }}>user name</th>
          <th style={{ padding: "0.2em" }}>user email</th>
        </tr>
        {
          data?.getTodos?.map((todo: any, i: number) => (
            <tr key={i}>
              <td style={{ padding: "0.2em" }}>{todo?.id}</td>
              <td style={{ padding: "0.2em" }}>{todo?.title}</td>
              <td style={{ padding: "0.2em" }}>{todo?.isCompeted ? "completed" : "not completed"}</td>
              <td style={{ padding: "0.2em" }}>{todo?.user?.id}</td>
              <td style={{ padding: "0.2em" }}>{todo?.user?.username}</td>
              <td style={{ padding: "0.2em" }}>{todo?.user?.email}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default App