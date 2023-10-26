/**
   26.10.23 The Project Begins Today!

   App Component

*/

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Article from './pages/Article';
import ArticlesList from './pages/ArticlesList';

function App() {
   return (
      <Router>

         <div className="max-w-screen-md mx-auto pt-20">
            <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/about' element={<About />} />
               <Route path='/article' element={<Article />} />
               <Route path='/articleslist' element={<ArticlesList />} />
               <Route path='*' element={<h1>404 Page not found</h1>} />
            </Routes>
         </div>
      </Router>
   );
}

export default App;
