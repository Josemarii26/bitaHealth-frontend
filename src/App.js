import logo from './logo.svg';
import './App.css';
import FileUploadComponent from './components/FileUploadComponent';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import InfoSection2 from './components/InfoSection2';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Hero/>
      <InfoSection/>
      <InfoSection2/>
      <FileUploadComponent/>
      <Footer/>
    </div>
  );
}

export default App;
