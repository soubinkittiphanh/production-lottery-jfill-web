<template>
  <div
    class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row"
  >
    <div class="container">
      <router-link to="/" class="navbar-brand float-left"
        >ລະບົບຈັດການຫວຍອອນລາຍ</router-link
      >
      <ul class="nav navbar-nav flex-row float-right">
        <li class="nav-item">
          <router-link to="/lotterymgr" class="nav-link pr-3"
            >ເປີດງວດ</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/sale" class="nav-link pr-3">ຂາຍ</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/insert" class="nav-link pr-3">ລາຍງານ</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/member" class="nav-link">ສະມາຊິກ</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>