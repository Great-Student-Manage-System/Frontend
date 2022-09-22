import styled from "styled-components";

const InputBoxContainer = styled.div`
  margin: 0 auto;
`;

const InputContainer = styled.div`
  width: 376px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  max-width: 376px;
  min-width: 296px;
  height: 42px;
  width: 100%;
`;

const TitleLabel = styled.label`
  display: block;
`;

const ConfirmButton = styled.button`
  width: 72px;
  height: 42px;
  margin-left: 8px;
`;

interface InputProps {
  title?: string;
  placeholder?: string;
  isButton: boolean;
}

function InputBox({ title, placeholder, isButton }: InputProps) {
  return (
    <InputBoxContainer>
      {title ? <TitleLabel>{title}</TitleLabel> : null}
      <InputContainer>
        <Input placeholder={placeholder} />
        {isButton ? <ConfirmButton>버튼</ConfirmButton> : null}
      </InputContainer>
    </InputBoxContainer>
  );
}

export default InputBox;
