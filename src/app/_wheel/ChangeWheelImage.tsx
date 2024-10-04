import { FileMinus, FilePlus } from 'lucide-react';
import { useMemo } from 'react';

import { WheelImageModal, getWheelModalEl } from './WheelImageModal';

type ChangeWheelImageProps = {
  image: string | null;
  setImage: (newImage: string | null) => void;
};

export function ChangeWheelImage({ image, setImage }: ChangeWheelImageProps) {
  const openModal = () => {
    const wheelModal = getWheelModalEl();
    wheelModal.showModal();
  };

  const { hasImage, Icon } = useMemo(() => {
    const hasImage = Boolean(image);

    return {
      hasImage,
      Icon: hasImage ? FileMinus : FilePlus,
    };
  }, [image]);

  return (
    <>
      <button
        type="button"
        className="btn btn-circle btn-primary absolute -top-0 right-0 z-[1] flex p-1 shadow-md"
        title={hasImage ? 'Remove image' : 'Add image'}
        onClick={() => (hasImage ? setImage(null) : openModal())}
      >
        <Icon />
        <span className="sr-only">Change wheel image</span>
      </button>

      <WheelImageModal setImage={setImage} />
    </>
  );
}
