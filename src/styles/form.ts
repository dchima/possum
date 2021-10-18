import styled from 'styled-components';

/**
 * Form Styling
 */
export default styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: center;
  margin-bottom: 60px;
  margin-top: 50px;
  input{
    margin-bottom: 10px;
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
