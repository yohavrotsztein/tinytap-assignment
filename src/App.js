import './App.css';
import { Grid, Card } from '@mui/material';
import PhotoCarousel from './components/PhotoCarousel';
import UploadPhotos from './components/UploadPhotos';
import Header from './Layout/Header.js'


function App() {
  return (
    <div className="App" >
      <Header />
      <Grid container spacing={3} >
        <Grid item xs={12} md={2} lg={2}>
          <UploadPhotos />
        </Grid>
        <Grid item xs={12} md={7} lg={7} >
          <Card sx={{ p: 2, m: 4 }}>
            <PhotoCarousel />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
