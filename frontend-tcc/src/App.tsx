
import Container from './components/layout/Container'
import './index.css'
import LandingPage from './pages/LandingPage'

function App() {
  

  return (
    <>
    <Container children={<LandingPage/>}/>
      
    </>
  )
}

export default App
