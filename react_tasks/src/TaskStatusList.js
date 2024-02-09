import {Datagrid, List, Filter, SelectInput , ReferenceField, TextField,  DateInput, Edit, ReferenceInput, SimpleForm, TextInput, useRecordContext } from 'react-admin';

const PostTitle = () => {
  const record = useRecordContext();
  return record ? (<span>TaskStatus {`"${record.name}"`}</span>) : null
}

const PostFilter = (props) => <Filter {...props}>
  <TextInput label="Search" source="nome" alwaysOn />
</Filter >

export const TaskStatusList = (props) => (
  <List filters={<PostFilter />} {...props}>
      <Datagrid rowClick="edit">
          <TextField source="StatusID" />
          <TextField source="StatusName" />
      </Datagrid>
  </List>
);


export const TaskStatusEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
        <TextField source="StatusID" />
          <TextField source="StatusName" />
        </SimpleForm>
    </Edit>
);