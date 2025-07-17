import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPedido } from '../services/pedidoService.ts';
import './css/NovoPedido.css';

export function NovoPedido() {
  const navigate = useNavigate();

  const [nomeCliente, setNomeCliente] = useState('');
  const [item, setItem] = useState('');
  const [descricaoItem, setDescricaoItem] = useState('');

  async function salvarPedido(e: React.FormEvent) {
    e.preventDefault();

    if (!nomeCliente || !item) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const novoPedido = {
      nomeCliente,
      item,
      descricaoItem,
      dataCriacao: new Date().toISOString(),
    };

    await createPedido(novoPedido);
    navigate('/');
  }

  return (
    <div className="form-container">
      <h2>➕ Novo Pedido</h2>

      <form onSubmit={salvarPedido}>
        <label>Nome do Cliente *</label>
        <input
          type="text"
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
          required
        />

        <label>Produto *</label>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          required
        />

        <label>Descrição (opcional)</label>
        <textarea
          value={descricaoItem}
          onChange={(e) => setDescricaoItem(e.target.value)}
          rows={3}
        ></textarea>

        <div className="form-actions">
          <button type="submit" className="salvar-btn">Salvar</button>
          <button type="button" className="cancelar-btn" onClick={() => navigate(-1)}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
