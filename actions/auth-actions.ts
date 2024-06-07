'use server';

async function signup(formData: FormData) {
    const email = formData.get('email')
    const password = formData.get('password')
}
