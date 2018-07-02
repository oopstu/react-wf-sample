import * as React from "react";

import { withStyles } from "@material-ui/core/styles";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import ListIcon from "@material-ui/icons/ViewList";
import TilesIcon from "@material-ui/icons/ViewModule";

const styles = {
  root: {
    width: 'auto',
    background: 'transparent'
  }
};

interface INavBarProps {
  classes?: any,
  value: number,
  onChange?: (value: number) => void
}


class NavBar extends React.Component<INavBarProps, INavBarProps> {
  constructor(props: any) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = { value: 0 };
  }


  public render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels={true}
        className={classes.root}
      >
        <BottomNavigationAction label="List" icon={<ListIcon />} />
        <BottomNavigationAction label="Tiles" icon={<TilesIcon />} />
        
      </BottomNavigation>
    );
  }

  private handleChange = (event: any, value: any) => {
    if(this.props.onChange) {
       this.props.onChange(value);
    }
    this.setState({ value });
  };


}


export default withStyles(styles)(NavBar);
