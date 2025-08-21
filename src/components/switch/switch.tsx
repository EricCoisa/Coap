import { SwitchContainer, SwitchButton, SwitchLabel } from './switch.styles';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

function Switch({ checked, onChange, label }: SwitchProps) {
  function handleToggle(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    onChange(!checked);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(!checked);
    }
  }

  return (
    <SwitchContainer>
      <SwitchButton
        type="button"
        checked={checked}
        aria-checked={checked}
        role="switch"
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        <span />
      </SwitchButton>
      {label && <SwitchLabel>{label}</SwitchLabel>}
    </SwitchContainer>
  );
}

export default Switch;
