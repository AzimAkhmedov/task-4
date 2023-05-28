import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Table from "@mui/joy/Table";

import Checkbox from "@mui/joy/Checkbox";

import { deleteUser, getUsers, updateStatus } from "../../redux/reducer";
import s from "./index.module.scss";
import jwtDecode from "jwt-decode";

const Users = () => {
  const [checked, setChecked] = useState<Array<boolean>>([]);
  const [all, setAll] = useState<boolean>(false);
  const { error, loader, users } = useAppSelector(
    (state) => state.slice.usersState
  );
  const { isAuth, token, user } = useAppSelector(
    (state) => state.slice.authState
  );
  const handleCheck = () => {
    let arr: Array<boolean> = new Array(users.length).fill(false);
    setChecked(arr);
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  useEffect(() => {
    console.log(user.username);
  }, [isAuth]);
  useEffect(() => {
    handleCheck();
  }, [users]);
  const handleDelete = () => {
    for (let i = 0; i < users.length; i++) {
      if (checked[i]) {
        dispatch(deleteUser(users[i].username));
        if (users[i].username === user.username) {
          window.location.reload();
        }
      }
    }
  };
  const handleBlock = () => {
    for (let i = 0; i < users.length; i++) {
      if (checked[i]) {
        dispatch(
          updateStatus({ username: users[i].username, stat: "Blocked" })
        );
        if (users[i].username === user.username) {
          window.location.reload();
        }
      }
    }
  };

  const handleUnBlock = () => {
    for (let i = 0; i < users.length; i++) {
      if (checked[i]) {
        dispatch(
          updateStatus({ username: users[i].username, stat: "Not-Blocked" })
        );
      }
    }
  };
  const handleAllCheck = () => {
    let flag = true;
    checked.forEach((e) => {
      if (!e) flag = false;
    });

    return flag;
  };

  const handleCheckbox = (index: number) => {
    let temp: Array<boolean> = [];
    checked.forEach((e, i) => {
      if (i == index) {
        temp.push(!e);
      } else {
        temp.push(e);
      }
    });
    setChecked(temp);
  };

  return loader ? (
    <>Загрузка</>
  ) : error ? (
    <div className={s.error}>Произошла ошибка, попробуйте позже</div>
  ) : (
    <div className={s.table}>
      <div className="tooltip">
        <button
          onClick={() => {
            handleBlock();
            dispatch(getUsers());
          }}
        >
          Block
        </button>
        <button
          onClick={() => {
            handleUnBlock();
            dispatch(getUsers());
          }}
        >
          Unblock
        </button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={handleAllCheck() || all}
                onChange={(e) => {
                  let a = new Array(checked.length).fill(!all);
                  setChecked(a);
                  setAll(!all);
                }}
              />
            </th>
            <th>Username</th>
            <th>email</th>
            <th>Registered time</th>
            <th>Last Enterance time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map(
            ({ email, username, status, lastEnterance, registred, _id }, i) => (
              <tr key={_id}>
                <th>
                  <Checkbox
                    onChange={(e) => {
                      handleCheckbox(i);
                      if (handleAllCheck() && e.target.checked) {
                        setAll(false);
                        handleCheckbox(i);
                      }
                      console.log(checked[i]);
                    }}
                    checked={checked[i] || all}
                  />
                </th>
                <th>{username}</th>
                <th>{email}</th>
                <th>{registred}</th>
                <th>{lastEnterance}</th>
                <th>{status}</th>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
