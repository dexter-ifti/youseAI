import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '../lib/utils/auth';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = getToken();
        if (token) {
            setIsAuthenticated(true);
        } else {
            router.push('/login');
        }
        setIsLoading(false);
    }, [router]);

    return { isAuthenticated, isLoading };
}