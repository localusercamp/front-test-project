<template>
    <button class="my-button">
        <slot></slot>
    </button>
</template>

<style>
    .my-button {
        cursor: pointer;
        padding: 15px 22px;
        color: white;
        font-size: 16px;
        background-color: #0E77BA;
        border: 3px solid white;
        border-radius: 15px;
    }

    .my-button:hover {
        background-color: #0A67A4;
    }
    
    .my-button:active {
        border-color: #80CAFF;
    }

    .secondary {
        background-color: white;
        color: #0E77BA;
    }

    .secondary:hover {
        background-color: #DFF2FF;
    }

    .secondary:active {
        border-color: #80CAFF;
    }
</style>