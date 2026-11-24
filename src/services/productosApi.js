import axios from 'axios';

const productosApi = axios.create({
    baseURL: import.meta.env.VITE_API_PRODUCTOS_URL || 'http://44.208.234.253:8081/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor: si existe un token JWT guardado, lo adjunta automáticamente
productosApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Funciones CRUD exportadas para toda la aplicación
export const obtenerProductos = async () => {
    const { data } = await productosApi.get('/productos');
    return data;
};

export const obtenerProductoPorId = async (id) => {
    const { data } = await productosApi.get(`/productos/${id}`);
    return data;
};

export const crearProducto = async (producto) => {
    const { data } = await productosApi.post('/productos', producto);
    return data;
};

export const actualizarProducto = async (id, producto) => {
    const { data } = await productosApi.put(`/productos/${id}`, producto);
    return data;
};

export const eliminarProducto = async (id) => {
    await productosApi.delete(`/productos/${id}`);
};

export default productosApi;