import { redirect } from "react-router-dom";
import RegisterForm from "../../components/Auth/Register";

const RegisterPage = () => {
  return (
    <section>
      <RegisterForm />
    </section>
  );
};

export default RegisterPage;


export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    firstName: data.get('firstName'),
    lastName: data.get('lastName'),
    phoneNumber: date.get('phoneNumber'),
    birthdate: date.get('birthdate'),
    email: data.get('email'),
    password: data.get('password'),
    passwordConfirm: data.get('passwordConfirm')
  };

  const response = await fetch('https://aqary-eg.onrender.com/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authData)
  });

  if (response.status !== 201) {
    return response;
  }

  const resData = await response.json();

  const token = resData.token;
  localStorage.setItem('token', token);

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 24);
  localStorage.setItem('expiration', expiration.toISOString());

  // Store the resData in local storage
  localStorage.setItem('userData', JSON.stringify(resData.data.user));

  return redirect('/');
}

