import axios from "@/http/axios";

export default {
  getProvince() {
    return new Promise((resolve, reject) => {
      axios
        .get(`/cart/api/location/GetAllProvinces`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  getDistrictsByProvinceId(_, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/cart/api/location/GetDistrictsByProvinceId/${id}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  getWardsByDistrictId(_, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/cart/api/location/GetWardsByDistrictId/${id}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
};
