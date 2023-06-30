import { useEffect } from 'react';
import { Overlay, ModalViev } from './ModalStyled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');
export default function Modal( {children, onClose} ) {
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const hendleBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={hendleBackdrop}>
      <ModalViev>{children}</ModalViev>
    </Overlay>,
    modalRoot
  );
}
