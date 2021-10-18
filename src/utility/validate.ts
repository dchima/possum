
/**
 * Validate User input
 * @param {string} name - user name
 * @param {string} email - user email address
 * @param {string} password - user password
 * @param {string} password2 - user confirm password
 * @returns 
 */
const validate = (name: string, email: string, password: string, password2: string) => {
  let errors = {
    name: "",
    email: "",
    password: "",
    password2: ""
  };
  // const emailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
  const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  const passwordRegex = new RegExp(/[a-zA-Z]+[(@!#\$%\^\&*\)\(+=._-]{1,}/);
  if (!emailRegex.test(email)) errors.email = 'Invalid Email';
  if (!name || name.length < 2) errors.name = "Please enter a name";
  if (!password || password.length < 8 || !passwordRegex.test(password)) errors.password = 'Password must be greater than 8 character, must contain a special character or number'
  if (password2 !== password) errors.password2 = 'Password Must Match'

  return errors;
};

export default validate;