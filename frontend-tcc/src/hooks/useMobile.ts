import { useEffect, useMemo, useState } from 'react'

export default function useMobile() {
    const [width, setWidth] = useState(0)
    const isMobile = useMemo(() => width < 768, [width])

    useEffect(() => {
        setWidth(window.innerWidth)
        window.addEventListener("resize", (e) => { setWidth(e.view?.innerWidth as number) })
    }, [])
    
    return isMobile
    
}
