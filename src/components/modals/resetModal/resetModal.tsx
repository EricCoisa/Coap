import { ModalContent, ModalTitle, ModalDesc, ModalActions, ModalButtonAccept, ModalButtonDeny } from './reset.styles';

export interface ResetModalProps {
  onAccept: () => void;
  onDeny: () => void;
}

function Resetodal({ onAccept, onDeny }: ResetModalProps) {
  return (
    <ModalContent>
      <ModalTitle>Redefinir Configurações</ModalTitle>
      <ModalDesc>
        Você tem certeza de que deseja redefinir todas as configurações para os valores padrão?
      </ModalDesc>
      <ModalActions>
        <ModalButtonAccept onClick={onAccept}>
          Sim, quero redefinir
        </ModalButtonAccept>
        <ModalButtonDeny onClick={onDeny}>
          Não quero
        </ModalButtonDeny>
      </ModalActions>
    </ModalContent>
  );
}

export default Resetodal;
