<template>
    <div class="form-control">
        <form @submit.prevent="searchIp">
            <input 
            v-model="ipSearch" 
            type="text" 
            name="ipAddress" 
            @input="ValidateInput"
            
            placeholder="Search for any IP address or domain" id="ipField"
            title="Only numbers and dots are allowed"
            required>

            <button type="submit" class="send"><img src="../public/images/icon-arrow.svg" alt="search IP Address"></button>
        </form>
        <div class="err">
            <p v-show="error">Input a correct IP Address</p>
        </div>
    </div>
</template>

<script setup>

const emits = defineEmits(['validIp']);

const ipSearch = ref('');

const regex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;

const error = ref(false);

const isValidInput = computed(() => {
    return  regex.test(ipSearch.value.trim()) //this checks the input against a regex for ip address
})

watch(ipSearch, (newValue) => {
  if (newValue === '') {
    error.value = false
  }
}) // I want the error cleared after the input has being cleared after an error, this watches for changes and clear the error when the input is empty

const searchIp = ()  => {
    if (!isValidInput.value) {
        error.value = true
        return
    }
    error.value = false;
    emits('validIp', ipSearch.value)

    console.log(ipSearch.value);
    
} // for the error, if the isValidInput is evaluated to display the error

</script>

<style lang="scss" scoped>
@use "../assets/css/variables" as v;

form {
    margin-block-start: 2.5rem;
    display: flex;
    gap: 0px;
    justify-content: center;
}

.err {
    height: 0.625rem;
}
p {
    text-align: center;
    font-weight: v.$fw-3;
    color: red;
    padding-block-start: 0.625rem;
}

#ipField {
    padding: 20px;
    border-radius: 16px 0px 0px 16px;
    border: 0px;
    outline: none;
    // flex-basis: 80%;
    width: 500px;
    font: {
        size: 18px;
        weight: v.$fw-2;
    }

    @media screen and (max-width:768px) {
        width: 75%;
    }
}

button {
    padding: 20px;
    border-radius: 0px 16px 16px 0px;
    border: 0px;
    flex-basis: 20%;
    background-color: v.$VeryDarkGray;

    &:hover {
        background-color: v.$DarkGray;
    }
}


</style>