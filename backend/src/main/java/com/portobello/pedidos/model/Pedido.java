package com.portobello.pedidos.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "pedidos")
public class Pedido {

    @Id
    private String id;
    private String nomeCliente;
    private String item;
    private String descricaoItem;
    private LocalDateTime dataCriacao;

    // Construtor padrão
    public Pedido() {
        this.dataCriacao = LocalDateTime.now();
    }

    // Construtor Teste
    public Pedido(String id, String nomeCliente, String item, String descricaoItem, LocalDateTime dataCriacao) {
        this.id = id;
        this.nomeCliente = nomeCliente;
        this.item = item;
        this.descricaoItem = descricaoItem;
        this.dataCriacao = dataCriacao;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNomeCliente() {
        return nomeCliente;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public String getDescricaoItem() {
        return descricaoItem;
    }

    public void setDescricaoItem(String descricaoItem) {
        this.descricaoItem = descricaoItem;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
}
