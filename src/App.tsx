import { Navigate, Route, Routes } from 'react-router'
import WorldGate from './WorldGate'
import Home from './pages/Home';
import About from './pages/About';
import Experiences from './pages/Experiences';
import Articles from './pages/Articles';
import Daily from './pages/Daily';
import ArticlePage from './pages/ArticlePage'
import Friends from './pages/Friends';


function App() {
  return (
    <Routes>
      <Route path="/" element={<WorldGate />} />
      <Route path='/blog/about' element={<About />} />
      <Route path="/blog" element={<Home />} />
      <Route path='/blog/experiences' element={<Experiences />} />
      <Route path='/blog/articles' element={<Articles />} />
      <Route path='/blog/daily' element={<Daily />} />
      <Route path='/blog/friends' element={<Friends />} />
      {/* 三个栏目共用的文章详情页 */}
      <Route path="/blog/:section/:slug" element={<ArticlePage />} />
      <Route path="/game" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App