import React from 'react';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  className?: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ value, size = 140, className = '' }) => {
  // Deterministic SVG QR representation based on value hash
  const gridSize = 21;
  const hash = Array.from(value).reduce((acc, char, i) => acc + char.charCodeAt(0) * (i + 1), 0);
  
  const cells: boolean[][] = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));

  // Function to place 7x7 corner finder patterns
  const placeFinder = (startX: number, startY: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        ) {
          cells[startY + r][startX + c] = true;
        }
      }
    }
  };

  placeFinder(0, 0); // Top-left
  placeFinder(gridSize - 7, 0); // Top-right
  placeFinder(0, gridSize - 7); // Bottom-left

  // Timing lines
  for (let i = 8; i < gridSize - 8; i++) {
    cells[6][i] = i % 2 === 0;
    cells[i][6] = i % 2 === 0;
  }

  // Fill in data based on string hash pseudo-randomly
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      // Don't overwrite finders
      const inTopLeft = r < 8 && c < 8;
      const inTopRight = r < 8 && c >= gridSize - 8;
      const inBottomLeft = r >= gridSize - 8 && c < 8;
      if (inTopLeft || inTopRight || inBottomLeft) continue;

      const seed = (r * 31 + c * 17 + hash) % 100;
      cells[r][c] = seed % 3 === 0 || seed % 5 === 0;
    }
  }

  const cellSize = size / gridSize;

  return (
    <div className={`inline-block p-2 bg-white rounded-xl shadow-lg ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="block"
        shapeRendering="crispEdges"
      >
        <rect width={size} height={size} fill="#ffffff" />
        {cells.map((row, rIdx) =>
          row.map((cell, cIdx) => {
            if (!cell) return null;
            return (
              <rect
                key={`${rIdx}-${cIdx}`}
                x={cIdx * cellSize}
                y={rIdx * cellSize}
                width={cellSize + 0.2}
                height={cellSize + 0.2}
                fill="#120e0a"
              />
            );
          })
        )}
      </svg>
    </div>
  );
};

export const BarcodeDisplay: React.FC<{ code: string; className?: string }> = ({ code, className = '' }) => {
  const bars = Array.from(code).flatMap((char, i) => {
    const val = char.charCodeAt(0) % 5;
    return [val % 2 === 0 ? 3 : 1, val % 3 === 0 ? 2 : 1, 1];
  });

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <div className="flex items-stretch h-10 gap-[2px] bg-white px-3 py-1.5 rounded">
        {bars.map((w, idx) => (
          <div
            key={idx}
            className="bg-[#120e0a] h-full"
            style={{ width: `${Math.max(1, w * 1.5)}px` }}
          />
        ))}
      </div>
      <span className="font-mono text-[10px] tracking-[0.25em] text-[#a4927e]">{code}</span>
    </div>
  );
};
