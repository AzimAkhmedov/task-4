import React from "react";
// import { FormCheck } from "react-bootstrap";
import { IUser } from "../../../types";

interface IRow extends IUser {
  allChecked: boolean;
  SetAllChecked: Function;
}
const Row = ({
  email,
  password,
  status,
  username,
  _id,
  registred,
  lastEnterance,
  SetAllChecked,
  allChecked,
}: IRow) => {
  return (
    <tr key={_id}>
      <th>
        {/* <FormCheck
          type="checkbox"
          checked={allChecked}
          onClick={() => {
            SetAllChecked(false);
          }}
        /> */}
      </th>
      <th>{username}</th>
      <th>{email}</th>
      <th>{registred}</th>
      <th>{lastEnterance}</th>
      <th>{status}</th>
    </tr>
  );
};

export default Row;
