import { useParams } from 'react-router-dom';

export function DetalhesPedido() {
  const { id } = useParams();

  return (
    <div style={{ padding: '20px' }}>
      <h2>📄 Detalhes do Pedido</h2>
      <p>ID do pedido: {id}</p>

      {/* Aqui futuramente você pode carregar os dados do pedido do backend com o id */}
    </div>
  );
}
