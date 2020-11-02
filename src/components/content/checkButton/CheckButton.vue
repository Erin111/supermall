<template>
    <div class="check-button" :class="{checked:isChecked}">
        <img src="~assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
export default {
    name: "CheckButton",
    props: {
        isChecked: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.check-button {
    border-radius: 50%;
    border: solid 1px #aaa;
}
.checked{
    background-color: var(--color-tint);
    border-color: var(--color-tint);
}
</style>