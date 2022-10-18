import {useEffect, useRef} from 'react'
import type { NextPage } from 'next'
import { Video } from '../components/Video'

const Home: NextPage = () => {
  const workerRef = useRef<Worker>(null);
  useEffect(() => {
    // @ts-ignore
    workerRef.current = new Worker(new URL('../compressor.ts', import.meta.url), {type: 'module'});
    workerRef.current.onmessage = (ev: MessageEvent<any>) => {
      console.log(`Worker Compressor.ts: ${ev.data}`)
    }

    return () => {
      workerRef.current?.terminate();
    }
  })

  const postMessage = (data: any) => {
    workerRef.current?.postMessage(data)
  }

  return (
    <div>
        <h1>Video Compressor</h1>
        <Video process={postMessage}/>
    </div>
  )
}

export default Home
