import { useEffect, useState } from 'react';
import { getPedidos, deletePedido } from '../services/pedidoService.ts';
import { Link, useNavigate } from 'react-router-dom';
import './css/ListaPedidos.css';

interface Pedido {
  id: string;
  nomeCliente: string;
  item: string;
  descricaoItem: string;
  dataCriacao: string;
}

export function ListaPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [filtro, setFiltro] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    carregarPedidos();
  }, []);

  async function carregarPedidos() {
    const resposta = await getPedidos();
    setPedidos(resposta);
  }

  async function excluir(id: string) {
    if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
      await deletePedido(id);
      carregarPedidos();
    }
  }

  const pedidosFiltrados = pedidos.filter((pedido) =>
    pedido.nomeCliente.toLowerCase().includes(filtro.toLowerCase()) ||
    pedido.item.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="title">📋 Lista de Pedidos</h1>

      {/* Campo de pesquisa + botão */}
      <div className="top-bar">
        <input
          type="text"
          placeholder="🔍 Pesquisar cliente ou produto..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="campo-pesquisa"
        />
        <Link to="/novo" className="novo-link">
          ➕ Novo Pedido
        </Link>
      </div>

      {pedidosFiltrados.length === 0 ? (
        <p className="nenhum">Nenhum pedido encontrado.</p>
      ) : (
        <table className="tabela-pedidos">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Produto</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidosFiltrados.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.nomeCliente}</td>
                <td>{pedido.item}</td>
                <td>
                  <button
                    className="detalhes-btn"
                    onClick={() => navigate(`/pedidos/${pedido.id}`)}
                  >
                    Detalhes
                  </button>
                  <button
                    className="excluir-btn"
                    onClick={() => excluir(pedido.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
