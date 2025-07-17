package com.portobello.pedidos.service;

import com.portobello.pedidos.model.Pedido;
import com.portobello.pedidos.repository.PedidoRepository;
import com.portobello.pedidos.mensageria.MensageriaSimuladaService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    private final PedidoRepository repository;
    private final MensageriaSimuladaService mensageria;

    public PedidoService(PedidoRepository repository, MensageriaSimuladaService mensageria) {
        this.repository = repository;
        this.mensageria = mensageria;
    }

    public Pedido criar(Pedido pedido) {
        Pedido salvo = repository.save(pedido);
        mensageria.enviarNotificacaoNovoPedido("Novo pedido criado: " + salvo.getId() + " - Cliente: " + salvo.getNomeCliente());
        return salvo;
    }

    public List<Pedido> listar() {
        return repository.findAll();
    }

    public Optional<Pedido> buscarPorId(String id) {
        return repository.findById(id);
    }

    public void deletar(String id) {
        repository.deleteById(id);
    }
}
