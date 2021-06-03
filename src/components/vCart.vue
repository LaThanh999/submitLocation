<template>
  <section class="section-container container">
    <v-row class="body">
      <v-col cols="12" class="body-form">
        <div class="ma-8">
          <span>Chọn địa chỉ để nhận hàng ?</span>
          <v-form ref="form" v-model="valid" lazy-validation class="mt-4">
            <v-row align="center">
              <v-col class="d-flex" cols="12" sm="6">
                <v-select
                  :items="provinces"
                  v-model="provinceSelect"
                  item-value="provinceID"
                  item-text="provinceName"
                  label="Chọn tỉnh/tp"
                  outlined
                  :rules="[(v) => !!v || 'Vui lòng chọn tỉnh/tp']"
                  required
                  no-data-text="Ko có dữ liệu"
                ></v-select>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6">
                <v-select
                  :items="districts"
                  v-model="districtSelect"
                  item-value="districtID"
                  item-text="districtName"
                  label="Chọn quận/huyện"
                  outlined
                  :rules="[(v) => !!v || 'Vui lòng chọn quận/huyện']"
                  required
                  no-data-text="Ko có dữ liệu"
                ></v-select>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6">
                <v-select
                  :items="wards"
                  v-model="wardsSelect"
                  item-value="wardID"
                  item-text="wardName"
                  label="Chọn phường/xã"
                  outlined
                  :rules="[(v) => !!v || 'Vui lòng chọn phường/xã']"
                  required
                  no-data-text="Ko tìm thấy"
                ></v-select>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6">
                <v-text-field
                  label="Số Nhà, tên đường"
                  v-model="textAddress"
                  outlined
                  :rules="[(v) => !!v || 'Vui lòng điền số nhà tên đường']"
                  required
                ></v-text-field>
              </v-col>
              <v-col class="d-flex mt-6 display-flex-center" cols="12" sm="12">
                <v-btn
                  @click="clickSubmit"
                  elevation="2"
                  large
                  outlined
                  rounded
                  color="primary"
                >
                  Xác nhận
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-col>
    </v-row>
    <v-loading :loading="checkLoading"></v-loading>
  </section>
</template>
<script>
import { mapActions } from "vuex";
import VLoading from "./vLoading";

export default {
  name: "vCart",
  components: { VLoading },
  data: () => ({
    valid: true,
    provinces: [],
    provinceSelect: null,
    districts: [],
    districtSelect: null,
    wards: [],
    wardsSelect: null,
    textAddress: "",
    checkLoading: false,
  }),
  mounted() {
    this.checkLoading = true;
    this.getProvince()
      .then((res) => {
        this.provinces = res.data;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.checkLoading = false;
      });
  },
  computed: {},
  watch: {
    provinceSelect(value) {
      if (value) {
        this.getDistrictsByProvinceId(value)
          .then((res) => {
            this.districts = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    districtSelect(value) {
      if (value) {
        this.getWardsByDistrictId(value)
          .then((res) => {
            this.wards = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  methods: {
    ...mapActions("location", [
      "getProvince",
      "getDistrictsByProvinceId",
      "getWardsByDistrictId",
    ]),
    clickSubmit() {
      if (this.$refs.form.validate()) {
        const itemProvinceSelect = this.provinces.find(
          (el) => el.provinceID == this.provinceSelect
        );
        const itemDistrictSelect = this.districts.find(
          (el) => el.districtID == this.districtSelect
        );
        const itemWardsSelect = this.wards.find(
          (el) => el.wardID == this.wardsSelect
        );
        alert(
          `Địa chỉ nhận hàng là: ${itemProvinceSelect.provinceName} - ${itemDistrictSelect.districtName} - ${itemWardsSelect.wardName} - ${this.textAddress} `
        );
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.section-container {
  background: #fff;
  height: 100%;
  position: relative;
  .body {
    padding: 0;
    width: 55%;
    max-width: 1000px;
    margin: auto;
    min-height: 350px;
    box-shadow: 0 0 1px 1px rgba($color: #000000, $alpha: 0.1);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .body-form {
      box-sizing: border-box;
      display: flex;
      background-color: #f9f9f9;
    }
  }
}
.display-flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
>
