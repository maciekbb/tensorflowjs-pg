import React, { useRef, useEffect, useState } from "react";
import { getNet } from "./getNet";

const classify = async (img: HTMLImageElement) => {
    const net = await getNet()
    return net.classify(img)
}

const ClassifiableImage = (props: {src: string}) => {
    const imgRef = useRef(null)
    const [cls, setCls] = useState()

    useEffect(() => {
        let didCancel = false;

        setCls(null);

        const img = imgRef.current;
        if (img) {
            classify(img).then((result) => {
                if (!didCancel) {
                    setCls(result.map(x => x.className).join(", "))
                }
            })
        }

        return () => {
            didCancel = true
        }
    }, [props.src])

    return <div>
        <img ref={imgRef} crossOrigin="anonymous" src={props.src} width="227" height="227"/>
        <p>{cls ? cls : "Classyfying..."}</p>
    </div>
}

export default ClassifiableImage
