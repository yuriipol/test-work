import { useState } from "react";
import logo from "../../images/Logo.png";
import fonPicture from "../../images/picture.png";
import linePicture from "../../images/Line.png";
import ellipse from "../../images/Boy.png";

import style from "./UserItem.module.css";

const UserItem = ({
  el,
  users,
  numberWithCommas,
  isFolow,
  findLocalStorageItem,
}) => {
  const { id, user, followers, tweets, avatar } = el;
  const [count, setCount] = useState(followers);
  function handleClick(event) {
    const findButton = users.find((user) => user.id === event.currentTarget.id);
    findLocalStorageItem(findButton);
    const findLocalStorage = JSON.parse(localStorage.getItem("user"));
    const existLocalStorage = findLocalStorage.some(
      (user) => user.id === event.currentTarget.id
    );
    if (existLocalStorage) {
      setCount(findButton.followers + 1);
    } else {
      setCount((prevstate) => prevstate - 1);
    }
  }

  return (
    <li key={id} className={style.item}>
      <img className={style.imageLogo} src={logo} alt="logo" />
      <img className={style.fonPicture} src={fonPicture} alt="fon" />

      <img className={style.linePicture} src={linePicture} alt="line" />

      <img className={style.ellipse} src={ellipse} alt="ellipse" />

      <img className={style.image} src={avatar} alt={user} />
      <p className={style.tweets}>{tweets} tweets</p>
      <p className={style.followers}>{numberWithCommas(count)} followers</p>
      <button
        type="button"
        className={isFolow(id) ? style.buttonActive : style.button}
        onClick={handleClick}
        id={id}
      >
        <span className={style.buttonText}>
          {isFolow(id) ? "Following" : "Follow"}
        </span>
      </button>
    </li>
  );
};

export default UserItem;
