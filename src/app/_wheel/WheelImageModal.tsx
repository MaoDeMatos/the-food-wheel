import { Image as ImageIcon } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useDropzone } from 'react-dropzone';

import { classNames } from '@/utils';
import { useIsMounted } from '@/utils/useIsMounted';

interface WheelImageModalProps {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  setImage: (newImage: string | null) => void;
  error: Error | null;
  setError: (err: Error) => void;
}

export function WheelImageModal({
  isOpen,
  setIsOpen,
  setImage,
  error,
  setError,
}: WheelImageModalProps) {
  const isMounted = useIsMounted(); // Use this to avoid SSR errors

  function closeModal() {
    setIsOpen(false);
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true, // Avoid opening two times the explorer when clicking the label
    multiple: false, // Only one file allowed
    accept: { 'image/*': [] }, // Any image is accepted
    onDropAccepted(files) {
      setImage(URL.createObjectURL(files?.[0]));
      closeModal();
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
        <div
          className={classNames('modal', isOpen && 'modal-open')}
          onClick={(e) => {
            if (e.target !== e.currentTarget) return;
            closeModal();
          }}
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

            <div
              {...getRootProps({
                className: classNames(
                  'p-2 relative',
                  'rounded-xl transition absolute inset-0',
                  isDragActive &&
                    'opacity-60 dark:bg-neutral-focus dark:opacity-40'
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
                    className="btn btn-neutral btn-outline btn-xs"
                  >
                    Upload an image
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
        </div>,
        document.body
      )
    : null;
}
