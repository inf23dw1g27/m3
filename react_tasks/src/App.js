import { Admin, Resource, ListGuesser } from "react-admin";
import lb4Provider from "react-admin-lb4";
import { UsersList, UsersEdit } from "./UsersList";
import { TaskCategoriesList, TaskCategoriesEdit } from "./TaskCategoriesList";
import { TaskStatusList, TaskStatusEdit } from "./TaskStatusList";
import { TasksList, TasksEdit } from "./TasksList";

const dataProvider = lb4Provider("http://localhost:3000");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" edit={UsersEdit} list={UsersList} />
    <Resource name="taskcategories" edit={TaskCategoriesEdit} list={TaskCategoriesList} />
    <Resource name="taskstatus" edit={TaskStatusEdit} list={TaskStatusList} />
    <Resource name="tasks" edit={TasksEdit} list={TasksList} />
  </Admin>
);

export default App;