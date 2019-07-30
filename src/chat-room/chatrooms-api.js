

import apiUrl from "../apiConfig";
import axios from "axios";
import Axios from "axios";


export const index = user => {
  return axios({
    method: "GET",
    url: apiUrl + "/chatrooms",
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  });
};

export const getMyRooms = user => {
  return axios({
    method: "GET",
    url: apiUrl + "/myrooms",
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  });
};

export const show = (user, roomId) => {
  return Axios({
    method: "GET",
    url: apiUrl + `/chatrooms/${roomId}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  });
};

export const create = (user, newRoom) => {
  return Axios({
    method: "POST",
    url: apiUrl + "/chatrooms",
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      room: newRoom
    }
  });
};

// delete a room
export const destroy = (user, roomId) => {
  return Axios({
    method: "DELETE",
    url: apiUrl + `/chatrooms/${roomId}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  });
};