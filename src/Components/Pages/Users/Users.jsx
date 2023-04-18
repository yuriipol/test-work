import style from "./Users.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersCards } from "../../../Servises/tweetsApi";

import UserList from "../../UserList/UserList";

const Users = () => {
  const [users, setUsers] = useState([]);
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

  const findLocalStorageItem = (findButton) => {
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
    } else {
      localStorage.setItem(
        "user",
        JSON.stringify([...findButtonLocalStorage, findButton])
      );
    }
  };
  function numberWithCommas(number) {
    const followers = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return followers;
  }

  const isFolow = (findEl) => {
    return JSON.parse(localStorage.getItem("user")).some(
      (user) => user.id === findEl
    );
  };

  const onClickLoadVore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <button
        type="button"
        className={style.buttonBack}
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
      <UserList
        users={users}
        findLocalStorageItem={findLocalStorageItem}
        numberWithCommas={numberWithCommas}
        isFolow={isFolow}
      />
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
