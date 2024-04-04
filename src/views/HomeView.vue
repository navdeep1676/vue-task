<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { reactive } from 'vue' // "from '@vue/composition-api'" if you are using Vue <2.7
import { useUserStore } from '../stores/user'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { useRouter } from 'vue-router'
const $toast = useToast()
let instance = $toast.success('You did it!')
const router = useRouter()
// Force dismiss specific toast
instance.dismiss()

// Dismiss all opened toast immediately
$toast.clear()
const store = useUserStore()
const formData: any = reactive({
  email: '',
  password: ''
})
const rules = {
  email: { required, email },
  password: { required }
}
const v$ = useVuelidate(rules, formData)
const submitForm = async () => {
  const result = await v$.value.$validate()
  let a: any
  if (result) {
    a = await store.loginUser(formData)

    if (a.token) {
      $toast.success('Login Successful. Redirecting to Dashboard')
      store.setToken(a.token)
      setTimeout(() => {
        router.push('/dashboard')
      }, 3000)
    } else {
      $toast.error(a.error)
    }
  }
}
</script>
<template>
  <main class="flex flex-row justify-between p-5 w-full h-[100vh] bg-black">
    <div class="w-[50%] bg-[url('/Bg.jpg')] bg-cover bg-right"></div>
    <div class="w-[50%] flex justify-between items-center p-5">
      <div class="mx-auto w-[60%]">
        <div><h1 class="font-bold text-3xl mb-5 text-white">Login</h1></div>
        <p class="my-3 text-white">
          ReqRes Default Creds <br />

          Email : eve.holt@reqres.in <br />
          Password : cityslicka
        </p>
        <form @submit.prevent="submitForm">
          <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-2">
              <label class="font-bold text-white" for="name">Email *</label>

              <input
                class="border border-black rounded-md p-2"
                placeholder="Email *"
                type="email"
                v-model="formData.email"
              />
              <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
                <div class="error-msg text-red-600">{{ error.$message }}</div>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <label class="font-bold text-white" for="name">Password *</label>

              <input
                class="border border-black rounded-md p-2"
                placeholder="Password *"
                type="password"
                v-model="formData.password"
              />
              <div class="input-errors" v-for="error of v$.password.$errors" :key="error.$uid">
                <div class="error-msg text-red-600">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <button
            class="bg-dark p-2 mt-3 border border-dark rounded-md text-white w-full"
            type="submit"
          >
            Login
          </button>
          <p class="text-white mt-3 text-center">
            Don't Have an Account
            <RouterLink class="font-bold" to="/signup"> Sign Up </RouterLink>
          </p>
        </form>
      </div>
    </div>
  </main>
</template>
