<template>
    <div class="form-register">

        <div>
            <h2>Create Account</h2>

            <form @submit.prevent="handleSubmit" novalidate>
                <label>Username:</label>
                <input type="text" v-model="username" required>
                <label>Email:</label>
                <input type="email" v-model="email" required>
                <label>Password:</label>
                <input type="password" v-model="password" required>

                <RouterLink :to="{ name: 'login' }">Already have an account?<br/>Login here.</RouterLink>

                <div class="TOS">
                    <input type="checkbox" v-model="TOS" required>
                    <span>I agree to the <a href="#">Terms of Service.</a></span>
                </div>
                
                <div class="submit">
                    <button>Create</button>
                </div>
            </form>
        </div>

        <div class="errorPopups">
            <div>
                <div v-if="usernameError" class="errorPopup">
                    <p>This field is required.</p>
                </div>
            </div>
            <div>
                <div v-if="emailError" class="errorPopup">
                    <p>Please enter a valid email. example@email.org</p>
                </div>
            </div>
            <div>
                <div v-if="passwordError" class="errorPopup">
                    <p>Minimum 8 in length. Include at least one number & special character.</p>
                </div>
            </div>
            <div class="tosPopup">
                <div v-if="tosError" class="errorPopup">
                    <p>You must agree to the Terms of Service.</p>
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
        const username = ref('')
        const email = ref('')
        const password = ref('')
        const TOS = ref(false)

        // Validation
        const usernameError = ref(false)
        const emailError = ref(false)
        const passwordError = ref(false)
        const tosError = ref(false)

        const passwordPattern = "^.*(?=.*[ -\\/:-@\\[-\\`{-~])(?=.*\\d)(?=.*[A-Z]).{8,}$"
        const emailPattern = "^.{1,}@.{1,}[.].{1,}$"


        watch(username, () => {
            checkUsername()
        })
        const checkUsername = () => {
            usernameError.value = username.value === "" ? true : false
        }

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
            passwordError.value = !RegExp(passwordPattern).test(password.value)
        }

        watch(TOS, () => {
            checkTOS()
        })
        
        const checkTOS = () => {
            tosError.value = TOS.value === false ? true : false
        }

        const handleSubmit = () => {
            checkUsername()
            checkEmail()
            checkPassword()
            checkTOS()

            if (!usernameError.value && !emailError.value && !passwordError.value && !tosError.value) {
                // Register User
                account.create(ID.unique(), email.value, password.value, username.value).then(
                (response) => {
                    console.log(response);
                    router.push({ name: "my-decks" })
                },
                (error) => {
                    console.log(error);
                }
                );
            }
        }



        return {
            username,
            email,
            password,
            TOS,
            usernameError,
            emailError,
            passwordError,
            tosError,
            
            handleSubmit
        }
    }
}
</script>

<style scoped>

    .form-register {
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

    a {
        text-align: center;
        font-size: 0.8em;
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
        margin-top: 1.5em;
    }

    .TOS input {
        display: inline;
    }

    .tosPopup {
        margin-top: 2.5em;
    }

    .errorPopups {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        top: -91%;
        right: -101%;
        min-width: 27em;
        margin-top: 5.0em;
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