<script setup lang="ts">
import heroImg from '../assets/hero.png';
import viteLogo from '../assets/vite.svg';
import vueLogo from '../assets/vue.svg';
</script>

<template>
    <header class="title">
        <div class="hero">
            <img :src="heroImg" class="base" width="170" height="179" alt="" />
            <img :src="vueLogo" class="framework" alt="Vue logo" />
            <img :src="viteLogo" class="vite" alt="Vite logo" />
        </div>

        <h1>Playground</h1>
        <p>Testing package implementations and other experiments.</p>
    </header>

    <main></main>
</template>
