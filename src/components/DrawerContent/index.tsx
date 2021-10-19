import React from "react";
import {
  Drawer,
  List,
  ListItem,
  Toolbar,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useStatusContext } from "../../context/BasePageStatus";
import { useNavigate } from "react-router-dom";
import InboxIcon from "@material-ui/icons/Inbox";
import NavigaterLink from "../NavigaterLink";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
  })
);

interface Props {
  open: boolean;
}
const BaseDrawer = (props: Props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { drawerFlag, openCloseDialog } = useStatusContext();
  const onClickTitle = (value: string) => {
    // if (value === 'Home'){
    //     navigate(`/${value}`)
    // } else if (value === 'About'){
    //     navigate(`/${value}`)
    // } else {
    //     value
    // }
    navigate(`/${value}`);
    openCloseDialog(drawerFlag);
  };

  const title = ["Home", "Tools", "About"];
  return (
    <Drawer
      className={classes.drawer}
      open={drawerFlag === true}
      variant="persistent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        {/*<List component="nav" aria-label="main mailbox folders">*/}
        {/*    {*/}
        {/*    title.map(temp => <ListItem button key={temp} onClick={() => {*/}
        {/*        onClickTitle(temp)*/}
        {/*    }}>*/}
        {/*         <ListItemIcon>*/}
        {/*            <InboxIcon />*/}
        {/*            </ListItemIcon>*/}
        {/*            <ListItemText primary={temp}/>*/}

        {/*    </ListItem>)*/}
        {/*    }       */}
        {/*</List>*/}
        <NavigaterLink />
      </div>
    </Drawer>
  );
};

export default BaseDrawer;
