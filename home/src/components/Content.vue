<template>
  <div style="color: red">
    {{ title }}<br>
    <button>{{title}}</button>
    <img src="../images/favicon.png"/>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        title: "Remote Component in Action..!!!",
      };
    },
  };
</script>
