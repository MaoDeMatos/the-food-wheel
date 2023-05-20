import { useState, DragEvent, ReactNode } from 'react';

export type DropZoneProps = {
  content?: ReactNode;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
};

export function DropZone({ content, onDrop }: DropZoneProps) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  function dropHandler(e: DragEvent<HTMLDivElement>) {
    e.stopPropagation();
    e.preventDefault();
    onDrop(e);

    setIsDraggingOver(false);
  }

  return (
    <div
      className={`rounded-xl p-2 transition ${
        isDraggingOver ? 'bg-neutral-focus opacity-80' : null
      }`}
    >
      <div
        onDragOver={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onDragEnter={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setIsDraggingOver(false);
        }}
        onDrop={dropHandler}
        className="rounded-lg border-4 border-dashed border-base-300 py-8 px-6"
      >
        {content}
      </div>
    </div>
  );
}
