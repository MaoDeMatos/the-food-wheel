import { createPortal } from 'react-dom';
import { useDropzone } from 'react-dropzone';
import { Image as ImageIcon } from 'react-feather';
import { classNames } from '@/utils';
import { setImage } from '@/utils/DataStore';
import { useIsMounted } from '@/utils/useIsMounted';

interface WheelImageModalProps {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  error: Error | null;
  setError: (err: Error) => void;
}

export function WheelImageModal({
  isOpen,
  setIsOpen,
  error,
  setError,
}: WheelImageModalProps) {
  const isMounted = useIsMounted();

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
          <div className="modal-box relative flex flex-col gap-2 bg-neutral text-neutral-content items-center">
            <h3 className="text-lg font-bold">Change wheel image here</h3>

            <button
              type="button"
              className="btn-sm btn-circle btn absolute right-3 top-3"
              title="Close"
              onClick={closeModal}
            >
              ✕
            </button>

            <div
              {...getRootProps({
                className: classNames(
                  'rounded-xl p-2 transition',
                  isDragActive && ' bg-neutral-focus opacity-80'
                ),
              })}
            >
              <div className="text-center flex flex-col justify-center items-center rounded-lg border-2 border-dashed border-base-300 px-6 py-10 gap-4">
                <ImageIcon
                  className="mx-auto h-12 w-12 text-neutral-content"
                  aria-hidden="true"
                />
                <div className="flex flex-wrap justify-center text-sm leading-6 gap-1 text-neutral-content">
                  <label
                    htmlFor="file-upload"
                    className="btn btn-outline btn-xs"
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
                  <p className="text-xs leading-5 text-neutral-content italic">
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
