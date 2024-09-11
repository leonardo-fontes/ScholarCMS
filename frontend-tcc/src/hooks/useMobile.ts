import { useEffect, useMemo, useState } from 'react'

export default function useMobile() {
    const [width, setWidth] = useState(window.innerWidth)
    const isMobile = useMemo(() => width < 768, [width])

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize)
        // Função de limpeza para remover o listener de resize
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return isMobile
}
