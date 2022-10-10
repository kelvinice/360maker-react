import './styles/App.css';
import './styles/photo-sphere-viewer.min.css';
import './styles/markers.min.css';

import React from 'react';
import PhotoSphereViewer from "./core/PhotoSphereViewer";

function App() {

  return (
      <div className="App">
        <PhotoSphereViewer />
      </div>
  );
  
}

export default App;
