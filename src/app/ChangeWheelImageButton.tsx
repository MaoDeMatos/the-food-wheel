'use client';

import { useEffect, useMemo, useState } from 'react';
import { FileMinus, Image } from 'react-feather';
import { DropZone, DropZoneProps } from '../components/DropZone';
import { useDataStoreAsync, setImage } from '../DataStore';

export function ChangeWheelImage() {
  const { image } = useDataStoreAsync();
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { hasImage, Icon } = useMemo(() => {
    const hasImage = Boolean(image);

    return {
      hasImage,
      Icon: hasImage ? FileMinus : Image,
    };
  }, [image]);

  const dropHandler: DropZoneProps['onDrop'] = (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    const firstFile = files?.[0];

    if (firstFile?.type.startsWith('image/')) {
      setImage(URL.createObjectURL(firstFile));
      setModalIsOpen(false);
    } else {
      setError(
        new Error(
          `File extension not supported. ${
            Boolean(firstFile?.type) ? `("${firstFile?.type}")` : ''
          } `
        )
      );
    }
  };

  useEffect(() => {
    if (hasImage || !isModalOpen) setError(null);
  }, [hasImage, isModalOpen]);

  return (
    <>
      <button
        type="button"
        className="btn-primary btn-circle btn absolute right-0 -top-0 z-[1] flex p-1"
        onClick={() => (hasImage ? setImage(null) : setModalIsOpen(true))}
      >
        <Icon />
        <span className="sr-only">Change wheel image</span>
      </button>

      <div className={`modal ${isModalOpen ? 'modal-open' : null}`}>
        <div className="modal-box relative flex flex-col gap-6 bg-neutral text-neutral-content">
          <button
            type="button"
            className="btn-sm btn-circle btn absolute right-2 top-2"
            onClick={() => setModalIsOpen(false)}
          >
            ✕
          </button>
          <h3 className="text-lg font-bold">Change wheel image here</h3>
          <DropZone
            content={
              <>
                Drop an image here to put it on the wheel
                <br />
                {error && error.message}
              </>
            }
            onDrop={dropHandler}
          />
        </div>
      </div>
    </>
  );
}
