import style from "./Users.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersCards } from "../../../Servises/tweetsApi";
import logo from "../../../images/Logo.png";
import fonPicture from "../../../images/picture.png";
import linePicture from "../../../images/Line.png";
import ellipse from "../../../images/Boy.png";

const Users = () => {
  const [users, setUsers] = useState([]);
  // const [isActive, setActive] = useState(false);
  const [findEl, setFindEl] = useState("");
  const [page, setPage] = useState(1);

  if (!localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify([]));
  }

  const navigate = useNavigate();

  useEffect(() => {
    const usersCards = async () => {
      const data = await getUsersCards();
      setUsers([...data]);
    };

    usersCards();
  }, []);

  function numberWithCommas(number) {
    const followers = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return followers;
  }
  function findLocalStorage(findButton) {
    if (!localStorage.getItem("user")) {
      localStorage.setItem("user", JSON.stringify([]));
    }
    const findButtonLocalStorage = JSON.parse(localStorage.getItem("user"));
    const haveId = findButtonLocalStorage.some(
      (user) => user.id === findButton.id
    );
    console.log(findButtonLocalStorage);
    if (haveId) {
      const newLocal = findButtonLocalStorage.filter(
        (user) => user.id !== findButton.id
      );
      localStorage.setItem("user", JSON.stringify(newLocal));
      // console.log(newLocal);
    } else {
      // const addFollowers = findButtonLocalStorage.find((user) => {
      //   if (user.id === findButton.id) {
      //     return user.followers++;
      //   }
      // });
      localStorage.setItem(
        "user",
        JSON.stringify([...findButtonLocalStorage, findButton])
      );
    }
  }

  function handleClick(event) {
    const findButton = users.find((user) => user.id === event.currentTarget.id);
    findLocalStorage(findButton);

    setFindEl(findButton.id);
    // console.log("click");
  }

  const onClickLoadVore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const isFolow = (findEl) => {
    const item = JSON.parse(localStorage.getItem("user"));
    // console.log(item);
    return JSON.parse(localStorage.getItem("user")).some(
      (user) => user.id === findEl
    );
  };

  const userItem = users.map(({ id, user, followers, tweets, avatar }) => (
    <li key={id} className={style.item}>
      <img className={style.imageLogo} src={logo} alt="logo" />
      <img className={style.fonPicture} src={fonPicture} alt="fon" />

      <img className={style.linePicture} src={linePicture} alt="line" />

      <img className={style.ellipse} src={ellipse} alt="ellipse" />

      <img className={style.image} src={avatar} alt={user} />
      <p className={style.tweets}>{tweets} tweets</p>
      <p className={style.followers}>{numberWithCommas(followers)} followers</p>
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
  ));
  return (
    <>
      <button
        type="button"
        className={style.buttonBack}
        onClick={() => navigate(-1)} //отличный способ на кнопку ходить назад
      >
        Go back
      </button>
      <ul className={style.userList}>{userItem}</ul>
      <button
        type="button"
        className={style.loadMore}
        onClick={onClickLoadVore}
      >
        Load more
      </button>
    </>
  );
};
export default Users;
