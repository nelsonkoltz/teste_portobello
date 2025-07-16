import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ListaPedidos } from './pages/ListaPedidos.tsx';
import { CriarPedido } from './pages/CriarPedido.tsx';
import { DetalhesPedido } from './pages/DetalhesPedido.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListaPedidos />} />
        <Route path="/" element={<ListaPedidos />} />
        <Route path="/novo" element={<CriarPedido />} />
        <Route path="/pedidos/:id" element={<DetalhesPedido />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
