import axios from 'axios';

const BASE_URL = 'http://localhost:8080/pedidos';

export const getPedidos = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createPedido = async (pedido: any) => {
  const response = await axios.post(BASE_URL, pedido);
  return response.data;
};

export const deletePedido = async (id: string) => {
  await axios.delete(`${BASE_URL}/${id}`);
};

export async function getPedidoById(id: string) {
  const response = await fetch(`http://localhost:8080/pedidos/${id}`);
  if (!response.ok) throw new Error('Erro ao buscar pedido');
  return await response.json();
}


