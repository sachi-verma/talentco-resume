'use strict';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';

const sortAndFilter = (allOfTheData, sortModel, filterModel) => {
  return sortData(sortModel, filterData(filterModel, allOfTheData));
};

const sortData = (sortModel, data) => {
  const sortPresent = sortModel && sortModel.length > 0;
  if (!sortPresent) {
    return data;
  }
  // do an in memory sort of the data, across all the fields
  const resultOfSort = data.slice();
  resultOfSort.sort(function (a, b) {
    for (let k = 0; k < sortModel.length; k++) {
      const sortColModel = sortModel[k];
      const valueA = a[sortColModel.colId];
      const valueB = b[sortColModel.colId];
      // this filter didn't find a difference, move onto the next one
      if (valueA == valueB) {
        continue;
      }
      const sortDirection = sortColModel.sort === 'asc' ? 1 : -1;
      if (valueA > valueB) {
        return sortDirection;
      } else {
        return sortDirection * -1;
      }
    }
    // no filters found a difference
    return 0;
  });
  return resultOfSort;
};

const filterData = (filterModel, data) => {
  const filterPresent = filterModel && Object.keys(filterModel).length > 0;
  if (!filterPresent) {
    return data;
  }
  const resultOfFilter = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    resultOfFilter.push(item);
  }
  return resultOfFilter;
};

const MultiFilter = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '75vh', width: '100%' }), []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

  const [columnDefs, setColumnDefs] = useState([
    // this row shows the row index, doesn't use any data from the row
    {
      headerName: 'ID',
      maxWidth: 150,
      // it is important to have node.id here, so that when the id changes (which happens
      // when the row is loaded) then the cell is refreshed.
      valueGetter: 'node.id',
      cellRenderer: (props) => {
        if (props.value !== undefined) {
          return props.value;
        } else {
          return (
            <img src="https://www.ag-grid.com/example-assets/loading.gif" />
          );
        }
      },
    },
    {field: 'skills', headerName: 'Skills'},
            {field: 'summary', headerName: 'Summary'},
            {field: 'industry', headerName: 'Industry'},
            {field: 'current_location', headerName: 'Current Location', filter: 'agTextColumnFilter'},
            {field: 'experience', headerName: 'Experience'},
            {field: 'current_designation', headerName: 'Current Designation'},
            {field: 'ug_degree', headerName: 'UG Degree'},
            {field: 'ug_spl', headerName: 'UG Specialization'},
            {field: 'pg_degree', headerName: 'PG Degree'},
            {field: 'pg_spl', headerName: 'PG Specialization'},
            {field: 'cand_name', headerName: 'Name'},
            {field: 'func_area', headerName: 'Functional Area'},
            {field: 'current_company', headerName: 'Current Company'},
            {field: 'preferred_location', headerName: 'Preferred Location'},
            {field: 'annual_salary', headerName: 'Annual Salary'},
            {field: 'notice_period', headerName: 'Notice Period'},
            {field: 'dob', valueFormatter: params => formatDate(params.value), headerName: 'Date of Birth'},
            {field: 'age', headerName: 'Age'},
            {field: 'marital_status', headerName: 'Marital Status'},
            {field: 'phone', headerName: 'Phone'},
            {field: 'email', headerName: 'Email'},
            {field: 'gender', headerName: 'Gender'},
            {field: 'work_permit', headerName: 'Work Permit'},
            {field: 'resume', headerName: 'Resume'}
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 200,
      //sortable: false,
      filter: true,
      floatingFilter: true,
    };
  }, []);

  const getRowId = useCallback(function (params) {
    return params.data.id;
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('http://localhost:3002/csv-data')
      .then((resp) => resp.json())
      .then((data) => {
        // give each row an id
        data.forEach(function (d, index) {
          d.id = (index + 1);
        });
        const dataSource = {
          rowCount: undefined,
          getRows: (params) => {
            console.log(
              'asking for ' + params.startRow + ' to ' + params.endRow
            );
            // At this point in your code, you would call the server.
            // To make the demo look real, wait for 500ms before returning
            setTimeout(function () {
              // take a slice of the total rows
              //const rowsThisPage = data.slice(params.startRow, params.endRow);

              // take a slice of the total rows
              const dataAfterSortingAndFiltering = sortAndFilter(
                data,
                params.sortModel,
                params.filterModel
              );
              const rowsThisPage = dataAfterSortingAndFiltering.slice(
                params.startRow,
                params.endRow
              );


              // if on or after the last page, work out the last row.
              // let lastRow = -1;
              // if (data.length <= params.endRow) {
              //   lastRow = data.length;
              // }

              // if on or after the last page, work out the last row.
              let lastRow = -1;
              if (dataAfterSortingAndFiltering.length <= params.endRow) {
                lastRow = dataAfterSortingAndFiltering.length;
              }

              
              // call the success callback
              params.successCallback(rowsThisPage, lastRow);
            }, 500);
          },
        };
        params.api.setGridOption('datasource', dataSource);
      });
  }, []);

  return (
    <div style={containerStyle}>
      <div
        style={gridStyle}
        className={
          "ag-theme-quartz"
        }
      >
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          // rowBuffer={0}
          rowSelection={'multiple'}
          rowModelType={'infinite'}
          cacheBlockSize={100}
          cacheOverflowSize={2}
          maxConcurrentDatasourceRequests={2}
          infiniteInitialRowCount={1}
          maxBlocksInCache={2}
          getRowId={getRowId}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};

export default MultiFilter
