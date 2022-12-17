'use client';

import { useState } from 'react';
import { FileMinus, Image } from 'react-feather';
import { Modal } from '../components/Modals';

export function ChangeWheelImageButton() {
  const [hasImage, setHasImage] = useState(false);

  const Icon = hasImage ? FileMinus : Image;

  return (
    <Modal
      modalUniqueID="change-wheel-image-modal"
      buttonProps={{
        className:
          'btn-primary btn-circle btn absolute right-0 -top-0 z-[1] flex p-1',
        title: 'Change wheel image',
      }}
      buttonContent={
        <>
          <Icon />
          <span className="sr-only">Change wheel image</span>
        </>
      }
      modalContent={
        <>
          <h3 className="text-lg font-bold">Change wheel image here</h3>
          <p className="py-4">{'PUT IMAGE INPUT HERE'}</p>
        </>
      }
    />
  );
}
