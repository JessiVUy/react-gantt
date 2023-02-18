import { createRoot } from 'react-dom/client';
import './index.css';
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
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import QueryBuilder from './QueryBuilder';
import Gantt from './Gantt';

function Default() {
  const [model, setModel] = React.useState({});

  var dataManager = new DataManager({
    url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders/',
    adaptor: new ODataV4Adaptor(),
  });

  return (
    <div key="settings">
      <QueryBuilder
        key="query"
        id="queryAux"
        {...{ dataManager, model, setModel }}
      />

      <Gantt key="gantt" {...{ model, dataManager }} />
    </div>
  );
}
export default Default;

const root = createRoot(document.getElementById('sample'));
root.render(<Default />);
