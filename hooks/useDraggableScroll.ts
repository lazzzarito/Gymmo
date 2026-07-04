import { useRef, useState } from 'react';

export function useDraggableScroll() {
    const ref = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const getPageX = (e: React.MouseEvent | React.TouchEvent): number => {
        if ('touches' in e) {
            return e.touches[0]?.pageX || 0;
        }
        return e.pageX;
    };

    const onMouseDown = (e: React.MouseEvent) => {
        if (!ref.current) return;
        setIsDragging(true);
        setStartX(e.pageX - ref.current.offsetLeft);
        setScrollLeft(ref.current.scrollLeft);
    };

    const onTouchStart = (e: React.TouchEvent) => {
        if (!ref.current) return;
        setIsDragging(true);
        setStartX(e.touches[0].pageX - ref.current.offsetLeft);
        setScrollLeft(ref.current.scrollLeft);
    };

    const onLeave = () => {
        setIsDragging(false);
    };

    const onUp = () => {
        setIsDragging(false);
    };

    const onMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging || !ref.current) return;
        e.preventDefault();
        const x = getPageX(e) - ref.current.offsetLeft;
        const walk = (x - startX) * 2;
        ref.current.scrollLeft = scrollLeft - walk;
    };

    return {
        ref,
        events: {
            onMouseDown,
            onMouseLeave: onLeave,
            onMouseUp: onUp,
            onMouseMove: onMove,
            onTouchStart,
            onTouchEnd: onUp,
            onTouchMove: onMove,
            style: { cursor: isDragging ? 'grabbing' : 'grab' } as React.CSSProperties
        }
    };
}
