import { FileMinus, FilePlus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { WheelImageModal } from './WheelImageModal';

type ChangeWheelImageProps = {
  image: string | null;
  setImage: (newImage: string | null) => void;
};

export function ChangeWheelImage({ image, setImage }: ChangeWheelImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { hasImage, Icon } = useMemo(() => {
    const hasImage = Boolean(image);

    return {
      hasImage,
      Icon: hasImage ? FileMinus : FilePlus,
    };
  }, [image]);

  useEffect(() => {
    if (hasImage || !isModalOpen) setError(null);
  }, [hasImage, isModalOpen]);

  return (
    <>
      <button
        type="button"
        className="btn btn-circle btn-primary absolute -top-0 right-0 z-[1] flex p-1 shadow-md"
        title={hasImage ? 'Remove image' : 'Add image'}
        onClick={() => (hasImage ? setImage(null) : setIsModalOpen(true))}
      >
        <Icon />
        <span className="sr-only">Change wheel image</span>
      </button>

      <WheelImageModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        {...{ setImage, error, setError }}
      />
    </>
  );
}
