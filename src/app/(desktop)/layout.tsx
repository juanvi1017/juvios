"use client"

import React, { useState } from 'react';
import Header from '@/presenters/component/header';
import Option from '@/presenters/component/option/OptionMenu';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function DefaultLayout({ children }: { children: React.ReactNode }) {

  const [dev, setDev] = useState(false)
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [isResizingDown, setIsResizingDown] = useState(false);
  const [isResizingRight, setIsResizingRight] = useState(false);
  const [value, onChange] = useState<Value>(new Date());
  const [viewCalendar, setViewCalendar] = useState(false);

  const end = () => {
    setIsResizingDown(false);
    setIsResizingRight(false)
    setDragStart(null)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header setDev={setDev} setViewCalendar={setViewCalendar} viewCalendar={viewCalendar} />
        <main>
          <div className="background">
            <div className="mx-auto" onClick={() => end()}>
              {viewCalendar && (
                <div className='absolute right-0 animationCalendar'>
                  <Calendar onChange={onChange} value={value} />
                </div>
              )}
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
