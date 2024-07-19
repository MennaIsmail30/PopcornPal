import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import StarRating from './components/StarRating';

// function Test() {
//   const [movieRating, setMovieRating] = useState(0)
//   return (<>

//     <StarRating color='blue' maxRating={10} onSetRating={setMovieRating} />
{/* <p>This movies was rated {movieRating} stars</p>
  </>)
} */}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={5} messages={["Terrable", "Bad", "Okay", "Good", "Amazing"]} defualtRating={0} />

    <StarRating color='red' />
    <Test /> */}

  </React.StrictMode>
);


