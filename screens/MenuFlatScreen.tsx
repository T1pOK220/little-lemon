import { FlatList,Pressable,StyleSheet,Text,View} from "react-native";
import { useState } from "react";
import type {MenuItem} from "../types/menu";
import { menuItems } from "../data/menu";
import MenuItemRow from "../components/MenuItemRow";
import { TextInput } from "react-native";
import { Palette } from "../theme/palette";
type MenuProps ={ 
  colors:Palette,
  onContinue: (itemId:string)=>void;
}
function MenuFlatScreen ({colors,onContinue}:MenuProps){
  const [query, setQuery] = useState('');
const normalizedQuery = query.trim().toLocaleLowerCase('uk-UA');
const visibleItems = menuItems.filter((item) =>
item.name.toLocaleLowerCase('uk-UA').includes(normalizedQuery),)
    return (<View style={styles.list}>
               <Text style={styles.title}>Пошук по меню</Text>
      <TextInput style={styles.input} placeholder="Пошук" value={query} onChangeText={setQuery}/>
      <FlatList<MenuItem>
        style={styles.list}
        contentContainerStyle={styles.content}
        data={visibleItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (<Pressable onPress={()=>{onContinue(item.id)}}><MenuItemRow item={item} /></Pressable>)}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.title}>Наше меню</Text>
            <Text style={styles.description}>
              Оберіть страву з нашого асортименту
            </Text>
          </View>
        }
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Страв не знайдено.
          </Text>
        }
      /></View>)
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#BBBBBB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginBottom: 8,
    fontSize: 16,
  },
  list: {
    flex: 1,
     backgroundColor: '#FFFFFF',
     padding:10
  },
  content: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  listHeader: {
    paddingVertical: 12,
    alignItems:"center"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#495E57',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  empty: {
    textAlign: 'center',
    paddingVertical: 30,
    color: '#666666',
    fontSize: 16,
  },
  input:{
    borderColor:"#333",
    padding:10,
    borderRadius:16,
    backgroundColor:"#c0c0c0"
  }
});
export default MenuFlatScreen;