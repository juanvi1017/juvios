"use client";

import React, { useState } from "react";

import Resizable from '@/presenters/component/resizable/ResizableView';
import TicTacToe from "@/presenters/component/game/TicTacToe";
import Notepad from "@/presenters/component/notepad/Notepad";

export default function Home() {
    const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
    const [isResizingDown, setIsResizingDown] = useState(false);
    const [isResizingRight, setIsResizingRight] = useState(false);
    const [wiki, setWiki] = useState(false)
    const [game, setGame] = useState(false)
    const [note, setNote] = useState(false)
    const [vitae, setVitae] = useState(false)


    const end = () => {
        setIsResizingDown(false);
        setIsResizingRight(false)
        setDragStart(null)
    }

    const wikiClose = () => {
        setWiki(false)
    }

    const tictactoeClose = () => {
        setGame(false)
    }
    const noteClose = () => {
        setNote(false)
    }
    const vitaeClose = () => {
        setVitae(false)
    }

    return (
        <div className="w-full"
            style={{ height: 'calc(100vh - 40px)', maxHeight: 'calc(100vh - 40px)' }}
            onClick={() => end()}
        >
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 gap-4">
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4" style={{ marginTop: '50px', marginLeft: '10px' }}>
                    <div className="h-30 flex flex-col items-center justify-center" onClick={() => setWiki(true)}>
                        <img src="/wikipedia.png" alt="chrome logo" className="w-20 h-20" />
                        <p className="w-full text-center text-[#fff]">Enciclopedia</p>
                    </div>
                    <div className="h-30 flex flex-col items-center justify-center" onClick={() => setGame(true)}>
                        <img src="/tictactoe.png" alt="chrome logo" className="w-20 h-19" />
                        <p className="w-full text-center text-[#fff]">Triqui</p>
                    </div>
                    <div className="h-30 flex flex-col items-center justify-center" onClick={() => setNote(true)}>
                        <img src="/notas.png" alt="chrome logo" className="w-20 h-20" />
                        <p className="w-full text-center text-[#fff]">Notas</p>
                    </div>
                    <div className="h-30 flex flex-col items-center justify-center" onClick={() => setVitae(true)}>
                        <img src="/pdf.webp" alt="chrome logo" className="w-20 h-20" />
                        <p className="w-full text-center text-[#fff]">Curriculum</p>
                    </div>
                </div>
            </div>

            {wiki && (
                <Resizable
                    dragStart={dragStart}
                    setDragStart={setDragStart}
                    setIsResizingDown={setIsResizingDown}
                    isResizingDown={isResizingDown}
                    setIsResizingRight={setIsResizingRight}
                    isResizingRight={isResizingRight}
                    title='Wikipedia Enciclopedia'
                    close={wikiClose}
                    value={
                        <iframe
                            src="https://es.wikipedia.org/wiki/Wikipedia:Portada"
                            className="w-full h-full bg-white"
                            title="Wikipedia"
                        />
                    }
                />
            )}
            {game && (
                <Resizable
                    dragStart={dragStart}
                    setDragStart={setDragStart}
                    setIsResizingDown={setIsResizingDown}
                    isResizingDown={isResizingDown}
                    setIsResizingRight={setIsResizingRight}
                    isResizingRight={isResizingRight}
                    close={tictactoeClose}
                    title='Triqui'
                    value={
                        <TicTacToe />
                    }
                />
            )}
            {note && (
                <Resizable
                    dragStart={dragStart}
                    setDragStart={setDragStart}
                    setIsResizingDown={setIsResizingDown}
                    isResizingDown={isResizingDown}
                    setIsResizingRight={setIsResizingRight}
                    isResizingRight={isResizingRight}
                    close={noteClose}
                    title='Notas'
                    value={
                        <Notepad />
                    }
                />
            )}
            {vitae && (
                <Resizable
                    dragStart={dragStart}
                    setDragStart={setDragStart}
                    setIsResizingDown={setIsResizingDown}
                    isResizingDown={isResizingDown}
                    setIsResizingRight={setIsResizingRight}
                    isResizingRight={isResizingRight}
                    close={vitaeClose}
                    title='Curriculum'
                    value={
                        <iframe
                            src="/document/vitae.pdf"
                            className="w-full h-full bg-white"
                            title="Curriculum Juan Caceres"
                        />
                    }
                />
            )}
        </div>
    );
}
