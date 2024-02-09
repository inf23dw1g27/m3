import {Datagrid, List, Filter, SelectInput , ReferenceField, TextField,  DateInput, Edit, ReferenceInput, SimpleForm, TextInput, useRecordContext } from 'react-admin';

const PostTitle = () => {
  const record = useRecordContext();
  return record ? (<span>Users {`"${record.name}"`}</span>) : null
}

const PostFilter = (props) => <Filter {...props}>
  <TextInput label="Search" source="nome" alwaysOn />
</Filter >

export const UsersList = (props) => (
  <List filters={<PostFilter />} {...props}>
      <Datagrid rowClick="edit">
          <TextField source="UserID" />
          <TextField source="UserName" />
          <TextField source="Email" />
      </Datagrid>
  </List>
);


export const UsersEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <TextField source="UserID" />
            <TextField source="UserName" />
            <TextField source="Email" />
        </SimpleForm>
    </Edit>
);