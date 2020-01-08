<style>
    :checked {
        --test: green !important;
    }

    .test {
        height: 50px;
        background-color: var(--test)
    }

    test :checked {
        --test: green;
    }
</style>

<div class="test"></div>

<input id="switch "type="checkbox">