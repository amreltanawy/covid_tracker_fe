import React, { useState } from 'react';
import {
    formatDate,
    EuiBasicTable,
    EuiIcon,
    EuiToolTip,
} from '@elastic/eui';
import {getPaginatedData} from '../utils';

/*
Example Temprature object:

{
  id: '1',
  name: 'john',
  country: 'egypt',
  temprature: 36,
  dateOfBirth: Date.now(),
  weight: 67,
  gender: "other"
}

*/




export default (props) => {

    const { data } = props;
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [sortField, setSortField] = useState('firstName');
    const [sortDirection, setSortDirection] = useState('asc');

    const onTableChange = ({ page = {}, sort = {} }) => {
        const { index: pageIndex, size: pageSize } = page;

        const { field: sortField, direction: sortDirection } = sort;

        setPageIndex(pageIndex);
        setPageSize(pageSize);
        setSortField(sortField);
        setSortDirection(sortDirection);
    };

    const { pageOfItems, totalItemCount } = getPaginatedData(
        data,
        pageIndex,
        pageSize,
        sortField,
        sortDirection
    );

    const columns = [
        {
            field: 'name',
            name: 'Name',
            sortable: true,
            truncateText: true,
            mobileOptions: {
                render: (item) => (
                    <span>
            {item.name}
          </span>
                ),
                header: false,
                truncateText: false,
                enlarge: true,
                width: '100%',
            },
        },
        {
            field: 'country',
            sortable: true,
            name: 'Country',
            truncateText: true,
            mobileOptions: {
                show: true,
            },
        },
        {
            field: 'temprature',
            name: 'Temprature',
            truncateText: true,
            sortable: true,
            mobileOptions: {
                show: true,
            },
        },
        {
            field: 'dateOfBirth',
            name: (
                <EuiToolTip content="Colloquially known as a 'birthday'">
          <span>
            Date of Birth{' '}
              <EuiIcon
                  size="s"
                  color="subdued"
                  type="questionInCircle"
                  className="eui-alignTop"
              />
          </span>
                </EuiToolTip>
            ),
            mobileOptions: {
                show: false,
            },
            schema: 'date',
            render: (date) => formatDate(date, 'dobLong'),
        },
        {
            field: 'weight',
            name: 'Weight',
            truncateText: true,
            sortable: true,
            mobileOptions: {
                show: false,
            },
        },
        {
            field: 'gender',
            name: 'Gender',
            sortable: true,
            truncateText: true,
            mobileOptions: {
                show: false,
            },
        },


    ];

    const pagination = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        totalItemCount: totalItemCount,
        pageSizeOptions: [3, 5, 8],
    };

    const sorting = {
        sort: {
            field: sortField,
            direction: sortDirection,
        },
        enableAllColumns: false,
    };

    return (
        <div>
            <EuiBasicTable
                tableCaption="Recorded Tempratures accross the globe"
                items={pageOfItems}
                columns={columns}
                pagination={pagination}
                sorting={sorting}
                onChange={onTableChange}
            />
        </div>
    );
};