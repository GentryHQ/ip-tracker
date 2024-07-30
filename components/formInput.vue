<template>
    <div class="form-control">
        <form>
            <input type="text" name="ipAddress" placeholder="Search for any IP address or domain" id="ipField">
            <button><img src="../public/images/icon-arrow.svg" alt="search IP Address"></button>
        </form>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@use "../assets/css/variables" as v;

#ipField {
    padding: 20px;
}
</style>