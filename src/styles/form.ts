import styled from 'styled-components';

export default styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  input{
    margin-bottom: 20px;
    border: 1px solid #dbdbdb;
    padding: 10px 30px;
    border-radius: 15px;
    outline: none;
    // width: 100%;
    background-color: transparent;
    color: #000;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
`;
