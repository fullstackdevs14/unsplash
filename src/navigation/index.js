import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import UserList from '../screens/UserList'
import UserDetail from '../screens/UserDetail'

const StackNavigator = createStackNavigator(
  {
    UserList: {
      screen: UserList
    },
    UserDetail: {
      screen: UserDetail
    }
  },
  {
    initialRouteName: 'UserList',
    headerMode: 'none',
    mode: 'modal'
  }
)

export default createAppContainer(StackNavigator)
