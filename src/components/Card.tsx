import * as React from "react";

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// import ITaskProps from './Task';

import { withStyles } from '@material-ui/core/styles';

// export interface ITaskCardProps extends ITaskProps {
//     classes: any,
// }

const styles = {
  root: {
    display: 'inline'
  },
  cardholder: {
    display: 'inline-block', 
    'padding': 0
  },
  card: {
    minWidth: 275,
    width: 275,
    height: 375,
    margin: 10,
    '&:hover': {
      background: '#007ab880'
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  headline: {
    overflow:'hidden', 
    height: 165, 
    padding: 5,
    'word-wrap': 'break-word'
  },
  title: {
    marginBottom: 6,
    fontSize: 14,
  },
  pos: {
    marginBottom: 0,
  }
};

export interface ICardProps {
  classes: any,
  id: string,
  name: string,
  createdBy?: string,
  createdOnDate?: any,
  priority?: string,
  description?: string,
  onClick: () => void
}

function TaskCard(props: ICardProps) {
  const { classes } = props;
  // const bull = <span className={classes.bullet}>•</span>;
  // const inlineStyle = { display: 'inline' };
  const isUrgent = props.priority && props.priority.toLowerCase() === 'urgent';
  const cardInlineStyle = { background: isUrgent ? '#ff000061' : ''}
  return (
    <div className={classes.cardholder} onClick={props.onClick}>
      <Card className={classes.card} style={cardInlineStyle}>
        <CardContent style={{height: 288}}>
          <Typography className={classes.title} color="textSecondary">
            {props.priority}
          </Typography>
          <Typography className={classes.headline} variant="headline" component="h2" title={props.name}>
            {props.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            created by {props.createdBy} on {props.createdOnDate}
          </Typography>
          <Typography component="p"/>
            
        </CardContent>
        <CardActions>
          <Button size="small" onClick={props.onClick}>OPEN</Button>
        </CardActions>
      </Card>
    </div>
  );
}


export default withStyles(styles)(TaskCard);