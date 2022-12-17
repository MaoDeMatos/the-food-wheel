'use client';

import { DetailedHTMLProps, LabelHTMLAttributes, ReactElement } from 'react';

export type ModalProps = {
  modalUniqueID: string;
  buttonContent?: ReactElement | ReactElement[];
  buttonProps?: DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;
  modalContent?: ReactElement | ReactElement[];
  modalBoxProps?: DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;
};

export function Modal({
  modalUniqueID,
  buttonContent,
  buttonProps,
  modalContent,
  modalBoxProps,
}: ModalProps) {
  const { className, ...restProps } = modalBoxProps ?? {};
  const boxProps = {
    className: `modal-box relative bg-neutral text-neutral-content ${
      className ?? ''
    }`,
    ...restProps,
  };

  return (
    <>
      <label htmlFor={modalUniqueID} {...buttonProps}>
        {buttonContent}
      </label>

      <input type="checkbox" id={modalUniqueID} className="modal-toggle" />
      <label htmlFor={modalUniqueID} className="modal cursor-pointer">
        <label htmlFor="" {...boxProps}>
          {modalContent}
        </label>
      </label>
    </>
  );
}
