import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogout() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { isLoading, mutate: logout } = useMutation({
		mutationFn: logoutApi,
		onSuccess: () => {
			navigate('/login', { replace: true });
			queryClient.removeQueries();
		},
		onError: (error) => {
			console.log(error.message);
			toast.error('Faced some problem while trying to loging out');
		},
	});

	return { logout, isLoading };
}
