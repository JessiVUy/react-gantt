import { QueryBuilderComponent } from '@syncfusion/ej2-react-querybuilder';
import * as React from 'react';

function QueryBuilder({ dataManager, model, setModel }) {
  let qryBldrObj = '';

  function updateRule(args) {
    let predicate = qryBldrObj.getPredicate(args.rule);
    if (predicate) {
      setModel({ ...model, query: predicate });
    } else {
      setModel({ ...model, query: null });
    }
  }

  var columnData = [
    { field: 'OrderID', label: 'OrderID', type: 'number' },
    { field: 'ShipName', label: 'TaskName', type: 'string' },
    { field: 'Freight', label: 'Progress', type: 'number' },
    {
      field: 'ShippedDate',
      label: 'StartDate',
      type: 'date',
      format: 'dd/MM/yyyy',
    },
    {
      field: 'RequiredDate',
      label: 'EndDate',
      type: 'date',
      format: 'dd/MM/yyyy',
    },
  ];

  return (
    <QueryBuilderComponent
      id="query"
      dataSource={dataManager}
      columns={columnData}
      //rule={importRules}
      ruleChange={updateRule}
      ref={(scope) => {
        qryBldrObj = scope;
      }}
    />
  );
}
export default QueryBuilder;
