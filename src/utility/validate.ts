const validate = (name: string, email: string, password: string) => {
  let errors = {
    name: "",
    email: "",
    password: ""

  };
  const emailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

  if (!emailRegex.test(email)) errors.email = 'Invalid Email';

  return errors
};

export default validate;