import styled from "styled-components";
export type ObjectType = {
  [index: string]: string | number;
};

interface TableProps<T extends ObjectType> {
  columns: string[][];
  data: T[];
}

function Table<T extends ObjectType>({ columns, data }: TableProps<T>) {
  console.log(data);
  return (
    <>
      <TableContainer>
        <thead>
          <TableRow>
            {columns.map((column) => (
              <th>{column[1]}</th>
            ))}
            <th></th>
          </TableRow>
        </thead>
        <tbody>
          {data.map((row: T) => (
            <TableRow>
              {columns.map((col) => {
                return <td>{row[col[0]] ? row[col[0]] : ""}</td>;
              })}
            </TableRow>
          ))}
          <tr></tr>
        </tbody>
      </TableContainer>
    </>
  );
}

const TableContainer = styled.table`
  width: 89.5rem;
  height: 20.6rem;
  text-align: left;
`;

const TableRow = styled.tr`
  font-style: normal;

  font-size: 1.4rem;
  line-height: 2.4rem;
  /* identical to box height, or 171% */

  letter-spacing: -0.25px;

  color: #000000;
  th {
    font-weight: 700;
  }

  td {
    font-weight: 500;
    width: 18rem;
    height: 4.4rem;
  }
`;

export default Table;
