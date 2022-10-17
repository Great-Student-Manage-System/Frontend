import styled from "styled-components";

interface ConfirmButtonProps {
  buttonTitle: string;
  buttonHandler: (e: React.MouseEvent) => void;
  isValidation?: boolean;
}

function ConfirmButton({
  buttonTitle,
  buttonHandler,
  isValidation = true,
}: ConfirmButtonProps) {
  return (
    <Button onClick={buttonHandler} disabled={!isValidation}>
      {buttonTitle}
    </Button>
  );
}

const Button = styled.button`
  min-width: 7.2rem;
  height: 4.2rem;
  margin-left: 0.8rem;
  font-size: 1.4rem;

  background: ${(props) => (props.disabled ? `#BDBDBD` : `#319CEA`)};
  border-radius: 6px;

  border: none;
  color: #fff;
`;

export default ConfirmButton;
