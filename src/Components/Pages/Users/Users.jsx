import style from "./Users.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersCards } from "../../../Servises/tweetsApi";
import logo from "../../../images/Logo.png";
import fonPicture from "../../../images/picture.png";
import linePicture from "../../../images/Line.png";
import ellipse from "../../../images/Boy.png";

const Users = () => {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) ?? []
  );
  // const [isActive, setActive] = useState(false);
  const [findEl, setFindEl] = useState("");
  const [page, setPage] = useState(1);
  // const [count, setCount] = useState(0);

  // console.log(users);
  const navigate = useNavigate();

  useEffect(() => {
    const usersCards = async () => {
      const data = await getUsersCards();
      setUsers([...data]);
      localStorage.setItem("users", JSON.stringify(users));
    };

    usersCards();
  }, [users]);

  function numberWithCommas(number) {
    const followers = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return followers;
  }
  function handleClick(event) {
    // setActive((prevState) => !prevState);
    // const foo = document.querySelectorAll("button");

    // for (var i = 0; i < foo.length; i++) {
    //   foo[i].classList.remove("buttonActive");
    // }
    // console.log(foo);
    const findButton = users.find((user) => user.id === event.currentTarget.id);
    setFindEl(findButton.id);
    // setCount(findButton.followers);
    // setCount((prevState) => prevState + 1);

    // event.currentTarget.classList.add("buttonActive");
    console.log(event.currentTarget);
  }

  const onClickLoadVore = () => {
    setPage((prevPage) => prevPage + 1);
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
        className={id === findEl ? style.buttonActive : style.button}
        onClick={handleClick}
        id={id}
      >
        <span className={style.buttonText}>
          {id === findEl ? "Following" : "Follow"}
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
