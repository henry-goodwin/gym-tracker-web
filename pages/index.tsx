import { withUrqlClient } from 'next-urql'
import NavBar from '../components/NavBar'
import { createUrqlClient } from '../utils/createUrqlClient'

const Index = () => {
  return (
    <div>
      <NavBar />
      <h1>Index</h1>
    </div>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
