import { MouseEvent, PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Style from './Modal.style';

export type ModalProps = PropsWithChildren<{
  isOpened: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
}>;

const MODAL_ROOT_ID = 'modal-root';
const MODAL_CONTAINER_ID = 'modal-container';

export const getRootElement = () => {
  const modalRoot = document.getElementById(MODAL_ROOT_ID);
  if (modalRoot) return modalRoot;
  const newElement = document.createElement('div');
  document.body.appendChild(Object.assign(newElement, { id: MODAL_ROOT_ID }));
  return newElement;
};

const enableScroll = (element: HTMLElement) => {
  if (!element) return;
  Object.assign(element.style, { overflow: null });
};

const disableScroll = (element: HTMLElement) => {
  if (!element) return;
  Object.assign(element.style, { overflow: 'hidden' });
};

const Modal = ({ children, isOpened, title, onClose, onSubmit }: ModalProps) => {
  const modalRoot = getRootElement();
  const { body } = document;

  const handleClose = (event: MouseEvent) => {
    const { currentTarget, target } = event;
    if (currentTarget !== target) return;
    onClose();
  };

  const handleSubmit = () => {
    onSubmit();
  };

  useEffect(() => {
    isOpened ? disableScroll(body) : enableScroll(body);

    return () => {
      enableScroll(body);
    };
  }, [isOpened]);

  return createPortal(
    <Style.Container id={MODAL_CONTAINER_ID} isOpened={isOpened} onClick={handleClose}>
      <Style.Dialog isOpened={isOpened} role="dialog">
        <Style.Header>
          <h2>{title}</h2>
          <button onClick={onClose}>X</button>
        </Style.Header>
        <main>{children}</main>
        <footer>
          <button onClick={onClose}>Close</button>
          <button onClick={handleSubmit}>Save</button>
        </footer>
      </Style.Dialog>
    </Style.Container>,
    modalRoot!
  );
};

export default Modal;
