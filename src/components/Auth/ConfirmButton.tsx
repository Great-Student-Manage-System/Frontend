import styled from "styled-components";

const Button = styled.button`
  min-width: 7.2rem;
  height: 4.2rem;
  margin-left: 0.8rem;
  font-size: 1.4rem;
`;

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

export default ConfirmButton;
