import { useState, useEffect } from "react";

interface Note {
    id: number;
    content: string;
}

const Notepad = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [currentNote, setCurrentNote] = useState<string>("");

    // Cargar notas desde localStorage al inicio
    useEffect(() => {
        try {
            const savedNotes = localStorage.getItem("notes");
            if (savedNotes) {
                setNotes(JSON.parse(savedNotes)); // Carga las notas solo si existen
            }
        } catch (error) {
            console.error("Error cargando las notas desde localStorage:", error);
        }
    }, []);

    const saveLocal = (value: Note[]) => {
        try {
            localStorage.setItem("notes", JSON.stringify(value)); // Guarda las notas como string
        } catch (error) {
            console.error("Error guardando las notas en localStorage:", error);
        }
    }

    const addNote = () => {
        let valueNotes: Note[] = []
        if (currentNote.trim() === "") return;
        const newNote = { id: Date.now(), content: currentNote };
        setNotes([...notes, newNote]);
        valueNotes = [...notes, newNote]
        saveLocal(valueNotes)
        setCurrentNote("");
    };

    const deleteNote = (id: number) => {
        let valueNotes: Note[] = []
        setNotes(notes.filter((note) => note.id !== id));
        valueNotes = notes.filter((note) => note.id !== id)
        saveLocal(valueNotes)
    };

    const updateNote = (id: number, newContent: string) => {
        let valueNotes: Note[] = []
        const notesAux: Note[] = [...notes]
        setNotes(
            notes.map((note) =>
                note.id === id ? { ...note, content: newContent } : note
            )
        );
        valueNotes = notesAux.map((note) =>
            note.id === id ? { ...note, content: newContent } : note
        )
        saveLocal(valueNotes)
    };

    const resetNotes = () => {
        setNotes([]);
        localStorage.removeItem("notes"); // Limpia el localStorage
    };

    return (
        <div className="flex flex-col items-center justify-center bg-[#f6f79f] h-full" style={{padding: '10px'}}>
            <h1 className="text-2xl font-bold mb-4">Notas</h1>
            <div className="mb-4 w-full max-w-md">
                <textarea
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    style={{ padding: '10px' }}
                    className="w-full h-20 border border-gray-100 rounded focus:outline-none focus:ring focus:ring-blue-300 bg-white"
                    placeholder="Escribe una nota..."
                ></textarea>
                <button
                    onClick={addNote}
                    style={{ padding: '4px' }}
                    className="mt-2 w-40 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Agregar Nota
                </button>
            </div>
            <div className="w-full max-w-md space-y-4" style={{ marginTop: '10px' }}>
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className="p-4 bg-white border-gray-100 rounded flex items-start"
                    >
                        <textarea
                            value={note.content}
                            style={{ padding: '10px' }}
                            onChange={(e) => updateNote(note.id, e.target.value)}
                            className="w-full h-auto p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                        ></textarea>
                        <button
                            onClick={() => deleteNote(note.id)}
                            style={{ marginTop: '20px' }}
                            className="ml-2 mt-2 text-red-500 hover:text-red-600"
                        >
                            ❌
                        </button>
                    </div>
                ))}
                <button
                    onClick={resetNotes}
                    className="mt-2 w-40 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    style={{ marginTop: '10px', padding: '4px' }}
                >
                    Limpiar Notas
                </button>
            </div>
        </div>
    );
};

export default Notepad;
