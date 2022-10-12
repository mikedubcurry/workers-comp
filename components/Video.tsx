import { useEffect, useReducer, useRef, useState } from "react"

export function Video({process}: {process: (data: any) => void}) {
    const [currentlyRecording, setRecording] = useState(false);
    const [recordedData, setData] = useState<string|null>(null);
    const ref = useRef<HTMLVideoElement>(null);
    const recorderRef = useRef<MediaRecorder>(null);

    useEffect(() => {
        let stm: MediaStream;
        navigator.mediaDevices.getUserMedia({video: {facingMode: 'environment'}, audio: true}).then(stream => {
            if(ref.current) {
                stm = stream;
                ref.current.srcObject = stream.clone();
                // @ts-ignore
                recorderRef.current = new MediaRecorder(stream);
            }
        })

        const video = ref.current;
        const recorder = recorderRef.current;
        return () => {
            if(stm)
            stm.getTracks().forEach(track => {
                 track.stop();
            })
        }
    }, []);

    const record = () => {
        if(!currentlyRecording) {
            setRecording(true);
            if(recorderRef.current) {
                const data: Blob[] = [];
                recorderRef.current.ondataavailable = (ev: BlobEvent) => {
                    data.push(ev.data);
                }

                const done = new Promise((resolve, reject) => {
                    if(recorderRef.current) {
                        recorderRef.current.onstop = resolve;
                        recorderRef.current.onerror = err => reject(err.name);
                    
                    }
                })

                done.then(() => {
                    const blob = new Blob(data, { type: 'video/mp4' });
                    setData(URL.createObjectURL(blob));
                    process(blob)
                })

                recorderRef.current.start();
            }
        } else {
            setRecording(false);
            if(recorderRef.current) {
                recorderRef.current.stop();
            }
        }
    }
    
//   useEffect(() => {
//           if(recordedData) {
//           process(recordedData);
//           }
//           }, [recordedData])

    return (
    <>
        <video ref={ref} autoPlay controls playsInline />
        <button onClick={record} >{currentlyRecording ? 'Stop' : 'Record'}</button>
        {recordedData && <PreviewVideo src={recordedData}/> }
    </>
    );
}





function PreviewVideo({src}: {src: string}) {
    return (
        <>
            <video src={src} autoPlay playsInline controls loop/>
        </>
    )
}










