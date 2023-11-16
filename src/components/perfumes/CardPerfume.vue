<template>
  <div class="col-md-3 col-12">
    <q-card class="my-card" flat bordered>
      <div class="flex">
        <div class="col-grow text-center q-pa-sm">
          <q-icon color="grey" size="40px" name="wb_sunny"> </q-icon>
          <p class="q-mb-none">Dia</p>
          <q-linear-progress
            :value="data.day"
            rounded
            color="yellow-4"
            class=""
          />
        </div>
        <q-img width="250px" no-spinner :src="data.img_path" />
        <div class="col-grow text-center q-pa-sm">
          <q-icon color="grey" size="40px" name="fa-solid fa-moon"> </q-icon>
          <p class="q-mb-none">Noche</p>
          <q-linear-progress
            :value="data.night"
            rounded
            color="light-blue"
            class=""
          />
        </div>
      </div>

      <q-card-section>
        <div class="text-h5 q-mt-sm q-mb-xs text-center">{{ data.name }}</div>

        <div class="row">
          <div class="col-6 text-center q-mb-sm">
            <q-icon color="grey" size="40px" name="ac_unit"> </q-icon>
            <p class="q-mb-none">Invierno</p>
            <div class="flex flex-center">
              <q-linear-progress
                :value="data.winter"
                rounded
                style="width: 50%"
                color="light-blue"
                class=""
              />
            </div>
          </div>
          <div class="col-6 text-center q-mb-sm">
            <q-icon color="grey" size="40px" name="fa-solid fa-leaf"> </q-icon>
            <p class="q-mb-none">Primavera</p>
            <div class="flex flex-center">
              <q-linear-progress
                :value="data.spring"
                rounded
                style="width: 50%"
                color="light-green-6"
                class=""
              />
            </div>
          </div>
          <div class="col-6 text-center q-mb-sm">
            <q-icon color="grey" size="40px" name="fa-solid fa-umbrella-beach">
            </q-icon>
            <p class="q-mb-none">Verano</p>
            <div class="flex flex-center">
              <q-linear-progress
                :value="data.summer"
                rounded
                style="width: 50%"
                color="red-3"
                class=""
              />
            </div>
          </div>
          <div class="col-6 text-center q-mb-sm">
            <q-icon
              color="grey"
              size="40px"
              name="fa-brands fa-canadian-maple-leaf"
            >
            </q-icon>
            <p class="q-mb-none">Otoño</p>
            <div class="flex flex-center">
              <q-linear-progress
                :value="data.autumn"
                rounded
                style="width: 50%"
                color="orange-3"
                class=""
              />
            </div>
          </div>
        </div>
      </q-card-section>
      <template v-if="data.dupe">
        <q-separator />
        <q-list>
          <q-item-label header>Dupe</q-item-label>

          <q-item v-ripple>
            <q-item-section>{{ data.dupe }}</q-item-section>
            <q-item-section class="flex-center">
              <img
                class="q-pr-sm"
                width="100"
                height="100"
                :src="data.img_dupe_path"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </template>
      <q-separator />

      <q-card-section class="flex justify-evenly">
        <q-badge
          v-for="(item, k) in data.perfume_properties"
          :key="k"
          rounded
          class="text-black"
          :color="item.color"
          :label="item.property"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style>
</style>