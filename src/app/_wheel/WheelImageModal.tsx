import { Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useDropzone } from 'react-dropzone';

import { classNames } from '@/utils';
import { useIsMounted } from '@/utils/useIsMounted';

const WHEEL_IMAGE_MODAL_ID = 'change-wheel-image-modal';

export function getWheelModalEl(): HTMLDialogElement {
  const wheelModal =
    document.getElementById<HTMLDialogElement>(WHEEL_IMAGE_MODAL_ID);
  if (!wheelModal) {
    throw new Error(
      `getWheelModalEl: element with id '${WHEEL_IMAGE_MODAL_ID}' not found`
    );
  }
  return wheelModal;
}

interface WheelImageModalProps {
  setImage: (newImage: string | null) => void;
}

export function WheelImageModal({ setImage }: WheelImageModalProps) {
  const [error, setError] = useState<Error | null>(null);
  const isMounted = useIsMounted(); // Use this to avoid SSR errors

  function closeModal() {
    const wheelModal = getWheelModalEl();
    wheelModal.close();
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true, // Avoid opening two times the explorer when clicking the label
    multiple: false, // Only one file allowed
    accept: { 'image/*': [] }, // Any image is accepted
    onDropAccepted(files) {
      setImage(URL.createObjectURL(files?.[0]));
      closeModal();
      setError(null);
    },
    onDropRejected(fileRejections) {
      setError(
        new Error(
          `File extension not supported. ${
            Boolean(fileRejections?.[0].file?.type)
              ? `("${fileRejections?.[0].file?.type}")`
              : ''
          } `
        )
      );
    },
  });

  return isMounted
    ? createPortal(
        <dialog
          id={WHEEL_IMAGE_MODAL_ID}
          className={'modal modal-bottom sm:modal-middle'}
        >
          <div className="modal-box relative flex flex-col items-center gap-2 border bg-base-100 dark:border-transparent dark:bg-neutral dark:text-neutral-content">
            <h1 className="text-lg font-bold">Change wheel image here</h1>

            <button
              type="button"
              className="btn btn-circle btn-neutral btn-sm absolute right-3 top-3"
              title="Close"
              onClick={closeModal}
            >
              ✕
            </button>

            {/* Drop zone */}
            <div
              {...getRootProps({
                className: classNames(
                  'p-2 relative',
                  'rounded-xl transition absolute inset-0',
                  isDragActive &&
                    'opacity-70 bg-base-300/70 dark:bg-base-100/50'
                ),
              })}
            >
              <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-base-300 px-6 py-10 text-center">
                <ImageIcon
                  className="mx-auto h-12 w-12 text-neutral-content"
                  aria-hidden="true"
                />
                <div className="flex flex-wrap justify-center gap-1 text-sm leading-6 text-neutral-content">
                  <label
                    htmlFor="file-upload"
                    className="btn btn-outline btn-neutral btn-xs"
                  >
                    Load an image
                  </label>
                  <input
                    {...getInputProps({
                      id: 'file-upload',
                      name: 'file-upload',
                      className: 'sr-only',
                    })}
                  />
                  <p>or drag and drop it here !</p>
                </div>

                {error && (
                  <p className="text-xs italic leading-5 text-neutral-content">
                    {error.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button>
              <span className="sr-only">close</span>
            </button>
          </form>
        </dialog>,
        document.body
      )
    : null;
}
