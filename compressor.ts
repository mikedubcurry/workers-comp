import {createFFmpeg} from '@ffmpeg/ffmpeg'


console.log("inside compressor.ts")

addEventListener('message', (ev: MessageEvent<any>) => {
    postMessage(ev.data)
    console.log(ev.data)
    compress(ev.data).then(() => {
        console.log('good to go')
    });
})

async function compress(blobURL: string) {
    const ffmpeg = createFFmpeg({log: true})
    await ffmpeg.load();


    const sourceBuffer = await fetch(blobURL.slice(5), {
        headers: {
            'Cross-Origin-Opener-Policy': 'same-origin',
            'Cross-Origin-Embedder-Policy': 'require-corp'
        }
    }).then(r => r.arrayBuffer());
    console.log({sourceBuffer})
    
}
