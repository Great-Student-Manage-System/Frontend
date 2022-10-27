import { myInfoProps } from "@recoil/myInfoatom";
import { userInfoProps } from "@utility/types";
import { authHandle } from "@apis/authHandle";
import { stringOrnumber } from "@recoil/modifyExamRecordAtom";

export const BASE_URL = "https://great.robinjoon.xyz";

export function signUpFetcher(body: userInfoProps): Promise<any> {
  return fetch(`${BASE_URL}/api/members/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
}

export function sendEmailConfirmNumber(email: string) {
  return fetch(`${BASE_URL}/api/members/join/${email}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

export function confirmEmailNumber(email: string, number: string) {
  return fetch(`${BASE_URL}/api/members/join/${email}/${number}`).then(
    (response) => response.json(),
  );
}

export function checkNickName(nickName: string) {
  return fetch(`${BASE_URL}/api/members/join/nickNameCheck/${nickName}`).then(
    (response) => response.json(),
  );
}

export async function loginFetcher(body: { email: string; password: string }) {
  return await fetch(`${BASE_URL}/api/members/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  }).then((response) => {
    return response.json();
  });
}

export function refreshAccessToken(accessToken: string) {
  return fetch(`${BASE_URL}/api/members/login`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ accessToken: `Bearer ${accessToken}` }),
  }).then((response) => response.json());
}

export interface loadMyInfoProps {
  code: number;
  response: string;
  data: myInfoProps;
  uuid: string;
}

export function loadMyInfoFetcher(
  accessToken: string,
): Promise<loadMyInfoProps> {
  return authHandle(
    fetch(`${BASE_URL}/api/members/myInfo`, {
      headers: {
        Authorization: accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }),
    accessToken,
  );
}

export function loadStudentListFetcher(page: string, accessToken: string) {
  return authHandle(
    fetch(`${BASE_URL}/api/students/${page}`, {
      headers: {
        Authorization: accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }),
    accessToken,
  );
}

export function loadExamListFetcher(year: string, accessToken: string) {
  return authHandle(
    fetch(`${BASE_URL}/api/exams/${year}`, {
      headers: {
        Authorization: accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }),
    accessToken,
  );
}

export interface studentDetailProps {
  studentId: string;
  subject: string;
  year: string;
}

export interface loadStudentProps extends studentDetailProps {
  accessToken: string;
}

export function loadStudentDetailFetcher({
  studentId,
  subject,
  year,
  accessToken,
}: loadStudentProps) {
  return authHandle(
    fetch(`${BASE_URL}/api/students/${studentId}/${subject}/${year}`, {
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    }),
    accessToken,
  );
}

interface appendStudentRecordProps {
  studentId: string;
  examId: number;
  subject: string;
  examScore: number;
  accessToken: string;
}

export function appendStudentRecordFetcher(props: appendStudentRecordProps) {
  const { studentId, examId, subject, examScore } = props;
  return authHandle(
    fetch(`${BASE_URL}/api/students/exam/result`, {
      method: "POST",
      headers: {
        Authorization: props.accessToken,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        studentId,
        examId,
        subject,
        examScore,
      }),
    }),
    props.accessToken,
  );
}

interface modifyStudentRecordProps {
  [key: string]: stringOrnumber;
  accessToken: string;
}

export function modifyStudentRecordFetcher(props: modifyStudentRecordProps) {
  const { studentId, examId, recordId, examResult, accessToken } = props;
  return authHandle(
    fetch(`${BASE_URL}/api/students/${studentId}`, {
      method: "PATCH",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        examId,
        recordId,
        examResult,
      }),
    }),
    accessToken,
  );
}

export function loadStudentExamInfoFetcher(
  examId: number,
  accessToken: string,
) {
  return authHandle(
    fetch(`${BASE_URL}/api/students/exam/${examId}`, {
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    }),
    accessToken,
  );
}

export function loadExamInfoFetcher(examId: number, accessToken: string) {
  return authHandle(
    fetch(`${BASE_URL}/api/exam/${examId}`, {
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    }),
    accessToken,
  );
}
