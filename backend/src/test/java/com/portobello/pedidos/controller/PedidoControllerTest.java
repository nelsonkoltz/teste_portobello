package com.portobello.pedidos.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.portobello.pedidos.model.Pedido;
import com.portobello.pedidos.repository.PedidoRepository;
import com.portobello.pedidos.mensageria.MensageriaSimuladaService;
import com.portobello.pedidos.service.PedidoService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PedidoController.class)
public class PedidoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @SpyBean
    private PedidoService pedidoService;
    @MockBean
    private PedidoRepository pedidoRepository;

    @MockBean
    private MensageriaSimuladaService mensageriaSimuladaService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void deveListarTodosPedidos() throws Exception {
        Pedido pedido = new Pedido();
        pedido.setId("1");
        pedido.setNomeCliente("João");
        pedido.setItem("Produto A");
        pedido.setDescricaoItem("Descrição");
        pedido.setDataCriacao(LocalDateTime.now());

        when(pedidoRepository.findAll()).thenReturn(Arrays.asList(pedido));

        mockMvc.perform(get("/pedidos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nomeCliente").value("João"))
                .andExpect(jsonPath("$[0].item").value("Produto A"));
    }

    @Test
    void deveBuscarPedidoPorId() throws Exception {
        Pedido pedido = new Pedido();
        pedido.setId("1");
        pedido.setNomeCliente("Maria");
        pedido.setItem("Produto B");
        pedido.setDescricaoItem("Desc");
        pedido.setDataCriacao(LocalDateTime.now());

        when(pedidoRepository.findById("1")).thenReturn(Optional.of(pedido));

        mockMvc.perform(get("/pedidos/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nomeCliente").value("Maria"))
                .andExpect(jsonPath("$.item").value("Produto B"));
    }

    @Test
    void deveCriarPedido() throws Exception {
        Pedido pedido = new Pedido();
        pedido.setNomeCliente("Lucas");
        pedido.setItem("Produto X");
        pedido.setDescricaoItem("Texto");
        pedido.setDataCriacao(LocalDateTime.now());

        Pedido salvo = new Pedido();
        salvo.setId("123");
        salvo.setNomeCliente("Lucas");
        salvo.setItem("Produto X");
        salvo.setDescricaoItem("Texto");
        salvo.setDataCriacao(LocalDateTime.now());

        when(pedidoRepository.save(any(Pedido.class))).thenReturn(salvo);

        mockMvc.perform(post("/pedidos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(pedido)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("123"))
                .andExpect(jsonPath("$.nomeCliente").value("Lucas"));

        verify(mensageriaSimuladaService).enviarNotificacaoNovoPedido(Mockito.anyString());
    }

    @Test
    void deveDeletarPedido() throws Exception {
        Mockito.doNothing().when(pedidoRepository).deleteById("1");

        mockMvc.perform(delete("/pedidos/1"))
                .andExpect(status().isNoContent());
    }
}
