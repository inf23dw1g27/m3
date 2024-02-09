import {Datagrid, List, Filter, TextField, Edit, SimpleForm, TextInput, useRecordContext } from 'react-admin';

const PostTitle = () => {
  const record = useRecordContext();
  return record ? (<span>TaskCategories {`"${record.name}"`}</span>) : null
}

const PostFilter = (props) => <Filter {...props}>
  <TextInput label="Search" source="nome" alwaysOn />
</Filter >

export const TaskCategoriesList = (props) => (
  <List filters={<PostFilter />} {...props}>
      <Datagrid rowClick="edit">
          <TextField source="CategoryID" />
          <TextField source="CategoryName" />
      </Datagrid>
  </List>
);


export const TaskCategoriesEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
        <TextField source="CategoryID" />
          <TextField source="CategoryName" />
        </SimpleForm>
    </Edit>
);