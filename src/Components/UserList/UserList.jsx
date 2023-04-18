import style from "./UserList.module.css";
import UserItem from "../UserItem/UserItem";

const UserList = ({
  users,
  findLocalStorageItem,
  numberWithCommas,
  isFolow,
}) => {
  return (
    <ul className={style.userList}>
      {users.map((el) => (
        <UserItem
          key={el.id}
          el={el}
          users={users}
          findLocalStorageItem={findLocalStorageItem}
          numberWithCommas={numberWithCommas}
          isFolow={isFolow}
        />
      ))}
    </ul>
  );
};

export default UserList;
