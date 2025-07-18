import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPedidoById } from '../services/pedidoService.ts';
import './css/DetalhesPedido.css';

interface Pedido {
  id: string;
  nomeCliente: string;
  item: string;
  descricaoItem: string;
  dataCriacao: string;
}

export function DetalhesPedido() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState<Pedido | null>(null);

  useEffect(() => {
    async function carregarDetalhes() {
      if (!id) {
        console.warn('⚠️ Nenhum ID fornecido na URL.');
        return;
      }

      console.log('🔍 ID recebido:', id);

      try {
        const resposta = await getPedidoById(id);
        console.log('📦 Pedido recebido:', resposta);

        if (!resposta || Object.keys(resposta).length === 0) {
          console.warn('⚠️ Pedido não encontrado ou resposta vazia');
          return;
        }

        setPedido(resposta);
      } catch (error) {
        console.error('❌ Erro ao buscar o pedido:', error);
      }
    }

    carregarDetalhes();
  }, [id]);

  if (!pedido) {
    return <p className="carregando">Carregando detalhes do pedido...</p>;
  }

  return (
    <div className="detalhes-container">
      <h2>📄 Detalhes do Pedido</h2>

      <div className="detalhe">
        <strong>Cliente:</strong> <span>{pedido.nomeCliente}</span>
      </div>

      <div className="detalhe">
        <strong>Produto:</strong> <span>{pedido.item}</span>
      </div>

      <div className="detalhe">
        <strong>Descrição:</strong> <span>{pedido.descricaoItem || 'Sem descrição'}</span>
      </div>

      <div className="detalhe">
        <strong>Data de Criação:</strong>{' '}
        <span>{new Date(pedido.dataCriacao).toLocaleDateString('pt-BR')}</span>
      </div>

      <button className="voltar-btn" onClick={() => navigate(-1)}>
        Voltar
      </button>
    </div>
  );
}
