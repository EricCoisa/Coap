import { ModalContent, ModalTitle, ModalDesc, ModalActions, ModalButtonAccept, ModalButtonDeny } from './firstTimeModal.styles';

export interface FirstTimeModalProps {
  onAccept: () => void;
  onDeny: () => void;
}

function FirstTimeModal({ onAccept, onDeny }: FirstTimeModalProps) {
  return (
    <ModalContent>
      <ModalTitle>Bem-vindo!</ModalTitle>
      <ModalDesc>
        Deseja carregar um conteúdo de exemplo para conhecer os recursos da plataforma?<br />
        Você pode editar, remover ou adicionar novos elementos depois.
      </ModalDesc>
      <ModalActions>
        <ModalButtonAccept onClick={onAccept}>
          Sim, quero ver o exemplo
        </ModalButtonAccept>
        <ModalButtonDeny onClick={onDeny}>
          Não quero
        </ModalButtonDeny>
      </ModalActions>
    </ModalContent>
  );
}

export default FirstTimeModal;
