import * as React from 'react';
import {
  GanttComponent,
  Inject,
  Edit,
  Selection,
  Toolbar,
  Filter,
  Resize,
  ColumnsDirective,
  ColumnDirective,
} from '@syncfusion/ej2-react-gantt';
import { Query } from '@syncfusion/ej2-data';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import {
  CheckBoxSelection,
  Inject,
  MultiSelectComponent,
} from '@syncfusion/ej2-react-dropdowns';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { resourceResources } from './data';

('https://ej2.syncfusion.com/react/demos/src/grid/images/');

const Gantt = ({ model, dataManager }) => {
  const [query, setQuery] = React.useState(model?.query ?? {});
  const [dialogUser, setDialogUser] = React.useState(false);
  const [user, setUser] = React.useState([]);

  React.useEffect(() => {
    if (model?.query) {
      setQuery(new Query().where(model.query));
    } else {
      setQuery({});
    }
  }, [model]);

  const toolbar = [
    'Add',
    'Edit',
    'Delete',
    { text: 'Usuarios', prefixIcon: 'e-expand', id: 'usuer' },
  ];

  const clickHandler = (args) => {
    if (args.item.id === 'usuer') {
      setDialogUser(true);
    }
  };

  const dialogClose = () => {
    setDialogUser(false);
  };

  const projectStartDate = new Date('07/04/1996');
  const projectEndDate = new Date('09/06/1996');

  const taskFields = {
    id: 'OrderID',
    name: 'ShipName',
    startDate: 'ShippedDate',
    endDate: 'RequiredDate',
    progress: 'Freight',
  };

  const editSettings = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true,
  };

  const columns = [
    'OrderID',
    'ShipName',
    'ShippedDate',
    'RequiredDate',
    'Freight',
  ];

  const customerData = new DataManager({
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    url: 'https://ej2.syncfusion.com/react/demos/src/grid/images/',
  });

  const buttons = [
    {
      buttonModel: {
        content: 'Guardar',
        isPrimary: true,
      },
    },
  ];

  const selectUser = (args) => {
    debugger;
    console.log('args', args);
    setUser(args.value);
    dialogClose();
  };

  const contentDialog = () => {
    return (
      <MultiSelectComponent
        id="checkbox"
        dataSource={resourceResources}
        fields={{ text: 'resourceName', value: 'resourceId' }}
        placeholder="Select game"
        mode="CheckBox"
        selectAllText="Select All"
        unSelectAllText="unSelect All"
        showSelectAll={true}
        change={selectUser}
      >
        <Inject services={[CheckBoxSelection]} />
      </MultiSelectComponent>
    );
  };

  const onBeforeOpen = (args) => {
    args.maxHeight = '80%';
  };

  return (
    <>
      <GanttComponent
        id="Default"
        dataSource={dataManager}
        //treeColumnIndex={1}
        taskFields={taskFields}
        editSettings={editSettings}
        toolbar={toolbar}
        toolbarClick={clickHandler}
        allowResizing={true}
        allowSelection={true}
        allowFiltering={true}
        query={query}
        //height="410px"
        projectStartDate={projectStartDate}
        projectEndDate={projectEndDate}
      >
        <ColumnsDirective>
          {columns.map((e) => (
            <ColumnDirective key={e} field={e} />
          ))}
        </ColumnsDirective>
        <Inject services={[Edit, Selection, Toolbar, Filter, Resize]} />
      </GanttComponent>
      <DialogComponent
        header={'Usuarios vinculados al proyecto'}
        width="350px"
        beforeOpen={onBeforeOpen}
        visible={dialogUser}
        close={dialogClose}
        showCloseIcon
        position={{ X: 'center', Y: 'center' }}
        content={contentDialog}
        isModal
        buttons={buttons}
      ></DialogComponent>
    </>
  );
};

export default Gantt;
