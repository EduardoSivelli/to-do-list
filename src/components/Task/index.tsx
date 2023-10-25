import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./style";
import BouncyCheckbox from "react-native-bouncy-checkbox";


type Props = {
	task: string;
  onRemove: () => void;
  onDone: (task: string) => void;
  onNotDone: (task: string) => void;
}

export function Task(props:Props){
  // function handleTaskCount(){
  //   if()
  // }


  return(
    <View style={styles.containerTask}>
      <BouncyCheckbox 
        onPress={(isChecked: boolean) => {
          console.log(isChecked, "bob")
          if(isChecked === true) {
            props.onDone(props.task)
          }
          if(isChecked === false){
            props.onNotDone(props.task)
          }
        }}
        text={props.task}
        textStyle={styles.containerText}
        fillColor={'#8284FA'}
        // unfillColor={'#4B0082'}
        innerIconStyle= {{ borderColor: '#4EA8DE' }}
        
        size={16}
      />
      <TouchableOpacity 
      onPress={props.onRemove}
      
      >
        <Image 
        style={styles.removeTask}
        source={require('../../../assets/trash.png')}
        />
      </TouchableOpacity>
      
    </View>
  )
}