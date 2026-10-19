import { View, type SectionListData ,SectionList,Text,StyleSheet} from 'react-native';
import type { CategoryInfo, MenuItem } from '../types/menu';
import { categories, menuItems } from '../data/menu';
import MenuItemRow from "../components/MenuItemRow";
const sections: SectionListData<MenuItem, CategoryInfo>[] = categories.map(
(category) => ({
...category,
data: menuItems.filter((item) => item.category === category.key),
}),
);
export default function MenuGropedScreen(){
    
return(<View style={styles.screen}>
        <SectionList<MenuItem, CategoryInfo>
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MenuItemRow item={item} />
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionTitle}>
            {section.title}
          </Text>
        )}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
        ListHeaderComponent={
          <Text style={styles.title}>Меню за категоріями</Text>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>
            Меню поки порожнє.
          </Text>
        }
        stickySectionHeadersEnabled={true}
        contentContainerStyle={styles.content}/>
        
</View>)
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#495E57',
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495E57',
    backgroundColor: '#F4CE14',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  empty: {
    textAlign: 'center',
    padding: 24,
    color: '#666666',
  },
});