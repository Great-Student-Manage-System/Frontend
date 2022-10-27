import styled from "styled-components";
import { ReactComponent as ETC } from "@images/Icon/etc_icon.svg";
import { useCallback } from "react";
import { currentStudentAtom } from "@recoil/currentStudentInfo";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { modifyExamRecordAtom } from "@recoil/modifyExamRecordAtom";
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
  const { studentId } = useRecoilValue(currentStudentAtom);
  const setExamRecord = useSetRecoilState(modifyExamRecordAtom);
  const setModalOpen = useSetRecoilState<boolean>(openModalAtom);
  const setModalState = useSetRecoilState(modalState);

  const updateHandler = useCallback(
    (rowData: T) => {
      const { recordId, examId, score, schoolYear } = rowData;
      setExamRecord({
        recordId, // 수정불가, 필수
        examId,
        examScore: score,
        studentId,
        schoolYear,
      });
      setModalState(currentModal.MODIFY_RECORD);
      setModalOpen(true);
    },
    [setExamRecord, setModalOpen, setModalState, studentId],
  );
  const deleteHAndler = useCallback((rowData: T) => {}, []);
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
                const [key, _] = col;
                if (key === "score") return <td>{row[key]}</td>;
                else if (key === "option")
                  return (
                    <td>
                      {/* <FixContainer>
                        <ETC />
                      </FixContainer> */}
                      <ModifyContainer>
                        <button onClick={() => updateHandler(row)}>수정</button>
                        <button onClick={() => deleteHAndler(row)}>삭제</button>
                      </ModifyContainer>
                    </td>
                  );
                return <td>{row[key] ? row[key] : ""}</td>;
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
    min-width: 18rem;
    height: 4.4rem;
  }

  td:last-child {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: end;
    width: inherit;
  }
`;

const FixContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0;
  height: 3.2rem;
  width: 3.2rem;
  border: 1px solid var(--grey);
  border-radius: 6px;
  &:hover {
    cursor: pointer;
  }
`;

const ModifyContainer = styled.div`
  /* position: absolute;
  right: -135px;
  bottom: -5px; */

  display: flex;
  width: 14.5rem;
  height: 3.2rem;

  border: 1px solid var(--grey);
  border-radius: 6px;
  padding: 1px;
  background-color: #ffffff;

  button {
    width: 50%;
    font-style: normal;
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 2.4rem;

    letter-spacing: -0.25px;

    color: #000000;

    border: none;
    background-color: #ffffff;
    padding: 0;

    &:hover {
      opacity: 0.7;
    }
    &:last-child {
      border-left: 1px solid var(--grey);
    }
  }
`;

export default Table;
