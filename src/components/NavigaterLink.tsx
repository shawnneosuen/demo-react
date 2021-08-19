import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import { useNavigate } from "react-router-dom";
const links = [
  {
    icon: <OndemandVideoIcon />,
    title: "主监控",
    path: "/",
  },
  {
    icon: <RadioButtonUncheckedIcon />,
    title: "钢卷信息",
    path: "/terminal-product",
  },
  {
    icon: <DriveEtaIcon />,
    title: "装载管理",
    path: "/terminal-transport",
  },
];

const NavigaterLink = () => {
  let navigate = useNavigate();
  return (
    <div>
      <List>
        {links.map((link) => (
          <ListItem
            button
            key={link.title}
            onClick={() => {
              navigate(link.path);
            }}
          >
            <ListItemAvatar>{link.icon}</ListItemAvatar>
            <ListItemText primary={link.title}></ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default NavigaterLink;
