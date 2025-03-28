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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const saveLocal = (value: any) => {
        try {
            localStorage.setItem("notes", JSON.stringify(value)); // Guarda las notas como string
        } catch (error) {
            console.error("Error guardando las notas en localStorage:", error);
        }
    }

    const addNote = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let valueNotes: any[] = []
        if (currentNote.trim() === "") return;
        const newNote = { id: Date.now(), content: currentNote };
        setNotes([...notes, newNote]);
        valueNotes = [...notes, newNote]
        saveLocal(valueNotes)
        setCurrentNote("");
    };

    const deleteNote = (id: number) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let valueNotes: any[] = []
        setNotes(notes.filter((note) => note.id !== id));
        valueNotes = notes.filter((note) => note.id !== id)
        saveLocal(valueNotes)
    };

    const updateNote = (id: number, newContent: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let valueNotes: any[] = []
        setNotes(
            notes.map((note) =>
                note.id === id ? { ...note, content: newContent } : note
            )
        );
        valueNotes = [...notes]
        saveLocal(valueNotes)
    };

    const resetNotes = () => {
        setNotes([]);
        localStorage.removeItem("notes"); // Limpia el localStorage
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4">Block de Notas</h1>
            <div className="mb-4 w-full max-w-md">
                <textarea
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    className="w-full h-20 p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Escribe una nota..."
                ></textarea>
                <button
                    onClick={addNote}
                    className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Agregar Nota
                </button>
            </div>
            <div className="w-full max-w-md space-y-4" style={{marginTop: '10px'}}>
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className="p-4 bg-white shadow rounded border flex items-start"
                    >
                        <textarea
                            value={note.content}
                            onChange={(e) => updateNote(note.id, e.target.value)}
                            className="w-full h-auto p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                        ></textarea>
                        <button
                            onClick={() => deleteNote(note.id)}
                            className="ml-2 mt-2 text-red-500 hover:text-red-600"
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
                <button
                    onClick={resetNotes}
                    className="mt-2 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    style={{ marginTop: '10px' }}
                >
                    Limpiar Notas
                </button>
            </div>
        </div>
    );
};

export default Notepad;
