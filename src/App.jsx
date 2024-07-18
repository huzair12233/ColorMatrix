import React, { useState } from 'react';
import './App.css';

const App = () => {
  const initialMatrix = Array(3).fill(Array(3).fill(null));
  const [matrix, setMatrix] = useState(initialMatrix);
  const [clickSequence, setClickSequence] = useState([]);
  const [reset, setReset] = useState(false);

  const handleClick = (rowIndex, colIndex) => {
    if (reset) {
      setMatrix(initialMatrix);
      setClickSequence([]);
      setReset(false);
      return;
    }

    const newMatrix = matrix.map((row, rIdx) =>
      row.map((col, cIdx) =>
        rIdx === rowIndex && cIdx === colIndex ? 'green' : col
      )
    );
    setMatrix(newMatrix);

    const newClickSequence = [...clickSequence, { rowIndex, colIndex }];
    setClickSequence(newClickSequence);

    if (newClickSequence.length === 9) {
      setTimeout(() => {
        newClickSequence.forEach(({ rowIndex, colIndex }, index) => {
          setTimeout(() => {
            setMatrix(prevMatrix => 
              prevMatrix.map((row, rIdx) =>
                row.map((col, cIdx) =>
                  rIdx === rowIndex && cIdx === colIndex ? 'orange' : col
                )
              )
            );
          }, index * 100);
        });
        setReset(true);
      }, 200);
    }
  };

  return (
    <div className="app">
      <h1>Color Changing Matrix</h1>
      <div className="matrix">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((col, colIndex) => (
              <div
                key={colIndex}
                className="cell"
                style={{ backgroundColor: col }}
                onClick={() => handleClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
