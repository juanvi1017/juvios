"use client";

import React from "react";

import Resizable from '@/presenters/component/resizable/ResizableView';

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
    setDev: (arg0: boolean) => void;
    dev: boolean
}


export default function Option({
    isResizingDown,
    setIsResizingDown,
    isResizingRight,
    setIsResizingRight,
    setDragStart,
    dragStart,
    setDev,
    dev
}: Props) {

    const devClose = () => {
        setDev(false)
    }

    return (
        <>
            {dev && (
                <Resizable
                    dragStart={dragStart}
                    setDragStart={setDragStart}
                    setIsResizingDown={setIsResizingDown}
                    isResizingDown={isResizingDown}
                    setIsResizingRight={setIsResizingRight}
                    isResizingRight={isResizingRight}
                    title='Portafolio'
                    close={devClose}
                    mh={400}
                    value={
                        <iframe
                            src="https://juancaceresm.netlify.app/"
                            className="w-full h-full bg-white"
                            title="Portafolio Ing. Juan Caceres"
                        />
                    }
                />
            )}
        </>
    );
}
