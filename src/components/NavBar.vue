<template>
    <nav>
            <RouterLink class="navBtn navLeft" :to="{ name: 'home' }"><span>Home</span></RouterLink>
            <RouterLink class="navBtn navLeft" :to="{ name: 'search' }"><span>Search</span></RouterLink>
            <RouterLink class="navBtn navLeft" :to="{ name: 'my-decks' }"><span>My Decks</span></RouterLink>
            <button v-if="loggedIn" class="navBtn navRight logout" @click="logout"><span>Logout</span></button>
            <RouterLink v-if="!loggedIn" class="navBtn navRight" :to="{ name: 'login' }"><span>Login</span></RouterLink>
    </nav>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { account } from '../composables/auth.js'

export default {
    setup() {
        const router = useRouter()
        const loggedIn = ref(false)

        const sessionCheck = async () => {
            try {
            await account.get()
            loggedIn.value = true
            console.log("loggedIn: " )
            } catch (err) {
                loggedIn.value = false
                console.log("loggedOut")
            }
        }

        sessionCheck()

        const logout = async () => {

            try {
                const session = await account.getSession("current")
                const promise = await account.deleteSession(session.$id)
            } catch (err) {
                console.log(err.message)
            } finally {
                router.push({ name: "home" })
            }
        }

        return {
        logout,
        loggedIn
    }
    }


}
</script>

<style>
    nav {
        background-color: #cacaca;
        min-width: 100%;
        height: 3em;
        align-self: flex-start;
        position: absolute;
        top: 75px;
        display: flex;
        flex-direction: row;
        align-items: center;

    }

    .navBtn {
        transform: skew(20deg);
        background-color: #cacaca;
        width: fit-content;
        height: 1.8em;
        border: 2px solid white;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 1em;
        padding-right: 1em;
        margin-left: 0.8em;
    }

    .navBtn > * {
        transform: skew(-20deg);
        background-color: #00000000; 
        color: white;
        font-weight: bold;
        border: none;
    }

    .navBtn:hover, .navBtn:hover > *, a.router-link-exact-active  , a.router-link-exact-active span{
        background-color: #ffffff;
        color: #38b9ff;
    }
    
    .navRight {
        margin-left: auto;
        margin-right: 0.8em;
    }

    .logout {
        padding: 1em;
    }
</style>