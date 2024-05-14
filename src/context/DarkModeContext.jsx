import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
	const [isDarkMode, setisDarkMode] = useLocalStorageState(false, 'isDarkMode');

	function toggleMode() {
		setisDarkMode((isDark) => !isDark);
	}
	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark-mode');
			document.documentElement.classList.remove('light-mode');
		} else {
			document.documentElement.classList.add('light-mode');
			document.documentElement.classList.remove('dark-mode');
		}
	}, [isDarkMode]);
	return (
		<DarkModeContext.Provider value={{ isDarkMode, toggleMode }}>
			{children}
		</DarkModeContext.Provider>
	);
}

function useDarkMode() {
	const context = useContext(DarkModeContext);

	if (context === undefined)
		throw new Error('Dark mode was used outside of darkmode provider');

	return context;
}

export { DarkModeProvider, useDarkMode };
