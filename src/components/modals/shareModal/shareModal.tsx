import { encodeJson } from '../../../utils/shareUtil';
import type { RootStateBase } from '../../../store/rootReducer';
import type { AnyObject } from '../../../types/objects';
import { connectUtil, type PropsFromRedux } from '../../../utils/reduxUtil';
import { ModalContent, ModalTitle, ModalDesc, ModalActions, ModalButtonAccept } from './share.styles';

const connector = connectUtil(
  (state: RootStateBase) => ({
    objectsUsed: state.ApplicationReducer.ObjectsUsed ?? []
  }),
  { }
);

interface ShareModalProps extends PropsFromRedux<typeof connector> {
  onClose: () => void;
}

function ShareModal({ onClose, objectsUsed }: ShareModalProps) {
  function generateCodeFromJson(obj: AnyObject[]): string {
    return encodeJson(obj);
  }

  const code = generateCodeFromJson(objectsUsed);
  const link = `${window.location.origin}?code=${code}`;

  function handleCopyCode() {
    navigator.clipboard.writeText(code);
  }

  return (
    <ModalContent>
      <div style={{
        background: '#fffbe6',
        border: '1px solid #ffe58f',
        color: '#8c6d1f',
        borderRadius: '8px',
        padding: '0.75rem 1rem',
        marginBottom: '1rem',
        fontSize: '0.98rem',
        fontWeight: 500,
      }}>
        <strong>Aviso de privacidade:</strong><br />
        Nenhum conteúdo é salvo em banco de dados ou servidor. Todo o conteúdo é compactado localmente no seu navegador e transformado em um código de compartilhamento. <br />
        Para compartilhar, basta copiar o código ou o link gerado. Qualquer pessoa com esse código poderá restaurar o conteúdo exatamente como você criou.<br />
        <span style={{ fontWeight: 400, fontSize: '0.93rem' }}>
          <em>Guarde o código ou link se quiser recuperar ou compartilhar seu trabalho depois.</em>
        </span>
      </div>
      <ModalTitle>Compartilhar</ModalTitle>
      <ModalDesc style={{ marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontWeight: 500 }}>Código:</span>
          <button
            onClick={handleCopyCode}
            style={{ padding: '0.3rem 1rem', borderRadius: '6px', background: '#007bff', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem' }}
          >
            Copiar
          </button>
        </div>
        <pre style={{
          background: '#f8f8f8',
          padding: '0.4rem',
          borderRadius: '8px',
          maxHeight: '32px',
          minHeight: '24px',
          fontSize: '0.8rem',
          wordBreak: 'break-all',
          marginTop: '0.5rem',
          marginBottom: '0.5rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>{code}</pre>
      </ModalDesc>
      <ModalDesc>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontWeight: 500 }}>Link:</span>
          <button
            onClick={() => navigator.clipboard.writeText(link)}
            style={{ padding: '0.3rem 1rem', borderRadius: '6px', background: '#28a745', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem' }}
          >
            Copiar
          </button>
        </div>
        <pre style={{
          background: '#f8f8f8',
          padding: '0.4rem',
          borderRadius: '8px',
          maxHeight: '32px',
          minHeight: '24px',
          fontSize: '0.8rem',
          wordBreak: 'break-all',
          marginTop: '0.5rem',
          marginBottom: '0.5rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>{link}</pre>
      </ModalDesc>
      <ModalActions>
        <ModalButtonAccept onClick={onClose}>
          Fechar
        </ModalButtonAccept>
      </ModalActions>
    </ModalContent>
  );
}

const ConnectedShareModal = connector(ShareModal);
export default ConnectedShareModal;
