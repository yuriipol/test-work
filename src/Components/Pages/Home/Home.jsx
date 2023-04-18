import { NavLink } from "react-router-dom";
import style from "./Home.module.css";

const Home = () => {
  return (
    <div className={style.home}>
      <h2 className={style.title}>Page HOME</h2>
      <NavLink to={"/tweets"} className={style.tweets}>
        <span className={style.textButton}>Go to tweets</span>
      </NavLink>
    </div>
  );
};

export default Home;
