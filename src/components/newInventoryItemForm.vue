<script setup lang="ts"></script>

<template>
  <form class="flex flex-col gap-4" @submit.prevent="">
    <div>
      <h2 class="text-2xl font-semibold pb-2">Register</h2>
      <p class="text-sm text-foreground/50 mb-4">
        Enter your details below to create your account.
      </p>
    </div>
    <div class="flex flex-col gap-4">
      <div>
        <Label for="email">Email</Label>
        <!-- <Input id="email" v-model="email" type="email" placeholder="m@example.com" required /> -->
      </div>
      <div>
        <Label for="username">Username</Label>
        <!-- <Input id="username" v-model="username" placeholder="Chef Cooks" required /> -->
      </div>
      <div>
        <Label for="password">Password</Label>
        <div class="relative">
          <!-- <Input
                id="password"
                v-model="password"
                :type="passwordShow ? 'text' : 'password'"
                placeholder="Password"
                minlength="8"
                required
              /> -->
          <!-- <div
                class="absolute right-2 bottom-0 hover:bg-border p-2 cursor-pointer"
                @click="passwordShow = !passwordShow"
              >
                👁️
              </div> -->
        </div>
      </div>
      <Button class="w-full mt-4" type="submit"> Register </Button>
      <!-- <Button class="w-full" variant="outline" @click="router.push('/')"> Cancel </Button> -->
    </div>
  </form>
</template>
