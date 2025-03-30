import { useState } from 'react';

const Calculator = () => {
    const [display, setDisplay] = useState<string>('0');
    const [operation, setOperation] = useState<string | null>(null);
    const [operand, setOperand] = useState<number | null>(null);
    const [history, setHistory] = useState<string[]>([]);

    const handleDigit = (digit: string) => {
        setDisplay((prev) => (prev === '0' ? digit : prev + digit));
    };

    const handleOperation = (op: string) => {
        setOperand(parseFloat(display));
        setOperation(op);
        setDisplay('0');
    };

    const handleEqual = () => {
        if (operation && operand !== null) {
            let result: number;
            switch (operation) {
                case '+':
                    result = operand + parseFloat(display);
                    break;
                case '-':
                    result = operand - parseFloat(display);
                    break;
                case '*':
                    result = operand * parseFloat(display);
                    break;
                case '/':
                    result = operand / parseFloat(display);
                    break;
                default:
                    return;
            }
            const fullOperation = `${operand} ${operation} ${parseFloat(display)} = ${result}`;
            setHistory((prev) => [...prev, fullOperation]);
            setDisplay(result.toString());
            setOperation(null);
            setOperand(null);
        }
    };

    const handleClear = () => {
        setDisplay('0');
        setOperation(null);
        setOperand(null);
    };

    return (
        <div className="items-center justify-center bg-gray-100" style={{margin: '10px'}}>
            <div className="grid grid-cols-2 gap-2">
                <div className="display bg-black text-white p-4 rounded text-right text-2xl mb-4" style={{padding: '10px'}}>
                    <div className="p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-bold mb-2">Historial</h3>
                        <ul className="list-disc pl-5 list-none">
                            {history.map((entry, index) => (
                                <li key={index} className="text-sm">
                                    {entry}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {display}
                </div>
                <div className="buttons grid grid-cols-4 gap-2 mb-4">
                    {['7', '8', '9', '/'].map((item) => (
                        <button
                            key={item}
                            className="btn bg-blue-500 text-white p-2 rounded h-10"
                            onClick={() =>
                                !isNaN(parseFloat(item)) ? handleDigit(item) : handleOperation(item)
                            }>
                            {item}
                        </button>
                    ))}
                    {['4', '5', '6', '*'].map((item) => (
                        <button
                            key={item}
                            className="btn bg-blue-500 text-white p-2 rounded h-10"
                            onClick={() =>
                                !isNaN(parseFloat(item)) ? handleDigit(item) : handleOperation(item)
                            }>
                            {item}
                        </button>
                    ))}
                    {['1', '2', '3', '-'].map((item) => (
                        <button
                            key={item}
                            className="btn bg-blue-500 text-white p-2 rounded h-10"
                            onClick={() =>
                                !isNaN(parseFloat(item)) ? handleDigit(item) : handleOperation(item)
                            }>
                            {item}
                        </button>
                    ))}
                    {['0', 'C', '=', '+'].map((item) => (
                        <button
                            key={item}
                            className="btn bg-blue-500 text-white p-2 rounded h-10"
                            onClick={() => {
                                if (item === 'C') handleClear();
                                else if (item === '=') handleEqual();
                                else if (!isNaN(parseFloat(item))) handleDigit(item);
                                else handleOperation(item);
                            }}>
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calculator;
