import styled from 'styled-components';
import LoginForm from '../features/authentication/LoginForm';
import Heading from '../ui/Heading';
import Logo from '../ui/Logo';
import { useUser } from '../features/authentication/useUser';
import { useNavigate } from 'react-router-dom';

const LoginLayout = styled.main`
	min-height: 100vh;
	display: grid;
	grid-template-columns: 48rem;
	align-content: center;
	justify-content: center;
	gap: 3.2rem;
	background-color: var(--color-grey-50);
`;

function Login() {
	const navigate = useNavigate();
	const { isAuthenticated } = useUser();

	if (isAuthenticated) navigate('/dashboard', { replace: true });
	return (
		<LoginLayout>
			<Logo />
			<Heading as='h4'>Log in to your account</Heading>
			<LoginForm />
		</LoginLayout>
	);
}

export default Login;
