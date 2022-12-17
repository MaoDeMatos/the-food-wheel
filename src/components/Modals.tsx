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
};

export function Modal({
  modalUniqueID,
  buttonContent,
  buttonProps,
  modalContent,
}: ModalProps) {
  return (
    <>
      <label htmlFor={modalUniqueID} {...buttonProps}>
        {buttonContent}
      </label>

      <input type="checkbox" id={modalUniqueID} className="modal-toggle" />
      <label htmlFor={modalUniqueID} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          {modalContent}
        </label>
      </label>
    </>
  );
}
