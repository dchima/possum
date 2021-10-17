import React, { useState } from "react";
import styled from 'styled-components';
import { GlobalStyle, Basics, Form } from 'styles';
import Logo from 'images/logo.png';
import { Loader } from 'components';



const AppContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const Wrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 200px;
  padding: 50px 50px ;
  // border: 1px solid #AEAEAE;
  background-color: #fff;
  border-radius: 10px;
  box-shadow:  0 2.8px 2.2px rgba(0, 0, 0, 0.034),
  0 6.7px 5.3px rgba(0, 0, 0, 0.048),
  0 1.5px 10px rgba(0, 0, 0, 0.06),
  0 1px 5.9px rgba(0, 0, 0, 0.04);

`;


const Button = styled.div`
  position: relative;
  width: max-content;
  padding: 10px 50px;
  border-radius: 0.5em;

  color: white;
  border: 1px solid #ff3e30;
  outline: none;
  background-color: #ff3e30;
  
  font-size: 12px;
  cursor: pointer;
`;

const Image = styled.div`
  img {
    height: auto;
    width: 80px;
    border-radius: 5px;
  }
`;


const ErrorMessage = styled.div`
  position: fixed;
  top: 25px;
  right: 20px;
  font-size: 15px;
  background-color: #FF6B62;
  padding: 20px;
  border: 1px solid  #FF6B62;
  border-radius: 5px;
  color: white;
`;

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    loading: false,
    errorMessage: '',
  });

  const [showMessage, setShowMessage] = useState(false);

  const {
    name, email, password, loading, errorMessage,
  } = formData;

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  
  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   setFormData({ ...formData, loading: true });
  //   const data = await Endpoints.login(username, password);
  //   setFormData({ ...formData, loading: false });
  //   if (data.responseCode === '01') {
  //     setFormData({ ...formData, errorMessage: data.responseMessage });
  //     setShowMessage(true);
  //     setTimeout(() => setShowMessage(false), 10000);

  //   } if (data.responseCode === '00') {
  //     await history.replace('/dashboard');
  //   }
  // };

  const handleKeyPress = async (e: any) => {
    if(e.key === 'Enter'){
      // await onSubmit(e);
    }
  }


  return (
    <AppContainer>
    <GlobalStyle />
    <Wrapper>
      <Image><img src={Logo} alt='logo'/></Image>
      <Form>
      <input type="text" placeholder='full name' name='name' onChange={(e) => onChange(e)} value={name} onKeyPress={handleKeyPress}/>
      <input type="text" placeholder='email' name='email' onChange={(e) => onChange(e)} value={email} onKeyPress={handleKeyPress}/>

      {/* <input type="password" placeholder='password' name='password' onChange={(e) => onChange(e)} value={password} onKeyPress={handleKeyPress}/> */}
      </Form>
      {loading ? <Button><Loader /></Button>
      : <Button>Login</Button>}
    </Wrapper>

    {showMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
  </AppContainer>
  );
};

export default App;