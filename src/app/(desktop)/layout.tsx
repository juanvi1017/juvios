"use client"

import React, { useState } from 'react';
import Header from '@/presenters/component/header';
import Option from '@/presenters/component/option/OptionMenu';
export default function DefaultLayout({ children }: { children: React.ReactNode }) {

  const [dev, setDev] = useState(false)
  const [dragStart, setDragStart] = useState(null);
  const [isResizingDown, setIsResizingDown] = useState(false);
  const [isResizingRight, setIsResizingRight] = useState(false);

  const end = () => {
    setIsResizingDown(false);
    setIsResizingRight(false)
    setDragStart(null)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header setDev={setDev} />
        <main>
          <div className="background">
            <div className="mx-auto" onClick={() => end()}>
              {<Option
                setDev={setDev}
                dev={dev}
                end={end}
                dragStart={dragStart}
                setDragStart={setDragStart}
                setIsResizingDown={setIsResizingDown}
                isResizingDown={isResizingDown}
                setIsResizingRight={setIsResizingRight}
                isResizingRight={isResizingRight}
              />}
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
