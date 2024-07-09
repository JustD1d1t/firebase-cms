<script setup>

const { registerUser } = useFirebaseAuth();

const fields = [{
    name: 'email',
    type: 'text',
    label: 'Email',
    placeholder: 'Enter your email'
}, {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password'
}, {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Enter your name'
}]

const validate = (state) => {
    const errors = []
    if (!state.email) errors.push({ path: 'email', message: 'Email is required' })
    if (!state.password) errors.push({ path: 'password', message: 'Password is required' })
    if (!state.name) errors.push({ path: 'name', message: 'Name is required' })
    return errors
}

function onSubmit(data) {
    registerUser(data.email, data.password, data.name)
}
</script>

<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
    <UContainer class="flex items-center justify-center h-screen">
        <UCard class="max-w-sm w-full">
            <UAuthForm :fields="fields" :validate="validate" title="Join us!" align="top" icon="i-heroicons-lock-closed"
                :ui="{ base: 'text-center', footer: 'text-center' }" @submit="onSubmit">
                <template #description>
                    Do you have an account? <NuxtLink to="/login" class="text-primary font-medium">Sign in</NuxtLink>.
                </template>

                <template #password-hint>
                    <NuxtLink to="/" class="text-primary font-medium">Forgot password?</NuxtLink>
                </template>
                <!-- <template #validation>
                    <UAlert color="red" icon="i-heroicons-information-circle-20-solid" title="Error signing in" />
                </template> -->
                <!-- <template #footer>
                    By signing in, you agree to our <NuxtLink to="/" class="text-primary font-medium">Terms of Service
                    </NuxtLink>.
                </template> -->
            </UAuthForm>
        </UCard>
    </UContainer>
</template>