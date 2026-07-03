import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavBar from './components/TopNavBar';
import Footer from './components/Footer';
import Ticker from './components/Ticker';
import Home from './pages/Home';
import Features from './pages/Features';
import Manifesto from './pages/Manifesto';
import Learners from './pages/Learners';
import Rules from './pages/Rules';
import Methodology from './pages/Methodology';
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

import Podcasts from './pages/Podcasts';
import PodcastDetail from './pages/PodcastDetail';
import UploadPodcast from './pages/UploadPodcast';
import Login from './pages/Login';
import Profile from './pages/Profile';
import LeaderboardPage from './pages/Leaderboard';
import Verification from './pages/Verification';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background selection:bg-primary-container/30">
        <TopNavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/features" element={<Features />} />
            <Route path="/manifesto" element={<Manifesto />} />
            <Route path="/learners" element={<Learners />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/docs" element={<Methodology />} />
            <Route path="/institutional" element={<Institutional />} />
            <Route path="/chaos-lab" element={<ChaosLab />} />
            <Route path="/request-access" element={<RequestAccess />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/responsible-ai" element={<ResponsibleAI />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/underwriting" element={<TalentUnderwriting />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/k12" element={<K12Page />} />

            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/podcasts/upload" element={<UploadPodcast />} />
            <Route path="/podcasts/:id" element={<PodcastDetail />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/verification" element={<Verification />} />
          </Routes>
        </main>
        <Footer />
        <Ticker />
      </div>
    </Router>
  );
}
