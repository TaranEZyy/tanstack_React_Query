import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Pages from './components/Pages'; // Adjust the import according to your file structure
import DisplayData from './components/DisplayData'; // Adjust the import according to your file structure
import image4 from "./assets/react.svg"
import {  Parallax } from "react-parallax";

const queryClient = new QueryClient();

function App() {

  const image5 = "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/empire-state-building-black-and-white-square-format-john-farnan.jpg"
  window.queryClient = queryClient; // Expose queryClient to the global scope

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Pages />
      <DisplayData />

   


    </QueryClientProvider>
  

  
<div style={{ height: "500px", width: "100%", maxWidth: "600px", margin: "0 auto" }}>
<Parallax
  bgImage={image5}
  strength={100}
  bgImageStyle={{ width: "100%", height: "500px" }}  // Make the image fit inside the container
  renderLayer={(percentage) => (
    <div>
      <div
        style={{
          
          position: "absolute",
          background: `rgba(255, 125, 0, ${percentage * 1})`,
          left: "50%",
          top: "35%",
          borderRadius: "50%",
          transform: "translate(-50%,-50%)",
          width: percentage * 350,   // Adjusted to fit within the container
          height: percentage * 350,  // Adjusted to fit within the container
        }}
      />
    </div>
  )}
>
  <div style={{ height: 600, padding: "20px" }}>
    <div></div>
  </div>
</Parallax>
</div>

</>
  );
}

export default App;
