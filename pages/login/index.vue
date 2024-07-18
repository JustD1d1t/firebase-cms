<script setup>
const { loginUser } = useFirebaseAuth();

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
}]

const validate = (state) => {
    const errors = []
    if (!state.email) errors.push({ path: 'email', message: 'Email is required' })
    if (!state.password) errors.push({ path: 'password', message: 'Password is required' })
    return errors
}

const providers = [{
    label: 'Continue with GitHub',
    icon: 'i-simple-icons-github',
    color: 'white',
    click: () => {
        console.log('Redirect to GitHub')
    }
}]

function onSubmit(data) {
    loginUser(data.email, data.password)
}
</script>

<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
    <UContainer class="flex items-center justify-center ">
        <UCard class="max-w-sm w-full">
            <UAuthForm :fields="fields" :validate="validate" :providers="providers" title="Welcome back!" align="top"
                icon="i-heroicons-lock-closed" :ui="{ base: 'text-center', footer: 'text-center' }" @submit="onSubmit">
                <template #description>
                    Don't have an account? <NuxtLink to="/register" class="text-primary font-medium">Sign up</NuxtLink>.
                </template>

                <template #password-hint>
                    <NuxtLink to="/forgot-password" class="text-primary font-medium">Forgot password?</NuxtLink>
                </template>
                <template #footer>
                    By signing in, you agree to our <NuxtLink to="/" class="text-primary font-medium">Terms of Service
                    </NuxtLink>.
                </template>
            </UAuthForm>
        </UCard>
    </UContainer>
</template>