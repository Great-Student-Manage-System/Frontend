import styled from "styled-components";
import { ReactComponent as AppendNormal } from "@images/Icon/append_normal_icon.svg";
import { useSetRecoilState } from "recoil";
import { modalState, openModalAtom } from "@recoil/atom";
import { currentModal } from "@data/currentModalState";
export type ObjectType = {
  [index: string]: string | number;
};

interface TableProps<T extends ObjectType> {
  columns: string[][];
  data: T[];
}

function Table<T extends ObjectType>({ columns, data }: TableProps<T>) {
  const setModalOpen = useSetRecoilState(openModalAtom);
  const setModalState = useSetRecoilState(modalState);

  const appendRecord = () => {
    setModalOpen(true);
    setModalState(currentModal.APPEND_RECORD);
  };

  return (
    <>
      <SerachHeader>
        <div>
          <SearchExamInput placeholder="시험 이름" />
          <SearchExamButton>검색</SearchExamButton>
        </div>
        <AppendRecord onClick={appendRecord}>
          <AppendNormal />
          성적 추가하기
        </AppendRecord>
      </SerachHeader>
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

const SerachHeader = styled.div`
  width: 89.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

const SearchExamInput = styled.input`
  width: 29.6rem;
  height: 4.2rem;

  background: #ffffff;
  /* gray/lightgray */

  border: 1px solid var(--grey);
  border-radius: 6px;
  padding: 8px 12px;
`;

const SearchExamButton = styled.button`
  width: 7.2rem;
  height: 4.2rem;

  /* Gray 4 */

  background: var(--grey);
  border-radius: 6px;

  color: white;
  border: none;

  font-style: normal;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2.4rem;
  margin-left: 8px;
`;

const AppendRecord = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 13.7rem;
  height: 4.2rem;

  /* secondary/white */

  background: #ffffff;
  /* Gray 4 */

  border: 1px solid var(--grey);
  border-radius: 6px;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
`;

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
  }
`;

export default Table;
