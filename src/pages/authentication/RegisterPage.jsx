import { redirect } from "react-router-dom";
import RegisterForm from "../../components/Auth/register";

const RegisterPage = () => {
  return (
    <section>
      <RegisterForm />
    </section>
  );
};

export default RegisterPage;


export async function action({request}) {
  const data = await request.formData();
  const authData = {
    firstName: data.get('firstName'),
    lastName: data.get('lastName'),
    email: data.get('email'),
    password: data.get('password'),
    passwordConfirm: data.get('passwordConfirm')
  };
  
  console.log("ana weslt",authData);
  
  const response = await fetch('http://127.0.0.1:4000/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(authData)
  });

  if(response.status !== 201) {
    return response;
  }

  const resData = await response.json();
  console.log(resData);
  const token = resData.token;

  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 24);
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect('/');
}

