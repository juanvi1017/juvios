"use client";

import React, { useState } from "react";

interface Props {
    isResizingDown: boolean;
    setIsResizingDown: (arg0: boolean) => void;
    isResizingRight: boolean;
    setIsResizingRight: (arg0: boolean) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dragStart: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setDragStart: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    end: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    close: any;
    title: string;
}

const min = 10;
const max = 700;
const minh = 80;
const maxh = 200;

const ResizableIframe = ({ isResizingDown,
    setIsResizingDown,
    isResizingRight,
    setIsResizingRight,
    setDragStart,
    dragStart,
    value,
    end,
    close,
    title
}: Props) => {

    const [size, setSize] = useState({ width: 500, height: 500 });
    const [position, setPosition] = useState({ x: (Math.floor(Math.random() * (max - min + 1)) + min), y: (Math.floor(Math.random() * (maxh - minh + 1)) + minh) });


    const handleDragStart = (e: React.MouseEvent) => {
        e.preventDefault();
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleDrag = (e: React.MouseEvent) => {
        if (dragStart) {
            const dx = e.clientX - dragStart.x;
            const dy = e.clientY - dragStart.y;

            setPosition((prev) => {
                const newX = prev.x + dx;
                const newY = prev.y + dy;

                // Calcular los límites
                const containerWidth = window.innerWidth;
                const containerHeight = window.innerHeight - 31;

                const maxWidth = containerWidth - size.width; // Límite derecho
                const maxHeight = containerHeight - size.height; // Límite inferior

                // Ajustar posición para mantener la ventana dentro de los límites
                const boundedX = Math.max(0, Math.min(newX, maxWidth));
                const boundedY = Math.max(0, Math.min(newY, maxHeight));

                return { x: boundedX, y: boundedY };
            });

            setDragStart({ x: e.clientX, y: e.clientY });
        }
    };


    const handleResizeDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsResizingDown(true);
        setIsResizingRight(false);
    };

    const handleResizeRight = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsResizingDown(false);
        setIsResizingRight(true);
    };

    const handleResize = (e: React.MouseEvent) => {
        if (isResizingDown) {
            const newHeight = Math.max(150, e.clientY - position.y);
            setSize({
                width: size.width,
                height: newHeight,
            });
        }
        if (isResizingRight) {
            const newWidth = Math.max(200, e.clientX - position.x);
            setSize({
                width: newWidth,
                height: size.height,
            });
        }
    };

    const toggleMaximized = () => {
        setSize({ width: window.innerWidth - 5, height: window.innerHeight - 70.8 });
        setPosition({ x: 0, y: 40 });
    };

    const toggleMinimized = () => {
        setSize({ width: 500, height: 600 });
        setPosition({ x: 100, y: 100 });
    };

    return (
        <div
            className="absolute bg-gray-100 border border-gray-300 shadow"
            style={{
                width: `${size.width}px`,
                height: `${size.height}px`,
                top: `${position.y}px`,
                left: `${position.x}px`,
            }}
            onMouseMove={(e) => {
                handleDrag(e);
                handleResize(e);
            }}
            onMouseUp={() => end()}
        >
            {/* Barra de título */}
            <div
                className="text-white p-2 cursor-move dark"
                onMouseDown={handleDragStart}
            >
                <span className="title">{title}</span>
                <button
                    className="absolute right-14 text-white px-2 rounded"
                    onClick={toggleMinimized}
                >
                    -
                </button>
                <button
                    className="absolute right-8 text-white px-2 rounded"
                    onClick={toggleMaximized}
                >
                    +
                </button>
                <button
                    className="absolute right-2 text-white px-2 rounded"
                    onClick={close}
                >
                    x
                </button>
            </div>
            {/* Contenido */}
            {value}
            {/* borde derecho para redimensionar */}
            <div
                className={`absolute top-0 -right-1.5 w-2 h-full cursor-w-resize`}
                onMouseDown={handleResizeRight}
            ></div>
            {/* borde inferior para redimensionar */}
            <div
                className={`absolute bottom--0 w-full h-2 cursor-n-resize`}
                onMouseDown={handleResizeDown}
            ></div>
        </div>
    );
}

export default ResizableIframe;
