import { useEffect, useState } from 'react';
import { getPedidos, deletePedido } from '../services/pedidoService.ts';
import { Link, useNavigate } from 'react-router-dom';
import './css/ListaPedidos.css';
interface Pedido {
  id: string;
  cliente: string | null;
  dataCriacao: string;
}

export function ListaPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarPedidos();
  }, []);

  async function carregarPedidos() {
    const resposta = await getPedidos();
    console.log('📦 Pedido:', JSON.stringify(resposta, null, 2));
    setPedidos(resposta);
  }

  async function excluir(id: string) {
    await deletePedido(id);
    carregarPedidos();
  }

  return (
    <div className="container">
      <h1 className="title">📋 Lista de Pedidos</h1>

      <div className="top-actions">
        <Link to="/novo" className="novo-link">
          ➕ Novo Pedido
        </Link>
      </div>

      {pedidos.length === 0 ? (
        <p className="nenhum">Nenhum pedido cadastrado.</p>
      ) : (
        <ul className="pedido-list">
          {pedidos.map(pedido => (
            <li key={pedido.id} className="pedido-item">
              <span className="pedido-nome">
                {pedido.cliente ?? `Pedido de ${pedido.dataCriacao}`}
              </span>
              <div className="acoes">
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
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
