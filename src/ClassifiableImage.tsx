import React, { useRef, useEffect, useState } from "react";
import useNet from "./useNet";


const ClassifiableImage = (props: {src: string}) => {
    const imgRef = useRef<HTMLImageElement>(null)
    const [cls, setCls] = useState()
    const net = useNet();

    useEffect(() => {
        let didCancel = false;

        setCls(null);

        const img = imgRef.current;
        if (net && img) {
            net.classify(img).then((result) => {
                if (!didCancel) {
                    setCls(result.map(x => x.className).join(", "))
                }
            })
        }

        return () => {
            didCancel = true
        }
    }, [props.src, net])

    return <div>
        <img ref={imgRef} crossOrigin="anonymous" src={props.src} width="227" height="227"/>
        <p>{cls ? cls : "Classyfying..."}</p>
    </div>
}

export default ClassifiableImage
