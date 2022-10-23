import { userInfoProps } from "@utility/types";

export const BASE_URL = "http://great.robinjoon.xyz:8080";

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
