import { redirect } from "react-router-dom";
import LoginForm from "../../components/Auth/login";

function LoginPage() {
  return (
    <section>
      <LoginForm />
    </section>
  );
}

export default LoginPage;

export async function action({request}) {
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password')
  } 
  
  const response = await fetch('https://aqary-eg.onrender.com/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(authData)
  });

  if(response.status !== 200) {
    return response;
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 24);
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect('/');
}
