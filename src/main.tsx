import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { GlobalStyle, Form } from 'styles';
import Logo from 'images/logo.png';
import { Loader } from 'components';
import { Validate, Endpoint } from 'utility';



const AppContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const Wrapper = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 200px;
  padding: 30px 30px ;
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
  padding: 10px 30px;
  border-radius: 0.5em;

  color: white;
  border: 1px solid #215081;
  outline: none;
  background-color: #215081;
  
  font-size: 12px;
  cursor: pointer;
  margin-left: 10px;
`;

const DeadButton = styled(Button)`
  color: grey;
  border: 1px solid #d2d4d6;
  background-color: #d2d4d6;
  cursor: not-allowed;
`;

const Image = styled.div`
  align-self: flex-start;
  img {
    height: auto;
    width: 80px;
    border-radius: 5px;
    margin-bottom: 20px;
  }
`;

const ButtonWrapper = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: row;
`;


const ErrorMessage = styled.div`
  top: 25px;
  right: 20px;
  font-size: 12px;
  color: #FF6B62;
  margin-left: 15px;
  margin-bottom: 10px
`;

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [view, setView] = useState(1);

  const {
    name, email, password, password2
  } = formData;

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    setErrorMessage(Validate(name, email, password, password2))
  }, [email, name, password, password2]);
  
  
  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data = await Endpoint({ name, email, password });
    setLoading(false);
    if(data.statusCode === 201) {
      setView(view + 1);
    }
  };

  const onReset = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      password2: ''
    });
    setView(1);
  };

  const handleKeyPress = async (e: any) => {
    if(e.key === 'Enter'){
      // await onSubmit(e);
    }
  }

  console.log(view)
  return (
    <AppContainer>
    <GlobalStyle />
    <Wrapper>
      <Image><img src={Logo} alt='logo'/></Image>
      
      { view === 1 &&
      <Form>
      <input
        type="text" 
        placeholder='full name'
        name='name'
        onInput={(e) => onChange(e)}
        onBlur={(e) => onChange(e)}
        value={name}
        onKeyPress={handleKeyPress}
        style={{ borderColor: errorMessage.name &&  '#FF6B62'}}
      />
      <ErrorMessage>{errorMessage.name}</ErrorMessage>
      <input
        type="text"
        placeholder='email'
        name='email'
        onInput={(e) => onChange(e)}
        onBlur={(e) => onChange(e)}
        value={email}
        onKeyPress={handleKeyPress}
        style={{ borderColor: errorMessage.email &&  '#FF6B62'}}
      />
      <ErrorMessage>{errorMessage.email}</ErrorMessage>
      </Form>}
      {view === 1 &&
        ((errorMessage.name || errorMessage.email || !name) ? <ButtonWrapper><DeadButton>Next</DeadButton></ButtonWrapper> : <ButtonWrapper><Button onClick={(e) => setView(view + 1)}>Next</Button></ButtonWrapper>)
      }


      { (view === 2) && 
      <Form>
      <input 
        type="password"
        placeholder='password'
        name='password'
        onInput={(e) => onChange(e)}
        value={password}
        onKeyPress={handleKeyPress}
        style={{ borderColor: errorMessage.password &&  '#FF6B62'}}
      />
      <ErrorMessage>{errorMessage.password}</ErrorMessage>
      <input 
        type="password"
        placeholder='confirm password'
        name='password2'
        onInput={(e) => onChange(e)}
        value={password2}
        onKeyPress={handleKeyPress}
        style={{ borderColor: errorMessage.password2 &&  '#FF6B62'}}
      />
      <ErrorMessage>{errorMessage.password2}</ErrorMessage>
      </Form>}
      {view === 2 &&
      <ButtonWrapper>
      <Button onClick={() => setView(view -1)}>Back</Button>
      {loading ? <Button><Loader /></Button>
      : ((errorMessage.password || errorMessage.password2 || !password) ? <DeadButton>Register</DeadButton> : <Button onClick={(e) => onSubmit(e)}>Register</Button>)}
      </ButtonWrapper>}


      { (view === 3) && <><p>Than You For Registering</p><Button onClick={() => onReset()}>Back To Start</Button></>}
    </Wrapper>

  </AppContainer>
  );
};

export default App;