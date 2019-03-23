import { useEffect, useRef, useState } from "react";
import { getNet } from "./getNet";
import { MobileNet } from "@tensorflow-models/mobilenet";

const useNet = () => {
    const netRef = useRef<MobileNet | null>(null)
    const [_, setReady] = useState(false)

    useEffect(() => {
        getNet().then((net) => {
            netRef.current = net
            setReady(true)
        })
    }, [])

    return netRef.current
}

export default useNet
