[![Netlify Status](https://api.netlify.com/api/v1/badges/6139d6a5-b7c2-40b5-8faa-f94c1b45ec10/deploy-status)](https://app.netlify.com/sites/mwf-registration/deploys)

# Move Work Forward 2 Step Registration
possum performs a 2-step user registration

----

View Application: https://mwf-registration.netlify.app/

---

### Client
The Client side was build using React with Typescript. It was deployed on [Netlify](https://mwf-registration.netlify.app/).

Since it was a simple 2 step view, no use of external modules required. All validations performed with regex. Styling done with [Styled-Components](https://styled-components.com/)

---

### Server
The Server is a [Serverless](https://serverless.com) function build in Nodejs. You can use the API here: https://wwqck24tfc.execute-api.eu-west-1.amazonaws.com/dev/register

```bash
curl -H "Content-Type: application/json" -X POST '{"name":"Joshua Alison","email":"jalison@test.com","password":"password"}' https://wwqck24tfc.execute-api.eu-west-1.amazonaws.com/dev/register
```

---