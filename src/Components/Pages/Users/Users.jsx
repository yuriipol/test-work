import style from "./Users.module.css";
import { useState, useEffect } from "react";
import { getUsersCards } from "../../../Servises/tweetsApi";
import logo from "../../../images/Logo.png";
import fonPictire from "../../../images/picture.png";
import linePicture from "../../../images/Line.png";
import ellipse from "../../../images/Boy.png";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersCards = async () => {
      const data = await getUsersCards();
      setUsers([...data]);
    };

    usersCards();
  }, []);
  // console.log(users);
  const userItem = users.map(({ id, user, followers, tweets, avatar }) => (
    <li key={id} className={style.item}>
      <img className={style.imageLogo} src={logo} alt="logo" />
      <img className={style.fonPicture} src={fonPictire} alt="fon" />

      <img className={style.linePicture} src={linePicture} alt="line" />

      <img className={style.ellipse} src={ellipse} alt="ellipse" />

      <img className={style.image} src={avatar} alt={user} />
      <p className={style.tweets}>{tweets} tweets</p>
      <p className={style.followers}>{followers} followers</p>
      <button type="button" className={style.button}>
        Follow
      </button>
    </li>
  ));
  return (
    <>
      <ul className={style.userList}>{userItem}</ul>
    </>
  );
};
export default Users;
