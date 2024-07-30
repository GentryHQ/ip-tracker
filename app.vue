<template>
  <section class="IP">

    <div class="IP-search container">
      <h1>IP Address Tracker</h1>
      <FormInput/>
    </div>

    <div class="IP-info">
      <div class="address box">
        <h2>IP Address</h2>
        <p>RESULT</p>
      </div>

      <div class="location box">
        <h2>Location</h2>
        <p>RESULT</p>
      </div>

      <div class="timezone box">
        <h2>Timezone</h2>
        <p>UTC - RESULT</p>
      </div>

      <div class="isp box">
        <h2>ISP</h2>
        <p>RESULT</p>
      </div>

    </div>

  </section>

  <section class="map">
    <div class="map_result">

    </div>
  </section>
</template>


<style lang="scss" scoped>
@use "~/assets/css/variables.scss" as v;

.IP {
  background: url('./public/images/pattern-bg-desktop.png');
  // margin-inline: auto;
  // max-inline-size: 400px;

  display: flex;
  flex-direction: column;
  align-items: center;

  &-search {
    margin-block: 2.5rem;

    h1 {
      font-size: 2.5rem;
      font-weight: v.$fw-2;
      color: v.$white;
    }
  }
}
</style>