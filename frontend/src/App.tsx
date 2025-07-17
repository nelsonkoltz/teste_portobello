import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ListaPedidos } from './pages/ListaPedidos.tsx';
import { NovoPedido } from './pages/NovoPedido.tsx';
import { DetalhesPedido } from './pages/DetalhesPedido.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListaPedidos />} />
        <Route path="/" element={<ListaPedidos />} />
        <Route path="/novo" element={<NovoPedido />} />
        <Route path="/pedidos/:id" element={<DetalhesPedido />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
