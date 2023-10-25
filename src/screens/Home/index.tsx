import { View, Text, Image, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { TaskInfo } from "../../components/TaskInfo";
import { Task } from "../../components/Task";
import { styles } from "./style";
import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]); // typa pq é um array, mais de um na lista
  const [taskText, setTaskText] = useState('');

  const [doneTask, setDoneTask] = useState<number>(0)
  const taskCount = tasks.length
  
  //Aqui novo

  const [taskDone, setTaskDone] = useState<string[]>([])
  
  function handleTaskDone(task: string){
    setTaskDone(prevState => [...prevState, task] )
  }

  function handleTaskNotDone(task: string){
    setTaskDone(prevState => prevState.filter(item => item !== task) )
  }

  function handleTaskAdd(){
    if (tasks.includes(taskText)) {
      return Alert.alert("Essa tarefa já Existe!", "Registre tarefas diferentes!")
    }

    setTasks(prevState => [...prevState, taskText]);
    setTaskText(''); //NÂO ENTENDI PQ LIMPAR O ESTADO
  }

  function handleTaskRemove(task: string){
    

    Alert.alert("Remover", `Você quer remover essa Tafera? ${task}`, [
      {
        text:'Sim',
        onPress: () => {
          setTasks(prevState => prevState.filter(assignment => assignment !== task))
          if(taskDone.includes(task)){
            setTaskDone(prevState => prevState.filter(assignment => assignment !== task))
          }
          handleTaskNotDone(task)
        } // após o filter é só ladeira abaixo
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
    
  }

  

  return (
    <>
      <View style={styles.header}>
        <Image 
          style={styles.logo}
          source={require("../../../assets/logo.png")}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.form}>
          <TextInput 
            style={styles.input}
            placeholder="Adicione uma nova tarefa"
            placeholderTextColor={"#808080"}
            onChangeText={setTaskText}
            value={taskText}
          />
          <TouchableOpacity 
            style={styles.button}
            onPress={handleTaskAdd}
          >
            <Text style={styles.buttonText}> + </Text>
          </TouchableOpacity>
        </View>


        {/* <TaskInfo number={9}/> */}
        <View style={styles.taskInfo}>
          <View style={styles.createdWrap}>
            <Text style={styles.created}>Criadas</Text>
            <View style={styles.info}>
              <Text style={styles.innerInfo}>{taskCount}</Text>
            </View> 
          </View>
          
          <View style={styles.doneWrap}>
            <Text style={styles.done}>Concluídas</Text>
            <View style={styles.info}>
              <Text style={styles.innerInfo} >{taskDone.length}</Text>
            </View> 
          </View>  
        </View>

        <View style={styles.line}></View>
        
        <FlatList 
          data={tasks}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <Task 
              key={item}
              task={item} 
              onRemove={() => handleTaskRemove(item)}
              onDone={(task) => handleTaskDone(task)}
              onNotDone={(task) => handleTaskNotDone(task)}
              />
          )}
          ListEmptyComponent={() => (
            <View style={styles.noTask}>
              <Image 
                style={styles.logo}
                source={require("../../../assets/notaskadded.png")}
              />
              <Text style={styles.noTaskTextBold}>Você ainda não tem tarefas cadastradas</Text>
              <Text style={styles.noTaskText}>Crie tarefas e organize seus itens a fazer</Text>
        </View>
          )}
        />
          
        
        
        
        </View>
    </>
  );
}