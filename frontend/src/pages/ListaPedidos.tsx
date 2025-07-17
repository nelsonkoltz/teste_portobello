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

  return (
    <div className="container">
      <h1 className="title">📋 Lista de Pedidos</h1>

      {pedidos.length === 0 ? (
        <p className="nenhum">Nenhum pedido cadastrado.</p>
      ) : (
        <>
          <div className="tabela-header">
            <Link to="/novo" className="novo-link">
              ➕ Novo Pedido
            </Link>
          </div>

          <table className="tabela-pedidos">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Produto</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
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
        </>
      )}
    </div>
  );
}
