package com.portobello.pedidos.controller;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.portobello.pedidos.model.Pedido;
import com.portobello.pedidos.service.PedidoService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PedidoController.class)
public class PedidoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PedidoService pedidoService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void deveListarTodosPedidos() throws Exception {
        Pedido pedido = new Pedido("1", "João", "Produto A", "Descrição", LocalDateTime.now());

        Mockito.when(pedidoService.listar()).thenReturn(Arrays.asList(pedido));

        mockMvc.perform(get("/pedidos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nomeCliente").value("João"))
                .andExpect(jsonPath("$[0].item").value("Produto A"));
    }

    @Test
    void deveBuscarPedidoPorId() throws Exception {
        Pedido pedido = new Pedido("1", "Maria", "Produto B", "Desc", LocalDateTime.now());

        Mockito.when(pedidoService.buscarPorId("1")).thenReturn(Optional.of(pedido));

        mockMvc.perform(get("/pedidos/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nomeCliente").value("Maria"))
                .andExpect(jsonPath("$.item").value("Produto B"));
    }

    @Test
    void deveCriarPedido() throws Exception {
        Pedido pedido = new Pedido(null, "Lucas", "Produto X", "Texto", LocalDateTime.now());
        Pedido salvo = new Pedido("123", "Lucas", "Produto X", "Texto", LocalDateTime.now());

        Mockito.when(pedidoService.criar(Mockito.any(Pedido.class))).thenReturn(salvo);

        mockMvc.perform(post("/pedidos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(pedido)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("123"))
                .andExpect(jsonPath("$.nomeCliente").value("Lucas"));
    }

    @Test
    void deveDeletarPedido() throws Exception {
        Mockito.doNothing().when(pedidoService).deletar("1");

        mockMvc.perform(delete("/pedidos/1"))
                .andExpect(status().isNoContent());
    }
}
