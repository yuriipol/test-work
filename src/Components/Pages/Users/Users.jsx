import style from "./Users.module.css";
import { useState, useEffect } from "react";
import { getUsersCards } from "../../../Servises/tweetsApi";
import logo from "../../../images/Logo.png";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersCards = async () => {
      const data = await getUsersCards();
      setUsers([...data]);
    };

    usersCards();
  }, []);
  //   console.log(users);
  const userItem = users.map(({ id, user, followers, tweeets, avatar }) => (
    <li key={id} className={style.item}>
      <img className={style.imageLogo} src={logo} alt="Logo" />
      <img className={style.image} src={avatar} alt={user} />
    </li>
  ));
  return (
    <>
      <ul className={style.UserList}>{userItem}</ul>
    </>
  );
};
export default Users;
