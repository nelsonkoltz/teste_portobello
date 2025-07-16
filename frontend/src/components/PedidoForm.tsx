import { useState } from 'react';
import { api } from '../services/api.ts';
import { useNavigate } from 'react-router-dom';

export function PedidoForm() {
  const [nomeCliente, setNomeCliente] = useState('');
  const [descricao, setDescricao] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/pedidos', { nomeCliente, descricao });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Novo Pedido</h2>
      <input
        type="text"
        placeholder="Nome do Cliente"
        value={nomeCliente}
        onChange={(e) => setNomeCliente(e.target.value)}
        required
      />
      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        required
      />
      <button type="submit">Salvar</button>
    </form>
  );
}
