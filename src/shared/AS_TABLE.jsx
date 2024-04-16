import React, { useRef, useState } from "react";
import { Button, Input, Space, Table, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const AS_TABLE = ({ columns, dataSource }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const getColumnSortProps = (dataIndex) => ({
    sorter: (a, b) => {
      if (
        typeof a[dataIndex] === "number" &&
        typeof b[dataIndex] === "number"
      ) {
        return a[dataIndex] - b[dataIndex];
      }
      return a[dataIndex].localeCompare(b[dataIndex]);
    },
  });
   // Define the pagination configuration
  const paginationConfig = {
    defaultPageSize: 3, // Default number of items per page
    showSizeChanger: true, // Allow changing items per page
    pageSizeOptions: ['10', '20', '30', '50'], // Page size options
  };
  // Apply getColumnSearchProps to the columns that need search functionality
  const enhancedColumns = columns.map((col) => {
    const searchProps = col.searchable
      ? getColumnSearchProps(col.dataIndex)
      : {};
    const sortProps = col.sortable ? getColumnSortProps(col.dataIndex) : {};
    return { ...col, ...searchProps, ...sortProps };
  });


  return <Table columns={enhancedColumns} dataSource={dataSource}  pagination={paginationConfig} />;
};

export default AS_TABLE;
