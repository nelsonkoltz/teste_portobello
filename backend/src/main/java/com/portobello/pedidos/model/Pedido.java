package com.portobello.pedidos.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Data
@Document(collection = "pedidos")
public class Pedido {
    @Id
    private String id;
    private String cliente;
    private List<ItemPedido> itens;
    private LocalDate dataCriacao;
}
