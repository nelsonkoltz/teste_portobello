import axios from 'axios';

const BASE_URL = 'http://localhost:8080/pedidos';

// Buscar todos os pedidos
export const getPedidos = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// Criar novo pedido
export const createPedido = async (pedido: any) => {
  const response = await axios.post(BASE_URL, pedido);
  return response.data;
};

// Deletar um pedido
export const deletePedido = async (id: string) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
