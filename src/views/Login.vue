<template>
    <div class="form-login">

        <div>
            <h2>Login</h2>

            <form @submit.prevent="handleSubmit" novalidate>
                <label>Email:</label>
                <input type="email" v-model="email" required>
                <label>Password:</label>
                <input type="password" v-model="password" required>

                <RouterLink :to="{ name: 'register' }">Register a account</RouterLink>
                
                <div class="submit">
                    <button>Login</button>
                </div>
            </form>
        </div>

        <div class="errorPopups">
            <div>
                <div v-if="emailError" class="errorPopup">
                    <p>Please enter your account's email address.</p>
                </div>
            </div>
            <div>
                <div v-if="passwordError" class="errorPopup">
                    <p>Please enter your account's password.</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { ref, watch } from 'vue'
import { account, ID } from '../composables/auth.js'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const router = useRouter()
        const email = ref('')
        const password = ref('')

        // Validation
        const emailError = ref(false)
        const passwordError = ref(false)

        const emailPattern = "^.{1,}@.{1,}[.].{1,}$"


        watch(email, () => {
            checkEmail()
        })
        const checkEmail = () => {
            emailError.value = !RegExp(emailPattern).test(email.value)
        }

        watch(password, () => {
            checkPassword()
        })
        const checkPassword = () => {
            passwordError.value = password.value.length === 0 ? true : false
        }

        const handleSubmit = () => {
            checkEmail()
            checkPassword()
            


            if (!emailError.value && !passwordError.value) {
                // Login User
                account.createEmailSession(email.value, password.value).then(
                    (response) => {
                        console.log(response)
                        router.push({ name: "my-decks" })
                    },
                    (error) => {
                        console.log(error)
                    }
                )
            }
        }



        return {
            email,
            password,
            emailError,
            passwordError,
            handleSubmit
        }
    }
}
</script>

<style scoped>

    a {
        text-align: center;
        font-size: 0.8em;
    }

    .form-login {
        background-color: rgb(255, 255, 255);
        border-radius: 15px;
        box-shadow: 0px 0px 8px #cbcbcb;
        padding: 20px 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        min-width: 13.5em;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    input[type="text"], input[type="email"], input[type="password"] {
        outline: white solid 2px;
        display: block;
        margin-bottom: 6px;
        width: 15em;
        height: 1.8em;
        border: 1px solid rgb(195, 195, 195);
        border-radius: 4px;
    }

    input[type="text"]:focus, input[type="email"]:focus, input[type="password"]:focus {
        border: 1px solid #38b9ff;
        outline: #38b9ff solid 2px;
    }

    .submit {
        margin-top: 14px;
        align-self: center;
    }

    .submit button {
        color: white;
        font-family: "Franklin Gothic Medium", sans-serif;
        font-weight: bold;
        font-size: medium;
        border: none;
        border-radius: 10px;
        padding: 4px 18px;
        background-color: #ff3859;
    }

    label {
        text-transform: uppercase;
        font-size: 0.8em;
        color: rgb(147, 145, 145);
    }

    .TOS {
        font-size: 0.8em;
        color: rgb(147, 145, 145);
        margin-top: 2.5em;
    }

    .TOS input {
        display: inline;
    }

    .errorPopups {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        top: -91%;
        right: -101%;
        min-width: 27em;
        margin-top: 2.7em;
        margin-left: 0.8em;
        margin-right: -34.5em;
    }

    .errorPopups > div {
        min-height: 3.5em;
        width: fit-content;
    }

    .errorPopup p{
        margin: 0px;
        font-size: 0.8em;
        color: white;
    }
    
    .errorPopup {
        background-color: #ffb1b1;
        border-radius: 10px;
        padding: 10px;

        -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
        -moz-animation: fadein 2s; /* Firefox < 16 */
         -ms-animation: fadein 2s; /* Internet Explorer */
          -o-animation: fadein 2s; /* Opera < 12.1 */
             animation: fadein 2s;
    }

    @keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
    
    /* Firefox < 16 */
    @-moz-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
    
    /* Safari, Chrome and Opera > 12.1 */
    @-webkit-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
    
    /* Internet Explorer */
    @-ms-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
    
    /* Opera < 12.1 */
    @-o-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
</style>