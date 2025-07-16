import { useEffect, useState } from 'react';
import { getPedidos, deletePedido } from '../services/pedidoService';

export function PedidoList() {
  const [pedidos, setPedidos] = useState<any[]>([]);

  const carregarPedidos = async () => {
    const dados = await getPedidos();
    setPedidos(dados);
  };

  const handleDelete = async (id: string) => {
    await deletePedido(id);
    carregarPedidos();
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  return (
    <div>
      <h1>Lista de Pedidos</h1>
      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.id}>
            {pedido.nome} : {pedido.descricao}
            <button onClick={() => handleDelete(pedido.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
