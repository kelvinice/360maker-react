import './styles/App.css';
import './styles/photo-sphere-viewer.min.css';
import './styles/markers.min.css';

import React from 'react';
import PhotoSphereViewer from "./core/PhotoSphereViewer";
import {FloatingButton} from "./side-menu/floating-button/FloatingButton";
import {MenuProvider} from "./providers/MenuProvider";
import AddSceneModal from "./scenes/add/AddSceneModal";
import ViewSceneModal from "./scenes/view/ViewSceneModal";
import {Toaster} from "react-hot-toast";

const ModalWrapper = () => {
    return (
        <>
            <ViewSceneModal />
            <AddSceneModal />
        </>
    )
}

const App = () => {
  return (
      <div className="App">
          <PhotoSphereViewer />
          <div className="ui-menu top-0 end-0 m-2">
              <FloatingButton />
          </div>
          <ModalWrapper />
      </div>
  );
}

const AppWrapper = () => {
    
    return (
        <MenuProvider>
            <App />
            <Toaster />
        </MenuProvider>
    );
}

export default AppWrapper;
