import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    toolbar :{
    backgroundColor:"black",
    },
    headIcons :{
        color:'white'
    },
    searchbar :{
        marginLeft:'10px'
    },
    pageContent:{
         width: '40%',
         marginTop:'50px',
         marginLeft:'30%',
         marginRight:'30%'
    },
    link:{
        textDecoration: "none",
        color:'white'
    },
    tablediv :{
        margin:'10px',
    },
    appBackground: {
        marginTop:'80px',
        marginBottom:'100px'
    },
    formBox :{ 
        display : 'flex',
        flexDirection : 'column',
        marginLeft:'20%',
        marginRight: '20%',
        marginBottom:'20%'
    },
    savebtn :{
        marginLeft:'30%',
        width:'100px',
        backgroundColor: 'green'
    },
    cancelbtn:{
        backgroundColor:'red',
        marginLeft:'10%',
    },
    box1 :{
        width:'96%',
        marginTop:'100px',
        marginLeft:'25%',
        marginright:'25%',

    },
    updateLink :{
        textDecoration: "none",
        color:'white'
    },
    cancelLink :{
        textDecoration: "none",
        color:'black',
    
    },
    profimage : {
        height : '200px',
        width : '150px'
    },
    flexContainer :{
        marginTop:'10px',
        height:'400px',
        width:'100%',
        backgroundColor:'#dcedc8',
        display:'flex',

    },
    cardDiv :{
        backgroundColor:'#f1f1f1',
        margin:'10px',
        padding:'20px',
        fontSize:'20px',
        width:'24%'
    },
    contactDiv :{
        marginTop:'10px',
        height:'300px',
        width:'100%',
        backgroundColor:'#bbdefb',
        display:'flex',
    },
    cdiv :{
        backgroundColor:'#f1f1f1',
        marginTop:'80px',
        marginBottom:'20px',
        marginLeft:'20px',
        padding:'20px',
        fontSize:'20px',
        width:'48%',
        height:'200px'
    },
    footerDiv :{
        backgroundColor:'black',
        color:'white',
        marginTop:'20px',
        marginBottom:'0',
        height:'40px',
        textAlign:'center',
        paddingTop:'5px',
        fontSize:'20px',

    },
    formDiv :{
        marginTop:'100px',
        marginLeft:'25%',
        width:'50%',
    },
    mainContainer :{
        backgroundColor:'gray'
    },
    error1 : {
        color : 'red'
    }
    
    
}))
export default useStyles;