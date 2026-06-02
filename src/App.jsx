import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import Model101010 from './pages/Model101010';
import Model101010Interactive from './pages/Model101010Interactive';
import SupportLadder from './pages/SupportLadder';
import SupportLadderInteractive from './pages/SupportLadderInteractive';
import SilentCards from './pages/SilentCards';
import SilentCardsInteractive from './pages/SilentCardsInteractive';
import BeautifulMistakes from './pages/BeautifulMistakes';
import BeautifulMistakesInteractive from './pages/BeautifulMistakesInteractive';
import SupportLadderSteps from './pages/SupportLadderSteps';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={
          <Layout>
            <HomePage />
          </Layout>
        } />
        <Route path="/model-10-10-10" element={
          <Layout>
            <Model101010 />
          </Layout>
        } />
        <Route path="/model-10-10-10/interactive" element={
          <Layout>
            <Model101010Interactive />
          </Layout>
        } />
        <Route path="/support-ladder" element={
          <Layout>
            <SupportLadder />
          </Layout>
        } />
        <Route path="/support-ladder/interactive" element={
          <Layout>
            <SupportLadderInteractive />
          </Layout>
        } />
        <Route path="/silent-cards" element={
          <Layout>
            <SilentCards />
          </Layout>
        } />
        <Route path="/silent-cards/interactive" element={
          <Layout>
            <SilentCardsInteractive />
          </Layout>
        } />
        <Route path="/beautiful-mistakes" element={
          <Layout>
            <BeautifulMistakes />
          </Layout>
        } />
        <Route path="/beautiful-mistakes/interactive" element={
          <Layout>
            <BeautifulMistakesInteractive />
          </Layout>
        } />
        <Route path="/about" element={
          <Layout>
            <About />
          </Layout>
        } />
        <Route path="/support-ladder/steps" element={<SupportLadderSteps />} />
      </Routes>
    </Router>
  );
}

export default App;