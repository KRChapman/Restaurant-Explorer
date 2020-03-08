
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import excelent from './../../assets/health/excellent.png'
import good from './../../assets/health/good.png';
import okay from './../../assets/health/okay.png';
import improve from './../../assets/health/improve.png';
const useStyles = makeStyles(theme=>({
  root:{
    maxWidth: 630,
    [theme.breakpoints.down('md')]: {
    //  width: 330,
      maxHeight: 430,
    },
  },
  table: {
   width: "100%",
    [theme.breakpoints.down('md')]: {
      height: 230,
    },

  },
  cell: {

    [theme.breakpoints.down('md')]: {
      fontSize: "0.675rem",
    },
       
  }
}));



// const TitleCell = (props) => {
//   const {children} = props;
//   return (<TableCell className={classes.cell} size={'small'} align="right">{children}</TableCell>)
// }

// const InfoCell = (props) => {
//   const { children } = props;
//   return (<TableCell className={classes.cell} size={'small'} align="right">{children}</TableCell>)
// }

// export default ;


export default function InspectionsTable(props) {
  const classes = useStyles();
  const {tableData} = props;

 const rows = createData(tableData);
  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead >
          <TableRow >
            <TableCell className={classes.cell} size={'small'}>Business Name</TableCell>
            <TableCell className={classes.cell} size={'small'} align="right">Inspection Date</TableCell>
        
            <TableCell className={classes.cell} size={'small'} align="right">Inspection Result&nbsp;</TableCell>
           
      
            <TableCell className={classes.cell} size={'small'} align="right">Violation Points&nbsp;</TableCell>
            <TableCell className={classes.cell} size={'small'} align="right">Violation Destription</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

 function createData(tableData) {
  
  const rows = tableData.map(ele => {
    const classes = useStyles();
    const { name, grade, inspection_date, violation_points,
      inspection_result, inspection_score, inspection_type,
      violation_description } = ele

    const violationDestription = violation_description || 'none available'
    const recentGrade = grade.toString();
    const healthImages = { '1': excelent, '2': good, '3': okay, '4': improve }
   // const healthImage = healthImages[recentGrade];

  // return { name, inspection_date, healthImage, inspection_result, inspection_type, inspection_score, violation_points, violationDestription };
 //     < TableCell align = "right" > Inspection Grade& nbsp; (g)</TableCell >
 //   <TableCell align="right">{grade}</TableCell>
  //      <TableCell align="right">Inspection Score&nbsp;(g)</TableCell>
  //        <TableCell align="right">{inspection_score}</TableCell>
  //  <TableCell align="right">Inspection Type&nbsp;(g)</TableCell>
  //   < TableCell align = "right" > { inspection_type }</TableCell>  
  return (
      <TableRow key={inspection_date}>
      <TableCell className={classes.cell} size={'small'} component="th" scope="row">
          {name}
        </TableCell>
      <TableCell className={classes.cell}  size={'small'} align="right">{inspection_date}</TableCell>
     
      <TableCell className={classes.cell}  size={'small'} align="right">{inspection_result}</TableCell>
 

      <TableCell className={classes.cell}  size={'small'} align="right">{violation_points}</TableCell>
      <TableCell className={classes.cell}  size={'small'}align="right">{violationDestription}</TableCell>
      </TableRow >
    )
  })
  return rows;

}

