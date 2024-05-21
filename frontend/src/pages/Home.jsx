import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";


export default function HomePage() {
  return  <main id='intro' className="top-page">
      <header id="intro-header">
    <a id='logo' href='/'> </a>
    <nav>
      <ul>
        <li><NavLink to='/'>Home</NavLink></li>
        <>
          <li><NavLink to='/login'>Creative</NavLink></li>
          <li><NavLink to='/sign-up'>Development</NavLink></li>
        </>
      </ul>
      
    </nav>
  </header>
  <p className="txt" contenteditable="true" >
  WELCOME YOU PUSSIES</p> 
  {/* https://codepen.io/yemon/pen/BwOOWZ */}
  {/* <motion.main
  className="main__container"
  initial={{ width: 0 }}
   animate={{ width: "100%" }}
   exit={{ x: "100%", opacity: 0 }}
   transition={{ duration: 2 }}/> */}
</main>;
}
