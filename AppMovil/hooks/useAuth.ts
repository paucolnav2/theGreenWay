import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useServidor } from '@/hooks/useServidor';
import CryptoJS from 'crypto-js'
import { createAnimatedComponent } from 'react-native-reanimated/lib/typescript/css/component';

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
            const passEncryptada= CryptoJS.SHA256(pass).toString();
            const esValido = await validarCredenciales(user, passEncryptada);
            
            if (esValido) {
                router.replace({
                    pathname: "/(drawer)",
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
const cerrarSesion = () => {
        router.replace("/login"); 
    };

    return {
        user,    
        pass,
        error,     
        cargando,
        setUser, 
        setPass,
        onLoginPress,
        cerrarSesion 
    };
}