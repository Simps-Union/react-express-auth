import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";


export default function HomePage() {
  return  <main className="top-page">
      <header>
    <a id='logo' href='/'>Created by Isaac </a>
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
  {/* <motion.main
  className="main__container"
  initial={{ width: 0 }}
   animate={{ width: "100%" }}
   exit={{ x: "100%", opacity: 0 }}
   transition={{ duration: 2 }}/> */}
<h1>Isaac Sagesse</h1>
  <p></p>
</main>;
}
