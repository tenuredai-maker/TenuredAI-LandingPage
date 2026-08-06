import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import PageTransition from './components/PageTransition';
import ScrollToTop from './components/ScrollToTop';
import ReadingProgress from './components/ReadingProgress';
import Breadcrumbs from './components/Breadcrumbs';
import TopNavBar from './components/TopNavBar';
import Footer from './components/Footer';
import Ticker from './components/Ticker';
import Home from './pages/Home';
import Features from './pages/Features';
import Manifesto from './pages/Manifesto';
import Learners from './pages/Learners';
import Rules from './pages/Rules';
import Methodology from './pages/Methodology';
import MethodPage from './pages/MethodPage';
import Institutional from './pages/Institutional';
import ChaosLab from './pages/ChaosLab';
import RequestAccess from './pages/RequestAccess';
import Pricing from './pages/Pricing';
import ResponsibleAI from './pages/ResponsibleAI';
import UseCases from './pages/UseCases';
import FAQ from './pages/FAQ';
import TalentUnderwriting from './pages/TalentUnderwriting';
import ComingSoon from './pages/ComingSoon';
import K12Page from './pages/K12Page';
import Recruiters from './pages/Recruiters';
import Universities from './pages/Universities';
import About from './pages/About';
import LearningLoop from './pages/LearningLoop';
import Enterprise from './pages/Enterprise';
import Events from './pages/Events';
import TenuredAgent from './pages/TenuredAgent';

import Podcasts from './pages/Podcasts';
import PodcastDetail from './pages/PodcastDetail';
import UploadPodcast from './pages/UploadPodcast';
import Login from './pages/Login';
import Profile from './pages/Profile';
import LeaderboardPage from './pages/Leaderboard';
import Verification from './pages/Verification';

function AppRoutes() {
  const location = useLocation();
  const longFormRoutes = ['/manifesto', '/docs', '/method', '/rules', '/responsible-ai', '/learners', '/institutional', '/learning-loop', '/enterprise'];

  return (
    <>
      {longFormRoutes.includes(location.pathname) && <ReadingProgress />}
      <AnimatePresence mode="wait">
        <Routes location={location}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
          <Route path="/features" element={<PageTransition><Features /></PageTransition>} />
          <Route path="/manifesto" element={<PageTransition><Manifesto /></PageTransition>} />
          <Route path="/learners" element={<PageTransition><Learners /></PageTransition>} />
          <Route path="/rules" element={<PageTransition><Rules /></PageTransition>} />
          <Route path="/docs" element={<PageTransition><Methodology /></PageTransition>} />
          <Route path="/method" element={<PageTransition><MethodPage /></PageTransition>} />
          <Route path="/recruiters" element={<PageTransition><Recruiters /></PageTransition>} />
          <Route path="/universities" element={<PageTransition><Universities /></PageTransition>} />
          <Route path="/enterprise" element={<PageTransition><Enterprise /></PageTransition>} />
          <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
          <Route path="/tenured-agent" element={<PageTransition><TenuredAgent /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/learning-loop" element={<PageTransition><LearningLoop /></PageTransition>} />
          <Route path="/institutional" element={<PageTransition><Institutional /></PageTransition>} />
          <Route path="/chaos-lab" element={<PageTransition><ChaosLab /></PageTransition>} />
          <Route path="/request-access" element={<PageTransition><RequestAccess /></PageTransition>} />
          <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
          <Route path="/responsible-ai" element={<PageTransition><ResponsibleAI /></PageTransition>} />
          <Route path="/use-cases" element={<PageTransition><UseCases /></PageTransition>} />
          <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
          <Route path="/underwriting" element={<PageTransition><TalentUnderwriting /></PageTransition>} />
          <Route path="/coming-soon" element={<PageTransition><ComingSoon /></PageTransition>} />
          <Route path="/k12" element={<PageTransition><K12Page /></PageTransition>} />

          <Route path="/podcasts" element={<PageTransition><Podcasts /></PageTransition>} />
          <Route path="/podcasts/upload" element={<PageTransition><UploadPodcast /></PageTransition>} />
          <Route path="/podcasts/:id" element={<PageTransition><PodcastDetail /></PageTransition>} />
          <Route path="/leaderboard" element={<PageTransition><LeaderboardPage /></PageTransition>} />
          <Route path="/verification" element={<PageTransition><Verification /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-background selection:bg-primary-container/30">
        <TopNavBar />
        <main className="flex-grow">
          <Breadcrumbs />
          <AppRoutes />
        </main>
        <Footer />
        <Ticker />
      </div>
    </Router>
  );
}
