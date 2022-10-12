import type { NextPage } from 'next'
import { Video } from '../components/Video'

const Home: NextPage = () => {
  return (
    <div>
        <h1>Video Compressor</h1>
        <Video />
    </div>
  )
}

export default Home
