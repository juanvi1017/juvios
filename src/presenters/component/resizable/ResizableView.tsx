"use client";

import React, { useState } from "react";

interface Props {
  isResizingDown: boolean;
  setIsResizingDown: (value: boolean) => void;
  isResizingRight: boolean;
  setIsResizingRight: (value: boolean) => void;
  dragStart: { x: number; y: number } | null;
  setDragStart: (value: { x: number; y: number } | null) => void;
  value: React.ReactNode;
  close: () => void;
  title: string;
  mh: number; //Min Heigth
}

const isMobile = typeof navigator !== "undefined" && /Android|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
const min = isMobile ? 2 : 10;
const max = isMobile ? 20 : 700;
const minh = isMobile ? 20 : 80;
const maxh = isMobile ? 40 : 100;

const ResizableIframe = ({
  isResizingDown,
  setIsResizingDown,
  isResizingRight,
  setIsResizingRight,
  dragStart,
  setDragStart,
  value,
  close,
  title,
  mh
}: Props) => {

  const [size, setSize] = useState({ width: isMobile ? 300 : 500, height: 500 });
  const [position, setPosition] = useState({ x: (Math.floor(Math.random() * (max - min + 1)) + min), y: (Math.floor(Math.random() * (maxh - minh + 1)) + minh) });

  // Obtener coordenadas del evento (mouse o toque)
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    if ("touches" in e) {
      const touch = e.touches[0];
      return { x: touch.clientX, y: touch.clientY };
    }
    return { x: (e as React.MouseEvent).clientX, y: (e as React.MouseEvent).clientY };
  };

  // Lógica para iniciar el arrastre
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    setDragStart({ x, y });
  };

  // Lógica para manejar el arrastre
  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStart) {
      const { x, y } = getCoordinates(e);
      const dx = x - dragStart.x;
      const dy = y - dragStart.y;

      setPosition((prev) => ({
        x: boundedValue(prev.x + dx, 0, window.innerWidth - size.width),
        y: boundedValue(prev.y + dy, 0, window.innerHeight - size.height),
      }));

      setDragStart({ x, y });
    }
  };

  // Lógica para manejar el inicio del redimensionamiento
  const handleResizeStart = (direction: "down" | "right", e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsResizingDown(direction === "down");
    setIsResizingRight(direction === "right");
  };

  // Lógica para redimensionar
  const handleResize = (e: React.MouseEvent | React.TouchEvent) => {
    const { x, y } = getCoordinates(e);
    if (isResizingDown) {
      if (y >= mh) {
        setSize((prev) => ({ ...prev, height: Math.max(150, y - position.y) }));
      }
    }
    if (isResizingRight) {
      setSize((prev) => ({ ...prev, width: Math.max(200, x - position.x) }));
    }
  };

  // Finalizar redimensionamiento/arrastre
  const handleMouseUpOrTouchEnd = () => {
    setIsResizingDown(false);
    setIsResizingRight(false);
    setDragStart(null);
  };

  // Lógica para valores acotados dentro de un rango
  const boundedValue = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

  // Minimizar y maximizar ventana
  const toggleMaximized = () => {
    setSize({ width: window.innerWidth - 5, height: window.innerHeight - 70 });
    setPosition({ x: 0, y: 40 });
  };

  const toggleMinimized = () => {
    setSize({ width: isMobile ? 300 : 500, height: isMobile ? 400 : 500 });
    setPosition({ x: isMobile ? 20 : 100, y: isMobile ? 50 : 100 });
  };

  return (
    <div
      className={`absolute shadow`}
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
      onTouchMove={(e) => {
        handleDrag(e);
        handleResize(e);
      }}
      onMouseUp={handleMouseUpOrTouchEnd}
      onTouchEnd={handleMouseUpOrTouchEnd}
    >
      {/* Barra de título */}
      <div
        className="text-white p-2 cursor-move dark"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <span>{title}</span>
        <button className="absolute right-14" onClick={toggleMinimized}>
          -
        </button>
        <button className="absolute right-8" onClick={toggleMaximized}>
          +
        </button>
        <button className="absolute right-2" onClick={close}>
          x
        </button>
      </div>
      <div className="absolute left-0 h-full w-full">
        {value}
      </div>
      {/* Bordes para redimensionar */}
      <div
        className="absolute top-0 -right-8 w-10 h-full cursor-ew-resize"
        onMouseDown={(e) => handleResizeStart("right", e)}
        onTouchStart={(e) => handleResizeStart("right", e)}
      ></div>
      <div
        className="absolute -bottom-5 left-0 w-full h-10 cursor-ns-resize"
        onMouseDown={(e) => handleResizeStart("down", e)}
        onTouchStart={(e) => handleResizeStart("down", e)}
      ></div>
    </div>
  );
};

export default ResizableIframe;
