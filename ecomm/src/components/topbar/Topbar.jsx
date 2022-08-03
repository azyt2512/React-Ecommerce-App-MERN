import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/apicall";
import styled from "styled-components";
import { mobile } from "../../responsive";


const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  padding: 0px 20px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

export default function Topbar() {
  const user = useSelector(state=>state.user.currentUser)
  const dispatch = useDispatch();
   const handleClick=(e)=>{
      e.preventDefault()
      logout(dispatch)
   }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">{user?user.username:"admin"}</span>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div> */}
          <MenuItem onClick={handleClick}>SIGN OUT</MenuItem>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
