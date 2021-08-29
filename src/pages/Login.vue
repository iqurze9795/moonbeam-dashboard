<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <b-link class="brand-logo">
        <img :src="require('@/assets/images/logo/logo.svg')" alt="" />
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        >
          <b-img fluid :src="imgUrl" alt="Login" style="max-width: 750px" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title class="mb-1 font-weight-bold" title-tag="h2">
            Welcome to Dashboard CMS
          </b-card-title>
          <b-card-text class="mb-2">
            Please sign-in to your account
          </b-card-text>

          <!-- form -->
          <validation-observer ref="loginForm">
            <template slot-scope="{ invalid }">
              <b-alert :show="error.length" variant="warning" class="p-2">
                User name / password not found.
              </b-alert>
              <b-form class="auth-login-form mt-2" @submit.prevent="login">
                <!-- email -->
                <b-form-group label="Email" label-for="login-email">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Email"
                    vid="email"
                    rules="required|email"
                  >
                    <b-form-input
                      id="login-email"
                      v-model="userEmail"
                      :state="errors.length > 0 ? false : null"
                      name="login-email"
                      placeholder="Email"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <!-- forgot password -->
                <b-form-group>
                  <div class="d-flex justify-content-between">
                    <label for="login-password">Password</label>
                    <b-link :to="{ name: 'auth-forgot-password' }" v-if="false">
                      <small>Forgot Password?</small>
                    </b-link>
                  </div>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Password"
                    vid="password"
                    rules="required"
                  >
                    <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid' : null"
                    >
                      <b-form-input
                        id="login-password"
                        v-model="password"
                        :state="errors.length > 0 ? false : null"
                        class="form-control-merge"
                        :type="passwordFieldType"
                        name="login-password"
                        placeholder="Password"
                      />
                      <b-input-group-append is-text>
                        <feather-icon
                          class="cursor-pointer"
                          :icon="passwordToggleIcon"
                          @click="togglePasswordVisibility"
                        />
                      </b-input-group-append>
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <!-- checkbox -->
                <b-form-group>
                  <b-form-checkbox
                    id="remember-me"
                    v-model="status"
                    name="checkbox-1"
                  >
                    Remember Me
                  </b-form-checkbox>
                </b-form-group>

                <!-- submit buttons -->
                <b-button
                  type="submit"
                  variant="primary"
                  block
                  :disabled="invalid"
                >
                  Sign in
                </b-button>
              </b-form>
            </template>
          </validation-observer>

          <b-card-text class="text-center mt-2" v-if="false">
            <span>New on our platform? </span>
            <b-link :to="{ name: 'auth-register' }">
              <span>&nbsp;Create an account</span>
            </b-link>
          </b-card-text>

          <!-- divider -->
          <div class="divider my-2" v-if="false">
            <div class="divider-text">or</div>
          </div>

          <!-- social buttons -->
          <div
            class="auth-footer-btn d-flex justify-content-center"
            v-if="false"
          >
            <b-button variant="facebook" href="javascript:void(0)">
              <feather-icon icon="FacebookIcon" />
            </b-button>
            <b-button variant="twitter" href="javascript:void(0)">
              <feather-icon icon="TwitterIcon" />
            </b-button>
            <b-button variant="google" href="javascript:void(0)">
              <feather-icon icon="MailIcon" />
            </b-button>
            <b-button variant="github" href="javascript:void(0)">
              <feather-icon icon="GithubIcon" />
            </b-button>
          </div>
        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
import useJwt from "@/auth/jwt/useJwt"
import { getHomeRouteForLoggedInUser } from "@/auth/utils"
import store from "@/store"
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue"
import { togglePasswordVisibility } from "@core/mixins/ui/forms"
import { email, required } from "@validations"
import {
  BAlert,
  BButton,
  BCardText,
  BCardTitle,
  BCol,
  BForm,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BImg,
  BInputGroup,
  BInputGroupAppend,
  BLink,
  BRow,
  VBTooltip,
} from "bootstrap-vue"
/* eslint-disable global-require */
import { ValidationObserver, ValidationProvider } from "vee-validate"

export default {
  directives: {
    "b-tooltip": VBTooltip,
  },
  components: {
    BAlert,
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: "",
      password: "",
      userEmail: "",
      sideImg: require("@/assets/images/pages/login-page.png"),

      // validation rules
      required,
      email,
      error: "",
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon"
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/login-page.png")
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    login() {
      this.$refs.loginForm.validate().then((success) => {
        if (success) {
          useJwt
            .login({
              email: this.userEmail,
              password: this.password,
            })
            .then((response) => {
              this.error = ""
              const { userData } = response.data
              useJwt.setToken(response.data.accessToken)
              useJwt.setRefreshToken(response.data.refreshToken)
              localStorage.setItem("userData", JSON.stringify(userData))
              this.$ability.update(userData.ability)

              // ? This is just for demo purpose as well.
              // ? Because we are showing eCommerce app's cart items count in navbar
              this.$store.commit(
                "app-ecommerce/UPDATE_CART_ITEMS_COUNT",
                userData.extras.eCommerceCartItemsCount
              )

              // ? This is just for demo purpose. Don't think CASL is role based in this case, we used role in if condition just for ease
              this.$router
                .replace(getHomeRouteForLoggedInUser(userData.role))
                .then(() => {
                  this.$toast({
                    component: ToastificationContent,
                    position: "top-right",
                    props: {
                      title: `Welcome ${
                        userData.fullName || userData.username
                      }`,
                      icon: "CoffeeIcon",
                      variant: "success",
                      text: `You have successfully logged in as ${userData.role}. Now you can start to explore!`,
                    },
                  })
                })
                .catch((error) => {
                  this.$refs.loginForm.setErrors(error.response.data.error)
                })
            })
            .catch((e) => {
              this.error = e.message
            })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
.brand-logo {
  img {
    width: 100px;
    height: auto;
  }
}
</style>
