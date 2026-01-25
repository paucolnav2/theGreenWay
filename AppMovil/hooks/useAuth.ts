import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useServidor } from '@/hooks/useServidor';

export function useAuth() {
    const router = useRouter();
    const { validarCredenciales } = useServidor();
    const [user, setUser] = useState(""); 
    const [pass, setPass] = useState("");
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    const onLoginPress = async () => {
        setError("");

        if (!user || !pass) {
            setError("Por favor, rellena todos los campos.");
            return;
        }

        setCargando(true);

        try {
            const esValido = await validarCredenciales(user, pass);
            
            if (esValido) {
                router.replace({
                    pathname: "/(tabs)",
                    params: { idUsuario: user } 
                });
            } else {
                setError("Usuario o contraseña incorrectos.");
            }
        } catch (err) {
            setError("No se pudo conectar con el servidor.");
        } finally {
            setCargando(false);
        }
    };

    return {
        user,    
        pass,
        error,     
        cargando,
        setUser, 
        setPass,
        onLoginPress
    };
}