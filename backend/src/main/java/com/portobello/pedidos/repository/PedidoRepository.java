package com.portobello.pedidos.repository;

import com.portobello.pedidos.model.Pedido;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PedidoRepository extends MongoRepository<Pedido, String> {
}
