export {}

console.log("inside compressor.ts")

addEventListener('message', (ev: MessageEvent<any>) => {
    postMessage(ev.data)
    console.log(ev.data)
})

