package com.portobello.pedidos.mensageria;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class MensageriaSimuladaService {

    private static final Logger logger = LoggerFactory.getLogger(MensageriaSimuladaService.class);

    public void enviarNotificacaoNovoPedido(String mensagem) {
        System.out.println("📩 [MENSAGERIA FAKE] " + mensagem);
        logger.info("📩 Mensagem enviada à uma fila simulada: {}", mensagem);
    }
}
