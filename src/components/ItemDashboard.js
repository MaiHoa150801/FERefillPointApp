
import { View, StatusBar, StyleSheet, Text, ScrollView } from 'react-native';
import { Foundation } from '@expo/vector-icons';


function ItemDashboard({ 
    title,numberTitle,
    itemContentDetailTitle1,itemContentDetailNumber1,
    itemContentDetailTitle2,itemContentDetailNumber2,
    itemContentDetailTitle3,itemContentDetailNumber3,
    numberTitleColor,icon
     }) {
    return (
        <View style={styles.item}>
        <View  style={styles.itemTitle}>
          <View style={styles.itemTitleLeft}>
            <View style={styles.coverIcon}>
              {icon}
            </View>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View>
            <Text style={{color:numberTitleColor,fontSize:20,fontWeight:'700'}}>{numberTitle}</Text>
          </View>
        </View>
        <View  style={styles.itemContent}>
          <View style={styles.itemContentDetail}>
              <Text style={styles.itemContentDetailTitle}>{itemContentDetailTitle1}</Text>
              <Text style={styles.itemContentDetailNumber}>{itemContentDetailNumber1}</Text>
          </View>
          <View style={styles.itemContentDetail}>
              <Text style={styles.itemContentDetailTitle}>{itemContentDetailTitle2}</Text>
              <Text style={styles.itemContentDetailNumber}>{itemContentDetailNumber2}</Text>
          </View>
          <View style={styles.itemContentDetail}>
              <Text style={styles.itemContentDetailTitle}>{itemContentDetailTitle3}</Text>
              <Text style={styles.itemContentDetailNumber}>{itemContentDetailNumber3}</Text>
          </View>
        </View>
      </View>
    )
}
export default ItemDashboard;

const styles = StyleSheet.create({
  
   
  
 
 
  
  
    
    item:{

        padding:10,
      marginBottom:10,
      borderRadius:20,
      backgroundColor:'white'
    },
    itemTitle:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      borderBottomColor:'#c3c6c9',
      borderBottomWidth:1,
  
    marginBottom:20
    },
    itemTitleLeft:{
      flexDirection:'row',
      alignItems:'center'
    },
    coverIcon:{
      backgroundColor:'#FFF4EC',
      height:45,
      width:45,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:100
    },
    title:{
      fontWeight:'bold', 
      fontSize:20,
      marginLeft:20
    },
    numberTitle:{
      
      
    },
  
    itemContentDetail:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginBottom:20,
      alignItems:'center'
    },
    itemContentDetailTitle:{
      fontWeight:'400',
      fontSize:16,
      color:'#2D1F21',
      width:'50%'
    },
    itemContentDetailNumber:{
      fontWeight:'600',
      fontSize:16,
      color:'#2D1F21',
      
    }
  });
  